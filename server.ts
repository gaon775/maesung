import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", aiConfigured: Boolean(process.env.GEMINI_API_KEY) });
  });

  // AI Comment Detox Feedback (4차시)
  app.post("/api/gemini/detox-feedback", async (req, res) => {
    try {
      const { originalComment, rewrittenComment, context } = req.body;
      if (!rewrittenComment || typeof rewrittenComment !== "string") {
        return res.status(400).json({ error: "Rewritten comment is required" });
      }

      const ai = getGeminiAI();
      if (!ai) {
        // High quality fallback feedback if API key isn't provided
        return res.json({
          score: 95,
          praise: "상대방의 인격을 존중하고 비하적 표현을 훌륭하게 순화했어요! 친구들에게 긍정적인 울림을 주는 멋진 표현입니다.",
          suggestion: "조금 더 구체적인 사실에 근거하거나 상대방의 감정을 공감해주는 문장을 덧붙이면 더욱 강력한 디지털 리터러시 모범 사례가 될 수 있어요.",
          isAiGenerated: false
        });
      }

      const prompt = `당신은 중학교 혐오 표현 예방 교육 전문 교사 '바른말 멘토'입니다.
학생이 온라인 혐오/비하 댓글을 보고, 이를 '인권 존중과 상호 배려의 순화된 언어'로 직접 고쳐 썼습니다.
학생의 고쳐 쓴 문장을 평가하고 따뜻하고 건설적인 피드백을 한국어로 제공해주세요.

[원래 혐오/비하 발언]
${originalComment || "(온라인상의 차별/비하적 멸칭 및 조롱 표현)"}
${context ? `[맥락]: ${context}` : ""}

[학생이 고쳐 쓴 순화된 문장]
${rewrittenComment}

다음 JSON 포맷으로만 응답해주세요:
{
  "score": 1부터 100 사이의 정수 (존중, 공감, 설득력 기준),
  "praise": "학생의 노력과 순화된 표현에 대한 구체적이고 따뜻한 칭찬 (2~3문장)",
  "suggestion": "더 성숙하고 설득력 있는 표현을 위한 친절한 팁 (1~2문장)"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        score: parsed.score || 90,
        praise: parsed.praise || "상대방의 입장을 배려하여 표현을 정성껏 순화했습니다.",
        suggestion: parsed.suggestion || "앞으로도 일상 대화와 온라인 댓글에서 이러한 배려의 태도를 유지해보세요.",
        isAiGenerated: true,
      });
    } catch (err: any) {
      console.error("Gemini detox-feedback error:", err);
      return res.json({
        score: 90,
        praise: "상대방을 존중하는 따뜻한 언어로 의미를 훌륭하게 바꿨습니다!",
        suggestion: "공감과 사실에 기반한 화법을 지속적으로 실천해보세요.",
        isAiGenerated: false,
      });
    }
  });

  // AI Counter-Speech Roleplay Partner & Coach (6차시)
  app.post("/api/gemini/counter-speech-roleplay", async (req, res) => {
    try {
      const { scenario, studentMessage, history, speechType } = req.body;
      const ai = getGeminiAI();

      if (!ai) {
        return res.json({
          peerResponse: "음... 네 말을 듣고 보니 내가 너무 생각 없이 친구들을 따라 썼던 것 같아. 앞으로는 조심할게.",
          coachFeedback: "좋은 대항발화(Counter-Speech)예요! 상대방을 공격하지 않고, 부당함을 짚으면서 동조하지 않는 모범적인 태도를 보여주었습니다.",
          recommendedTip: "다음에는 대안이 되는 긍정적인 표현이나 재미있는 화제로 자연스럽게 전환해보는 것도 좋아요.",
          isAiGenerated: false
        });
      }

      const prompt = `당신은 중학교 혐오 표현 예방 교육 '대항발화(Counter-Speech)' 실습 코치이자, 롤플레잉 상대방(중학생 또래 친구)입니다.

[상황 시나리오]: ${scenario}
[선택한 대항발화 유형]: ${speechType || "자유 유형 (사실 정정 / 감정 환기 / 동조 거부 / 분위기 전환)"}
[이전 대화 내역]: ${JSON.stringify(history || [])}
[학생의 대항발화 발언]: "${studentMessage}"

다음 2가지를 수행하여 JSON으로 응답해주세요:
1. 'peerResponse': 학생의 대항발화를 들은 또래 친구의 자연스러운 반응 (당황하거나 깨달음을 얻고 수긍하며 혐오 표현을 멈추려는 반응)
2. 'coachFeedback': 학생의 대항발화 화법에 대한 전문 교사 멘토의 긍정적인 피드백과 평가
3. 'recommendedTip': 더 효과적인 대항발화를 위한 한 줄 꿀팁

JSON 포맷:
{
  "peerResponse": "또래 친구의 대답",
  "coachFeedback": "멘토 선생님의 칭찬 및 분석 피드백",
  "recommendedTip": "추천 팁"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        peerResponse: parsed.peerResponse || "아, 듣고 보니 네 말이 맞아. 미안해, 앞으론 안 쓸게.",
        coachFeedback: parsed.coachFeedback || "상대방의 기분을 존중하면서도 침묵하지 않고 당당하게 의사를 밝혔습니다.",
        recommendedTip: parsed.recommendedTip || "상대방을 비난하기보다 표현 자체의 부당성을 짚는 것이 중요해요.",
        isAiGenerated: true,
      });
    } catch (err: any) {
      console.error("Gemini roleplay error:", err);
      return res.json({
        peerResponse: "아, 내가 너무 가볍게 생각했나 봐. 네 말대로 그런 표현은 쓰지 않는 게 좋겠다.",
        coachFeedback: "분위기를 해치지 않고 침착하게 핵심을 짚은 멋진 대항발화입니다!",
        recommendedTip: "동조를 거부하고 바른 언어 문화를 만드는 용기를 칭찬합니다.",
        isAiGenerated: false,
      });
    }
  });

  // AI Class Pledge Slogan Refine (6차시)
  app.post("/api/gemini/pledge-refine", async (req, res) => {
    try {
      const { draftPledge, className } = req.body;
      const ai = getGeminiAI();

      if (!ai) {
        return res.json({
          refinedPledges: [
            "말의 무게를 알고, 상처 대신 온기를 전하는 우리 반",
            "혐오 표현에 침묵하지 않고, 용기 있게 존중을 말해요",
            "다름을 편견으로 보지 않고, 특별함으로 안아주는 교실"
          ],
          cheerMessage: "우리 반 친구들이 함께 지켜나갈 멋진 약속입니다!"
        });
      }

      const prompt = `중학교 학급 '${className || "우리 반"}'에서 만든 혐오 없는 교실 서약서 및 실천 슬로건 초안:
"${draftPledge}"

이 초안을 바탕으로 학생들이 외치기 쉽고 가슴에 와닿는 멋진 슬로건 3가지 버전과 교사의 응원 메시지를 JSON으로 작성해주세요.
JSON 포맷:
{
  "refinedPledges": ["슬로건 1", "슬로건 2", "슬로건 3"],
  "cheerMessage": "학급 학생들을 향한 따뜻한 격려 메시지"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        refinedPledges: parsed.refinedPledges || [
          "서로의 마음에 상처 대신 공감의 꽃을 피우는 우리 반",
          "작은 장난도 멈추고, 존중과 배려로 하나 되는 교실",
          "혐오 표현 제로! 다 함께 만드는 평화로운 우리 반"
        ],
        cheerMessage: parsed.cheerMessage || "모두가 행복한 교실을 만들어가는 여러분의 약속을 응원합니다!",
      });
    } catch (err: any) {
      console.error("Gemini pledge refine error:", err);
      return res.json({
        refinedPledges: [
          "서로의 마음에 상처 대신 공감의 꽃을 피우는 우리 반",
          "작은 장난도 멈추고, 존중과 배려로 하나 되는 교실",
          "혐오 표현 제로! 다 함께 만드는 평화로운 우리 반"
        ],
        cheerMessage: "모두가 행복한 교실을 만들어가는 여러분의 약속을 응원합니다!"
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
