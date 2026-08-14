import React, { useState } from 'react';
import {
  Layers,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Flame,
  ShieldAlert,
  Users,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PYRAMID_CARDS } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface Session1PyramidProps {
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onNextSession: () => void;
}

const PYRAMID_LEVELS = [
  {
    level: 4,
    name: "4단계: 신체적 위협 및 폭력 / 혐오 범죄",
    desc: "물리적 폭력, 집단 폭행, 신상 털기 후 살해 협박, 테러 등 극단적 파괴",
    bgClass: "bg-red-600 text-white border-red-700",
    lightClass: "bg-red-50 border-red-200 text-red-900",
    icon: Flame,
    colorName: "red",
  },
  {
    level: 3,
    name: "3단계: 집단 차별 및 사회적 배제",
    desc: "학급 단톡방 배제, 따돌림, 특정 집단 출입 거부, 시설 이용 제한 등",
    bgClass: "bg-orange-500 text-white border-orange-600",
    lightClass: "bg-orange-50 border-orange-200 text-orange-900",
    icon: Users,
    colorName: "orange",
  },
  {
    level: 2,
    name: "2단계: 편견적 표현 및 비하 / 조롱",
    desc: "멸칭(○○충, 잼민이, 틀딱), 비하 밈, 온라인 악플, 조롱 및 놀림",
    bgClass: "bg-amber-500 text-white border-amber-600",
    lightClass: "bg-amber-50 border-amber-200 text-amber-900",
    icon: MessageSquare,
    colorName: "amber",
  },
  {
    level: 1,
    name: "1단계: 편견에 기반한 태도 및 고정관념",
    desc: "성별·출신·외모에 대한 선입견, '장난'이라고 치부하는 가벼운 농담",
    bgClass: "bg-yellow-400 text-slate-900 border-yellow-500",
    lightClass: "bg-yellow-50 border-yellow-200 text-yellow-900",
    icon: HelpCircle,
    colorName: "yellow",
  },
];

