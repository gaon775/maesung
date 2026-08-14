import React from 'react';
import { Sparkles, CheckCircle, ArrowRight, Lightbulb, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { SESSIONS_INFO } from '../data/curriculumData';

interface StudentGuideBannerProps {
  currentSession: number;
  isOpen: boolean;
  onToggle: () => void;
}

const SESSION_GUIDES: Record<
  number,
  {
    goal: string;
    steps: { step: number; title: string; desc: string }[];
    tip: string;
  }
> = {
  1: {
    goal: "가벼운 농담과 편견이 어떻게 4단계 폭력으로 커지는지 '혐오 피라미드'를 통해 알아보고 나의 언어 습관을 점검합니다.",
    steps: [
      { step: 1, title: "개념 익히기", desc: "혐오 표현의 진짜 의미(특정 집단/개인에 대한 편견과 차별 기반 배제)를 확인합니다." },
      { step: 2, title: "말풍선 피라미드 분류", desc: "8장의 일상 말풍선 카드를 1단계(편견)부터 4단계(폭력)까지 알맞게 배치해 봅니다." },
      { step: 3, title: "스스로 돌아보기", desc: "왜 1단계의 사소한 농담을 방치하면 안 되는지 나의 생각을 워크북에 기록합니다." }
    ],
    tip: "정답을 맞히는 것보다 '왜 이 표현이 상대방에게 상처나 배제가 될까?'를 깊이 생각해보는 것이 중요해요."
  },
  2: {
    goal: "청소년 혐오 표현 노출 실태 통계(SNS 79.1% 등)를 분석하고, 나의 일상 속 '디지털 발자국'을 객관적으로 점검합니다.",
    steps: [
      { step: 1, title: "실태 통계 탐색", desc: "우리가 자주 쓰는 SNS, 유튜브, 게임 채팅창의 혐오 표현 노출 수치를 차트로 살펴봅니다." },
      { step: 2, title: "디지털 발자국 체크", desc: "나의 온라인 대화 습관 5문항 체크리스트를 정직하게 체크하고 안전 점수를 확인합니다." },
      { step: 3, title: "사회적 시선 성찰", desc: "소년범, 다문화, 성별 등 소수집단에 대한 우리 사회의 편견과 나의 생각을 작성합니다." }
    ],
    tip: "과거에 쓴 적이 있더라도 부끄러워하지 마세요! 솔직하게 돌아보는 것이 건강한 디지털 시민이 되는 첫걸음입니다."
  },
  3: {
    goal: "혐오 표현으로 깊은 상처를 받은 또래 친구들의 실제 사례에 공감하고, 혐오가 번지는 4대 구조적 원인을 파악합니다.",
    steps: [
      { step: 1, title: "피해 사례 공감", desc: "민우, 서연, 준호의 실제 사연을 읽고 '마음의 온도계'로 그 아픔의 무게를 느껴봅니다." },
      { step: 2, title: "위로의 편지 작성", desc: "상처받은 친구에게 용기와 온기를 전하는 따뜻한 공감 편지를 씁니다." },
      { step: 3, title: "원인 맵핑 분석", desc: "미디어 알고리즘, 또래 모방 심리, 공인의 언행, 개인 스트레스 등 4대 원인을 분석합니다." }
    ],
    tip: "장난으로 던진 돌에 개구리는 치명상을 입습니다. 2년 이상 지속되는 트라우마의 무게를 가슴으로 느껴보세요."
  },
  4: {
    goal: "인터넷 기사와 SNS의 혐오 댓글을 비판적으로 검증(Detox)하고, 인권 존중의 언어로 직접 고쳐 쓰는 역량을 기릅니다.",
    steps: [
      { step: 1, title: "댓글 디톡스 랩", desc: "실제 온라인 혐오 댓글 4종을 살펴보고, 그 안의 편견과 왜곡된 논리를 짚어냅니다." },
      { step: 2, title: "순화 언어 재작성", desc: "상처 주는 멸칭을 '상호 존중과 배려의 언어'로 직접 고쳐 쓰고 AI 피드백을 받습니다." },
      { step: 3, title: "공익 슬로건 만들기", desc: "우리 반과 SNS에 퍼뜨리고 싶은 나만의 디지털 에티켓 슬로건 카드를 만듭니다." }
    ],
    tip: "비판은 '사실과 논리'로 상대방의 주장을 짚는 것이고, 비하는 '인격'을 깎아내리는 것입니다. 품격 있는 표현을 찾아보세요!"
  },
  5: {
    goal: "교실 속 갈등 상황(단톡방 밈, 미러링 현상)을 주제로 소그룹 민주적 토론을 펼치고 성평등 상호 존중 소통법을 배웁니다.",
    steps: [
      { step: 1, title: "갈등 시나리오 탐구", desc: "단톡방 굴욕 밈 장난 vs 폭력, 혐오에 맞선 '미러링'의 한계 시나리오를 읽습니다." },
      { step: 2, title: "입장 선택 및 토론", desc: "나의 입장과 근거를 정리하고, 상대방의 의견을 경청하며 합리적 해결책을 도출합니다." },
      { step: 3, title: "성평등 소통 가이드", desc: "남녀 성별 고정관념을 깨고 서로를 동등한 인격체로 존중하는 대화법을 정리합니다." }
    ],
    tip: "토론은 상대를 이기는 싸움이 아닙니다. 서로의 차이를 인정하고 더 나은 교실 문화를 함께 만들어가는 소통입니다."
  },
  6: {
    goal: "친구의 혐오 발화에 침묵하지 않고 당당하게 대응하는 '대항발화(Counter-Speech)'를 익히고 학급 평화 서약서를 완성합니다.",
    steps: [
      { step: 1, title: "대항 화법 4단계 학습", desc: "사실 정정, 감정 환기, 동조 거부, 분위기 전환 등 4가지 구체적 화법을 익힙니다." },
      { step: 2, title: "롤플레잉 시뮬레이션", desc: "상황별 시나리오에서 직접 대항발화를 입력해보고 또래 반응과 코칭 피드백을 받습니다." },
      { step: 3, title: "평화 서약서 & 수료증", desc: "우리 반 서약 항목을 정하고 나만의 다짐을 적어 6차시 완주 인증서를 발급받습니다." }
    ],
    tip: "싸우거나 화낼 필요 없어요. 차분하게 '그건 사실이 아니야', '난 그런 농담에 동의하지 않아'라고 말하는 것이 진짜 용기입니다."
  }
};

export const StudentGuideBanner: React.FC<StudentGuideBannerProps> = ({
  currentSession,
  isOpen,
  onToggle,
}) => {
  const info = SESSIONS_INFO.find((s) => s.num === currentSession) || SESSIONS_INFO[0];
  const guide = SESSION_GUIDES[currentSession] || SESSION_GUIDES[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-full">
                  {info.num}차시 학습 가이드
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  자동 저장 지원 • 자유로운 수정 가능
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {info.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-colors shrink-0"
          >
            <span>{isOpen ? '가이드 접기' : '단계별 안내'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Goal Preview */}
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          <span className="font-bold text-indigo-600 mr-1.5">🎯 이번 시간 핵심 목표:</span>
          {guide.goal}
        </div>

        {/* Expandable Steps & Tips */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
            {guide.steps.map((item) => (
              <div
                key={item.step}
                className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-extrabold shadow-2xs">
                      {item.step}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="md:col-span-3 bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-amber-950">선생님의 꿀팁: </span>
                {guide.tip}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
