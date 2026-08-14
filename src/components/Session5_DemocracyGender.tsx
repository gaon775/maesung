import React from 'react';
import {
  Users,
  MessageSquare,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Vote,
} from 'lucide-react';
import { DEBATE_TOPICS } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface Session5DemocracyGenderProps {
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onNextSession: () => void;
}

export const Session5_DemocracyGender: React.FC<Session5DemocracyGenderProps> = ({
  progress,
  onUpdateProgress,
  onNextSession,
}) => {
  const debateOpinions = progress.debateOpinions || {};

  const handleUpdateStance = (topicId: string, stance: string) => {
    const current = debateOpinions[topicId] || { myStance: '', solution: '' };
    const next = {
      ...debateOpinions,
      [topicId]: { ...current, myStance: stance },
    };
    onUpdateProgress({ debateOpinions: next });
  };

  const handleUpdateSolution = (topicId: string, solutionText: string) => {
    const current = debateOpinions[topicId] || { myStance: '', solution: '' };
    const next = {
      ...debateOpinions,
      [topicId]: { ...current, solution: solutionText },
    };
    onUpdateProgress({ debateOpinions: next });
  };

  const isCompleted =
    DEBATE_TOPICS.every(
      (topic) =>
        debateOpinions[topic.id]?.myStance &&
        debateOpinions[topic.id]?.solution?.trim().length > 10
    ) && progress.genderEqualityReflection.trim().length > 10;

  const handleComplete = () => {
    const completed = Array.from(new Set([...progress.completedSessions, 5]));
    onUpdateProgress({ completedSessions: completed });
    onNextSession();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. 교실 속 민주주의 토론 랩 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Vote className="w-4 h-4" />
          <span>활동 1: 소그룹 민주적 토론 랩 (교실 속 갈등 해결)</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
          일방적인 지도가 아닌, 토론으로 찾아가는 교실 속 민주주의
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          최근 초·중학교에서 혐오 표현의 사용 연령이 점점 낮아지고 있습니다. 교실과 단톡방에서 실제로 일어날 수 있는 2가지 갈등 상황을 두고, 각자의 입장을 정하고 합리적인 해결책을 모색해 보세요.
        </p>

        {/* 2 Debate Scenarios */}
        <div className="space-y-6">
          {DEBATE_TOPICS.map((topic, idx) => {
            const currentData = debateOpinions[topic.id] || {
              myStance: '',
              solution: '',
            };

            return (
              <div
                key={topic.id}
                className="bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4"
              >
                {/* Scenario Header */}
                <div className="border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
                    <Scale className="w-4 h-4" />
                    <span>토론 주제 {idx + 1}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {topic.title}
                  </h4>
                </div>

                {/* Scenario Description */}
                <div className="p-4 bg-white rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs">
                  <span className="font-bold text-indigo-900 block mb-1">📖 상황 시나리오:</span>
                  {topic.scenario}
                </div>

                {/* Key Issues */}
                <div className="flex flex-wrap gap-1.5">
                  {topic.keyIssues.map((issue, iIdx) => (
                    <span
                      key={iIdx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-semibold"
                    >
                      # {issue}
                    </span>
                  ))}
                </div>

                {/* Perspective A vs B Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => handleUpdateStance(topic.id, 'A')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between shadow-2xs ${
                      currentData.myStance === 'A'
                        ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-xs mb-1.5 text-indigo-900">
                        <span>[입장 A]</span>
                        {currentData.myStance === 'A' && (
                          <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-semibold">
                            내 선택
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        {topic.perspectiveA}
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleUpdateStance(topic.id, 'B')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between shadow-2xs ${
                      currentData.myStance === 'B'
                        ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold text-xs mb-1.5 text-indigo-900">
                        <span>[입장 B]</span>
                        {currentData.myStance === 'B' && (
                          <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-semibold">
                            내 선택
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        {topic.perspectiveB}
                      </p>
                    </div>
                  </button>
                </div>

                {/* Solution / Consensus writing */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
                    💡 나와 우리 모둠이 도출한 민주적 해결책 & 합의안:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="예: 상대방이 불쾌감을 느꼈다면 즉시 장난을 멈추고 사과해야 합니다. 학급 규칙으로 상대방 동의 없는 사진 캡처 및 유포를 금지하고, 혐오 표현 대신 대화로 오해를 푸는 규범을 만듭니다."
                    value={currentData.solution}
                    onChange={(e) => handleUpdateSolution(topic.id, e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. 포괄적 성교육 연계: 성평등 관점으로 편견 넘기 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          <span>활동 2: 포괄적 성교육 연계 — 성별 고정관념과 미러링 극복</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          남성혐오·여성혐오의 악순환을 끊고 상호 존중의 소통으로
        </h3>

        <div className="bg-indigo-50/60 rounded-xl p-4 sm:p-5 border border-indigo-200/70 text-xs sm:text-sm text-slate-800 space-y-2">
          <p className="font-bold text-indigo-950">
            📌 성평등 관점이란?
          </p>
          <p className="text-xs leading-relaxed text-slate-700">
            남성과 여성 모두가 성별이라는 고정관념(“남자는 울면 안 돼”, “여자는 조신해야 해”)에 얽매이지 않고, <strong>개개인의 고유한 인격과 다양성을 존중받는 것</strong>입니다. 상대방의 성별을 비하하는 멸칭이나 미러링은 일시적인 분풀이는 될 수 있어도 결국 혐오의 불씨만 키울 뿐입니다.
          </p>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
            💭 성별 고정관념을 깨고, 우리 교실에서 남녀 학생들이 서로를 진정으로 존중하며 소통하기 위해 실천할 수 있는 방법은 무엇일까요?
          </label>
          <textarea
            rows={3}
            placeholder="예: '남자는/여자는 원래 이래'라는 성별 이분법적인 말을 쓰지 않고, 개인의 개성과 의견을 그대로 존중하겠습니다. 혐오 단어로 맞받아치기보다 '그런 말은 서로에게 상처가 되니 쓰지 말자'고 평화롭게 대화하겠습니다."
            value={progress.genderEqualityReflection}
            onChange={(e) =>
              onUpdateProgress({ genderEqualityReflection: e.target.value })
            }
            className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
          />
        </div>

        {/* Completion Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            * 2가지 토론 주제의 해결안과 성평등 소통 다짐을 작성하면 5차시 완료 배지를 획득합니다.
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
            <span>5차시 완료하고 6차시로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