export const Session1_Pyramid: React.FC<Session1PyramidProps> = ({
  progress,
  onUpdateProgress,
  onNextSession,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const answers = progress.pyramidAnswers || {};

  const handleAssignLevel = (cardId: string, level: number) => {
    const newAnswers = { ...answers, [cardId]: level };
    onUpdateProgress({ pyramidAnswers: newAnswers });
  };

  const assignedCount = Object.keys(answers).length;
  const correctCount = PYRAMID_CARDS.filter(
    (card) => answers[card.id] === card.correctLevel
  ).length;

  const isCompleted =
    assignedCount === PYRAMID_CARDS.length &&
    progress.session1Reflect1.trim().length > 10;

  const handleComplete = () => {
    const completed = Array.from(
      new Set([...progress.completedSessions, 1])
    );
    onUpdateProgress({ completedSessions: completed });
    onNextSession();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. 개념 돋보기 카드 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>활동 1: 개념 및 피라미드 탐색</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight">
          '혐오 표현(Hate Speech)'이란 정확히 무엇일까요?
        </h3>
        
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 text-slate-800 space-y-2">
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            “편견과 차별에 기반하여, 특정 집단이나 그 구성원인 개인에게 <strong className="text-indigo-900 underline decoration-indigo-300">적대감을 드러내거나 배제·비하·폭력을 선동</strong>하는 모든 언어적·비언어적 표현을 말합니다.”
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-900 block mb-1">1. 편견과 고정관념</span>
              성별, 출신, 장애, 외모 등에 대한 잘못된 선입견에서 시작
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-900 block mb-1">2. 인간 존엄성 훼손</span>
              상대방을 나와 동등한 인격체로 보지 않고 깎아내림
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-900 block mb-1">3. 폭력의 토대 형성</span>
              작은 농담을 방치하면 사회 전체의 혐오 범죄로 성장
            </div>
          </div>
        </div>
      </section>

      {/* 2. '말풍선 피라미드' 인터랙티브 워크숍 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>활동 2: '말풍선 피라미드' 워크숍</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              일상의 말풍선 카드를 피라미드 단계별로 분류해 보세요!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              말풍선 카드를 선택하고 알맞은 단계 번호 버튼을 클릭하세요. ({assignedCount}/{PYRAMID_CARDS.length}개 분류 완료)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
            <span className="text-slate-500">진행률:</span>
            <span className="text-indigo-600 font-bold">{assignedCount} / {PYRAMID_CARDS.length}</span>
            {assignedCount === PYRAMID_CARDS.length && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                정답 {correctCount}개
              </span>
            )}
          </div>
        </div>

        {/* Visual Pyramid Stack View */}
        <div className="mb-8 p-5 sm:p-6 bg-slate-900 rounded-2xl text-white shadow-md">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold text-indigo-300 tracking-widest uppercase">
              Hate Escalation Pyramid
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
              혐오의 피라미드 (사소한 편견이 폭력이 되는 과정)
            </h4>
          </div>

          {/* Stepped Visual Pyramid */}
          <div className="space-y-2.5 max-w-2xl mx-auto">
            {PYRAMID_LEVELS.map((lvl) => {
              const Icon = lvl.icon;
              const cardsInLevel = PYRAMID_CARDS.filter(
                (c) => answers[c.id] === lvl.level
              );

              return (
                <div
                  key={lvl.level}
                  className={`rounded-xl p-3.5 sm:p-4 border transition-all duration-300 ${
                    lvl.level === 4
                      ? 'w-[75%] mx-auto bg-red-950/70 border-red-700/80 text-red-200'
                      : lvl.level === 3
                      ? 'w-[83%] mx-auto bg-orange-950/70 border-orange-700/80 text-orange-200'
                      : lvl.level === 2
                      ? 'w-[91%] mx-auto bg-amber-950/70 border-amber-700/80 text-amber-200'
                      : 'w-[100%] mx-auto bg-yellow-950/70 border-yellow-700/80 text-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{lvl.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-mono">
                      배치 {cardsInLevel.length}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-75 mb-2">
                    {lvl.desc}
                  </p>

                  {/* Badges of assigned cards */}
                  {cardsInLevel.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cardsInLevel.map((card) => {
                        const isCorrect = card.correctLevel === lvl.level;
                        return (
                          <div
                            key={card.id}
                            className={`text-[11px] px-2.5 py-1 rounded-lg font-medium border flex items-center gap-1.5 ${
                              isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
                                : 'bg-rose-950/80 border-rose-500/80 text-rose-200'
                            }`}
                          >
                            <span className="truncate max-w-[180px] sm:max-w-[260px]">
                              {card.text}
                            </span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Sorter Grid */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900">
            📋 말풍선 카드 목록 (클릭하여 단계를 지정하세요)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {PYRAMID_CARDS.map((card) => {
              const currentLevel = answers[card.id];
              const isAssigned = currentLevel !== undefined;
              const isCorrect = currentLevel === card.correctLevel;

              return (
                <div
                  key={card.id}
                  className={`rounded-2xl p-4 border transition-all ${
                    isAssigned
                      ? isCorrect
                        ? 'bg-emerald-50/50 border-emerald-300/80 shadow-2xs'
                        : 'bg-amber-50/50 border-amber-300/80 shadow-2xs'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="text-xs text-slate-400 font-semibold mb-1">
                    {card.exampleContext}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                    {card.text}
                  </div>

                  {/* Level Selector Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">
                      단계 지정:
                    </span>
                    {[1, 2, 3, 4].map((lvlNum) => (
                      <button
                        key={lvlNum}
                        onClick={() => handleAssignLevel(card.id, lvlNum)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          currentLevel === lvlNum
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70'
                        }`}
                      >
                        {lvlNum}단계
                      </button>
                    ))}
                  </div>

                  {/* Explanatory Feedback if assigned */}
                  {isAssigned && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs">
                      {isCorrect ? (
                        <div className="text-emerald-800 flex items-start gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>정답!</strong> {card.explanation}</span>
                        </div>
                      ) : (
                        <div className="text-amber-900 flex items-start gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>다시 생각해보세요:</strong> 이 표현은 <strong>{card.correctLevel}단계</strong>에 해당합니다. ({card.explanation})
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 성찰 및 생각 정리 워크시트 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>활동 3: 자가진단 및 성찰 기록장</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          피라미드를 통해 발견한 나의 언어 습관과 생각 정리
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
              1. "그냥 장난이었는데..." 일상 속 가벼운 농담(1~2단계)을 방치하면 왜 집단 배제나 폭력(3~4단계)으로 번지게 될까요? (자신의 생각 작성)
            </label>
            <textarea
              rows={3}
              placeholder="예: 1단계의 작은 편견을 '웃자고 한 말'이라며 넘기다 보면, 사람들은 그 집단을 깎아내려도 괜찮다는 잘못된 생각을 갖게 되고 결국 무리에서 왕따를 시키거나 신체적 폭력으로까지 정당화하기 때문입니다."
              value={progress.session1Reflect1}
              onChange={(e) =>
                onUpdateProgress({ session1Reflect1: e.target.value })
              }
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
              2. 나 또는 친구들이 무심코 사용했던 1~2단계 표현 중, 오늘부터 멈추고 싶은 표현은 무엇인가요?
            </label>
            <textarea
              rows={2}
              placeholder="예: 게임할 때 팀원에게 '장애인 같네'라고 말했던 것, 친구에게 '너 어디 지방 출신이냐'고 놀렸던 것을 오늘부터 쓰지 않겠습니다."
              value={progress.session1Reflect2}
              onChange={(e) =>
                onUpdateProgress({ session1Reflect2: e.target.value })
              }
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
            />
          </div>
        </div>

        {/* Completion Action */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            * 8개 카드를 모두 분류하고 생각 정리를 10자 이상 작성하면 1차시 완료 배지를 획득합니다.
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
            <span>1차시 완료하고 2차시로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
