import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Brain,
  MessageCircleHeart,
  Shield,
  ArrowRight,
  Sparkles,
  Share2,
  Tv,
  Users2,
  Mic,
  Zap,
} from 'lucide-react';
import { VICTIM_CASES } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface Session3EmpathyCauseProps {
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onNextSession: () => void;
}

export const Session3_EmpathyCause: React.FC<Session3EmpathyCauseProps> = ({
  progress,
  onUpdateProgress,
  onNextSession,
}) => {
  const selectedCaseId = progress.empathySelectedCase || 'case1';
  const currentCase =
    VICTIM_CASES.find((c) => c.id === selectedCaseId) || VICTIM_CASES[0];

  const [empathyScore, setEmpathyScore] = useState(85);

  const causes = progress.causeAnalysis || {
    media: '',
    peerPressure: '',
    publicFigures: '',
    personalStress: '',
  };

  const handleUpdateCause = (field: keyof typeof causes, value: string) => {
    const next = { ...causes, [field]: value };
    onUpdateProgress({ causeAnalysis: next });
  };

  const isCompleted =
    progress.empathyLetter.trim().length > 15 &&
    (causes.media.trim().length > 5 || causes.peerPressure.trim().length > 5);

  const handleComplete = () => {
    const completed = Array.from(new Set([...progress.completedSessions, 3]));
    onUpdateProgress({ completedSessions: completed });
    onNextSession();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. 피해 공감 스토리텔링 랩 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Heart className="w-4 h-4" />
          <span>활동 1: 피해 청소년의 목소리 간접 체험 (피해 공감)</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
          장난으로 던진 말의 무게: 마음과 몸에 새겨진 상처
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
          혐오 표현의 피해는 일시적인 화남을 넘어 자퇴 고민, 신체 잔병치레, 2년 이상의 깊은 트라우마로 이어집니다. 실제 청소년 사례를 읽고 공감해 보세요.
        </p>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {VICTIM_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => onUpdateProgress({ empathySelectedCase: c.id })}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 border shadow-2xs ${
                selectedCaseId === c.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${selectedCaseId === c.id ? 'fill-white' : 'text-rose-500'}`} />
              <span>{c.nickname} ({c.grade})</span>
            </button>
          ))}
        </div>

        {/* Active Case Card */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
                사례 분석 대상: {currentCase.nickname} ({currentCase.grade})
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1.5">
                상황: {currentCase.situation}
              </h4>
            </div>
          </div>

          {/* Victim Story Box */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <MessageCircleHeart className="w-4 h-4 text-rose-500" />
              <span>{currentCase.nickname}의 독백 이야기:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              “{currentCase.story}”
            </p>
          </div>

          {/* Physical & Mental Impact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                <Activity className="w-4 h-4 text-rose-500" />
                <span>신체적 피해 (몸의 반응)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentCase.physicalImpact.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>정신적·사회적 피해 (트라우마)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentCase.mentalImpact.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Empathy Score Slider & Letter Writing */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 space-y-4 shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>내 마음의 공감 온도계:</span>
                </span>
                <span className="text-rose-600 font-extrabold">{empathyScore}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={empathyScore}
                onChange={(e) => setEmpathyScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>0°C (무감각)</span>
                <span>50°C (안타까움)</span>
                <span>100°C (깊은 연대와 공감)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
                💌 상처받은 {currentCase.nickname}에게 전하는 따뜻한 위로와 응원의 편지:
              </label>
              <textarea
                rows={3}
                placeholder={`예: ${currentCase.nickname}아, 네 잘못이 결코 아니야. 장난이라는 핑계로 상처를 준 사람들이 잘못한 거야. 네 곁에는 너의 소중한 가치를 알아주고 응원하는 사람들이 훨씬 많아. 힘내, 항상 지지할게!`}
                value={progress.empathyLetter}
                onChange={(e) =>
                  onUpdateProgress({ empathyLetter: e.target.value })
                }
                className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 원인 입체 분석 맵핑 (Mind-Map / Fishbone Analysis) */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          <span>활동 2: 혐오가 번지는 4대 구조적 원인 입체 맵핑</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          왜 우리 사회와 또래 문화 속에 혐오 표현이 독버섯처럼 자리 잡았을까요?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          개인의 인성 문제뿐만 아니라 미디어 알고리즘, 또래 동조 압력, 공인의 언행 등 구조적 원인을 4가지 영역으로 나누어 분석해 보세요.
        </p>

        {/* 4 Cause Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Cause 1: 미디어 알고리즘 */}
          <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200/60 text-indigo-600 flex items-center justify-center">
                  <Tv className="w-3.5 h-3.5" />
                </div>
                <span>1. 미디어의 무분별한 노출 & 자극적 알고리즘</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
                조회수를 높이기 위해 혐오를 부추기는 숏폼, 낚시성 뉴스, 자극적 댓글 상단 노출
              </p>
            </div>
            <textarea
              rows={2}
              placeholder="예: 유튜브 쇼츠나 SNS에서 자극적인 갈등 영상이 알고리즘으로 계속 추천되어 혐오를 당연한 문화처럼 인식하게 됨"
              value={causes.media}
              onChange={(e) => handleUpdateCause('media', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
            />
          </div>

          {/* Cause 2: 또래 집단 모방 심리 */}
          <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center">
                  <Users2 className="w-3.5 h-3.5" />
                </div>
                <span>2. 또래 집단 내 모방 심리 & 동조 압력</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
                ‘남들도 다 쓰니까 유행어 같아서’, ‘소외당하지 않으려고’ 분위기에 휩쓸려 따라 씀
              </p>
            </div>
            <textarea
              rows={2}
              placeholder="예: 친구들 사이에서 뒤처지지 않으려고 뜻도 잘 모른 채 유행하는 비하 밈을 무비판적으로 따라 쓰게 됨"
              value={causes.peerPressure}
              onChange={(e) => handleUpdateCause('peerPressure', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
            />
          </div>

          {/* Cause 3: 사회적 공인의 무책임한 언행 */}
          <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-700 flex items-center justify-center">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <span>3. 사회적 공인(정치인, 방송인)의 갈라치기</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
                갈등을 이용해 인기를 얻으려는 어른들과 인터넷 방송인들의 혐오 조장 언행 모방
              </p>
            </div>
            <textarea
              rows={2}
              placeholder="예: 유명 인플루언서나 방송에서 특정 성별이나 세대를 조롱하는 모습을 보고 청소년들이 그대로 학습함"
              value={causes.publicFigures}
              onChange={(e) => handleUpdateCause('publicFigures', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
            />
          </div>

          {/* Cause 4: 개인의 스트레스와 우월감 */}
          <div className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200/60 text-purple-700 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>4. 잘못된 스트레스 해소 & 우월감 추구</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
                익명성에 숨어 남을 깎아내림으로써 자신의 불안을 해소하고 가짜 우월감을 느낌
              </p>
            </div>
            <textarea
              rows={2}
              placeholder="예: 학업 스트레스나 불안을 익명 인터넷 공간에서 약자를 공격하며 비뚤어진 쾌감으로 해소하려 함"
              value={causes.personalStress}
              onChange={(e) => handleUpdateCause('personalStress', e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
            />
          </div>
        </div>

        {/* Completion Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            * 공감 편지와 원인 분석을 작성하면 3차시 완료 배지를 획득합니다.
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
            <span>3차시 완료하고 4차시로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
