import React from 'react';
import {
  Globe,
  Video,
  Gamepad2,
  Users,
  Newspaper,
  Megaphone,
  CheckSquare,
  Square,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Fingerprint,
} from 'lucide-react';
import { MEDIA_STATS, DIGITAL_FOOTPRINT_QUESTIONS } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface Session2MediaAuditProps {
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onNextSession: () => void;
}

const STAT_ICONS: Record<string, any> = {
  Globe,
  Video,
  Gamepad2,
  Users,
  Newspaper,
  Megaphone,
};

export const Session2_MediaAudit: React.FC<Session2MediaAuditProps> = ({
  progress,
  onUpdateProgress,
  onNextSession,
}) => {
  const checklist = progress.footprintChecklist || {};

  const handleToggleCheck = (id: string) => {
    const next = { ...checklist, [id]: !checklist[id] };
    onUpdateProgress({ footprintChecklist: next });
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  // Risk Score: If student checked 0: Clean (안전), 1-2: Caution (주의), 3+: High Risk (집중 개선 필요)
  const safetyStatus =
    checkedCount === 0
      ? { label: "청정 디지털 시민", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
      : checkedCount <= 2
      ? { label: "주의 및 자가점검 권장", color: "text-amber-700 bg-amber-50 border-amber-200" }
      : { label: "언어 습관 집중 디톡스 필요", color: "text-rose-700 bg-rose-50 border-rose-200" };

  const isCompleted =
    progress.session2MyExperience.trim().length > 10 &&
    progress.session2MinorityOpinion.trim().length > 10;

  const handleComplete = () => {
    const completed = Array.from(new Set([...progress.completedSessions, 2]));
    onUpdateProgress({ completedSessions: completed });
    onNextSession();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. 통계 데이터 분석 랩 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Globe className="w-4 h-4" />
          <span>활동 1: 청소년 혐오 표현 노출 실태 통계 분석</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
          우리가 매일 접하는 온라인 공간, 얼마나 안전할까요?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          국가인권위원회 및 청소년 미디어 조사 통계에 따르면 청소년의 <strong className="text-slate-800">79.1%</strong>가 온라인에서 혐오 표현에 일상적으로 노출되고 있으며, 학년이 올라갈수록 노출 빈도와 심각성이 가속화되고 있습니다.
        </p>

        {/* Stats Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEDIA_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[stat.iconName] || Globe;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 hover:border-indigo-300 transition-all flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-700">{stat.label}</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/60 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {stat.value}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">응답률</span>
                  </div>

                  {/* Visual Progress Meter */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200/60 pt-2.5">
                  {stat.subText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Insight Box */}
        <div className="mt-5 p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/70 text-xs sm:text-sm text-indigo-950 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-indigo-900">통계 속 핵심 인사이트:</strong>
            <p className="text-slate-700 text-xs leading-relaxed">
              청소년들은 주로 <strong>친구 집단(22.3%)</strong>의 동조와 모방, 그리고 <strong>언론인·정치인(각각 18.2%, 16.5%)</strong> 등 사회적 공인의 자극적인 갈라치기 발언을 통해 혐오 표현을 무비판적으로 습득하는 경향이 큽니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. '디지털 발자국' 자가진단 체크리스트 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Fingerprint className="w-4 h-4" />
              <span>활동 2: 나의 '디지털 발자국' 점검기</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              나의 온라인 언어 습관은 어떤 발자국을 남기고 있을까요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              평소 경험에 비추어 정직하게 체크해보세요. (누구에게도 공개되지 않는 개인 자가진단입니다.)
            </p>
          </div>

          <div className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${safetyStatus.color}`}>
            상태: {safetyStatus.label} ({checkedCount}/5개 해당)
          </div>
        </div>

        <div className="space-y-2.5">
          {DIGITAL_FOOTPRINT_QUESTIONS.map((q) => {
            const isChecked = Boolean(checklist[q.id]);
            return (
              <button
                key={q.id}
                onClick={() => handleToggleCheck(q.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'bg-rose-50/50 border-rose-300 text-rose-950 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 text-slate-800'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-rose-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      {q.category}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium leading-relaxed">
                    {q.question}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. 소수집단 인식과 내 경험 성찰 워크시트 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <AlertCircle className="w-4 h-4" />
          <span>활동 3: 미디어 속 소수집단 인식 토론 및 경험 기록</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          단톡방과 댓글에서 목격했던 혐오와 사회적 인식 성찰
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
              1. 내가 평소 단톡방, 게임 채팅, 유튜브 댓글에서 직접 보거나 들었던 혐오 표현(또는 비하 밈)의 경험을 회상해 적어보세요.
            </label>
            <textarea
              rows={3}
              placeholder="예: 게임할 때 누군가 실수를 하자 '너 페미냐', '장애인이냐'며 비하 멸칭을 쏟아붓는 것을 보았습니다. 단톡방에서도 특정 친구의 사진으로 조롱 짤을 만들어 돌려보며 웃는 것을 본 적이 있습니다."
              value={progress.session2MyExperience}
              onChange={(e) =>
                onUpdateProgress({ session2MyExperience: e.target.value })
              }
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
              2. 범죄 청소년(소년범), 페미니스트, 다문화/외국인 등 특정 소수집단에 대해 미디어가 퍼뜨리는 편견(명과 암)에 대해 어떻게 생각하나요?
            </label>
            <textarea
              rows={3}
              placeholder="예: 미디어나 자극적인 유튜버들이 소수의 극단적인 사례만 부각해 특정 집단 전체를 악마화하거나 혐오의 대상으로 만드는 경향이 있습니다. 비판할 일이 있더라도 집단 전체를 혐오 멸칭으로 일반화해서는 안 된다고 생각합니다."
              value={progress.session2MinorityOpinion}
              onChange={(e) =>
                onUpdateProgress({ session2MinorityOpinion: e.target.value })
              }
              className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
            />
          </div>
        </div>

        {/* Completion Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            * 두 가지 서술형 질문을 10자 이상 작성하면 2차시 완료 배지를 획득합니다.
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
            <span>2차시 완료하고 3차시로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
