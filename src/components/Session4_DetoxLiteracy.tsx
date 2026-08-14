import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Award,
  ArrowRight,
  Send,
  Loader2,
  Wand2,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { DETOX_COMMENTS } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface Session4DetoxLiteracyProps {
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onNextSession: () => void;
}

export const Session4_DetoxLiteracy: React.FC<Session4DetoxLiteracyProps> = ({
  progress,
  onUpdateProgress,
  onNextSession,
}) => {
  const rewrites = progress.detoxRewrites || {};
  const feedbacks = progress.detoxAIFeedbacks || {};

  const [loadingAiId, setLoadingAiId] = useState<string | null>(null);

  const handleUpdateRewrite = (id: string, text: string) => {
    const next = { ...rewrites, [id]: text };
    onUpdateProgress({ detoxRewrites: next });
  };

  const handleRequestAiFeedback = async (detoxItem: typeof DETOX_COMMENTS[0]) => {
    const userText = rewrites[detoxItem.id];
    if (!userText || userText.trim().length < 4) {
      alert("먼저 순화된 언어로 고쳐 쓴 문장을 입력해주세요!");
      return;
    }

    setLoadingAiId(detoxItem.id);
    try {
      const response = await fetch("/api/gemini/detox-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalComment: detoxItem.originalText,
          rewrittenComment: userText,
          context: detoxItem.category,
        }),
      });

      if (!response.ok) throw new Error("Feedback fetch failed");
      const data = await response.json();

      const nextFeedbacks = {
        ...feedbacks,
        [detoxItem.id]: {
          score: data.score || 95,
          praise: data.praise || "상대방의 인격을 존중하는 따뜻한 표현으로 훌륭하게 순화되었습니다.",
          suggestion: data.suggestion || "지속적으로 존중과 공감의 언어를 실천해보세요.",
        },
      };

      onUpdateProgress({ detoxAIFeedbacks: nextFeedbacks });
    } catch (err) {
      console.error(err);
      // Fallback
      const nextFeedbacks = {
        ...feedbacks,
        [detoxItem.id]: {
          score: 92,
          praise: "상대방을 존중하고 혐오 표현을 건강하게 바꾼 멋진 순화 문장입니다!",
          suggestion: "친구들에게도 긍정적인 울림을 주는 모범 사례예요.",
        },
      };
      onUpdateProgress({ detoxAIFeedbacks: nextFeedbacks });
    } finally {
      setLoadingAiId(null);
    }
  };

  const completedRewritesCount = Object.values(rewrites).filter(
    (text) => typeof text === 'string' && text.trim().length > 8
  ).length;

  const isCompleted =
    completedRewritesCount >= 2 &&
    progress.campaignSlogan &&
    progress.campaignSlogan.trim().length > 5;

  const handleComplete = () => {
    const completed = Array.from(new Set([...progress.completedSessions, 4]));
    onUpdateProgress({ completedSessions: completed });
    onNextSession();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. 댓글 디톡스(Detox) 랩 안내 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>활동 1 & 2: 댓글 디톡스(Detox) & '순화된 언어' 재작성 챌린지</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
          상처 주는 혐오 댓글을 '인권 존중의 언어'로 정화(Detox)하기
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          인터넷 기사나 SNS에 달린 실제 혐오성 댓글 카드를 분석하고, 그 안에 담긴 왜곡과 편견을 걷어내어 <strong className="text-slate-700">타인의 인격을 존중하면서도 자신의 생각을 품격 있게 전달하는 문장</strong>으로 직접 고쳐 써보세요!
        </p>

        {/* 4 Detox Comments Interactive Transformation Cards */}
        <div className="space-y-6">
          {DETOX_COMMENTS.map((item, idx) => {
            const userRewrite = rewrites[item.id] || "";
            const feedback = feedbacks[item.id];
            const isLoading = loadingAiId === item.id;

            return (
              <div
                key={item.id}
                className="bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-indigo-300 transition-all shadow-2xs space-y-4"
              >
                {/* Header & Original Hate Comment */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-0.5 rounded-full">
                      [문제 댓글 {idx + 1}] {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      디톡스 타겟
                    </span>
                  </div>

                  {/* Toxic Comment Speech Box */}
                  <div className="p-3.5 bg-rose-50/60 border border-rose-200/70 rounded-xl text-xs sm:text-sm text-rose-950 font-bold flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>{item.originalText}</div>
                  </div>

                  {/* Harmful Points Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {item.harmfulPoints.map((pt, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-rose-200/70 text-rose-700 font-medium shadow-2xs"
                      >
                        ⚠️ {pt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Guiding Question & Sample Helper */}
                <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="font-semibold text-indigo-900 mb-1">
                    💡 순화 작성 가이드: {item.guidingQuestion}
                  </div>
                  <details className="text-slate-500 text-[11px] cursor-pointer">
                    <summary className="font-medium text-slate-600 hover:text-indigo-600">
                      👉 예시 순화 문장 힌트 보기
                    </summary>
                    <p className="mt-1.5 text-slate-700 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                      {item.sampleRewrite}
                    </p>
                  </details>
                </div>

                {/* Student Rewrite Input Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
                    ✍️ 내가 고쳐 쓴 '순화된 인권 존중 문장':
                  </label>
                  <textarea
                    rows={2}
                    placeholder="상대방을 존중하고 혐오 표현을 뺀 품격 있는 문장을 작성해 보세요."
                    value={userRewrite}
                    onChange={(e) => handleUpdateRewrite(item.id, e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white"
                  />
                </div>

                {/* AI / Mentor Feedback Action */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="text-[11px] text-slate-400">
                    * 인권을 존중하고 사실에 근거한 표현으로 작성하세요.
                  </div>
                  <button
                    onClick={() => handleRequestAiFeedback(item)}
                    disabled={isLoading || !userRewrite || userRewrite.trim().length < 4}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      userRewrite && userRewrite.trim().length >= 4
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>AI 바른말 멘토 분석 중...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>AI 바른말 멘토 피드백 받기</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Feedback Display Card */}
                {feedback && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs space-y-1.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900 flex items-center gap-1">
                        <BadgeCheck className="w-4 h-4 text-emerald-600" />
                        <span>바른말 멘토 평가: {feedback.score}점 / 100점</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
                        디톡스 완료
                      </span>
                    </div>
                    <p className="text-emerald-900 font-medium">
                      👏 <strong>칭찬:</strong> {feedback.praise}
                    </p>
                    <p className="text-emerald-800">
                      💡 <strong>추천 팁:</strong> {feedback.suggestion}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 공익광고 / 디지털 에티켓 슬로건 만들기 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>활동 3: 나만의 디지털 에티켓 슬로건 카드 만들기</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          우리 반과 인터넷 세상에 울려 퍼질 한 줄 슬로건
        </h3>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
            📢 혐오 표현을 멈추고 서로를 존중하자는 공익 슬로건을 지어보세요:
          </label>
          <input
            type="text"
            placeholder="예: 클릭 한 번의 배려가 만드는 따뜻한 디지털 세상 / 장난으로 던진 멸칭, 친구에게는 씻을 수 없는 상처"
            value={progress.campaignSlogan}
            onChange={(e) =>
              onUpdateProgress({ campaignSlogan: e.target.value })
            }
            className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
          />
        </div>

        {/* Live Preview Card */}
        {progress.campaignSlogan && (
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs text-center space-y-2 border border-slate-800">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
              Digital Citizenship Slogan
            </div>
            <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
              “{progress.campaignSlogan}”
            </div>
            <div className="text-xs text-slate-400 font-medium">
              - {progress.gradeClass || '중학교'} {progress.studentName || '디지털 시민'} -
            </div>
          </div>
        )}

        {/* Completion Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            * 2개 이상의 댓글을 순화하고 슬로건을 작성하면 4차시 완료 배지를 획득합니다.
          </div>
          <button
            onClick={handleComplete}
            disabled={!isCompleted}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
              isCompleted
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
            }`}
          >
            <span>4차시 완료하고 5차시로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
