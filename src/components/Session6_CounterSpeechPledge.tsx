import React, { useState } from 'react';
import {
  ShieldAlert,
  MessageCircle,
  Award,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  Printer,
  FileCheck,
  Plus,
  Trash2,
  Crown,
  Heart,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTER_SPEECH_SCENARIOS } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface Session6CounterSpeechPledgeProps {
  progress: StudentProgress;
  onUpdateProgress: (updated: Partial<StudentProgress>) => void;
  onOpenPrintView: () => void;
}

export const Session6_CounterSpeechPledge: React.FC<Session6CounterSpeechPledgeProps> = ({
  progress,
  onUpdateProgress,
  onOpenPrintView,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    COUNTER_SPEECH_SCENARIOS[0].id
  );
  const [inputSpeech, setInputSpeech] = useState('');
  const [isLoadingRoleplay, setIsLoadingRoleplay] = useState(false);
  const [newPledgeText, setNewPledgeText] = useState('');

  const currentScenario =
    COUNTER_SPEECH_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    COUNTER_SPEECH_SCENARIOS[0];

  const speechLogs = progress.counterSpeechLogs || [];
  const pledgeItems = progress.classPledgeItems || [];

  const handleSendCounterSpeech = async (recommended?: string) => {
    const textToSend = recommended || inputSpeech;
    if (!textToSend || textToSend.trim().length < 3) {
      alert("대항발화 문장을 입력하거나 추천 문장을 선택해주세요!");
      return;
    }

    setIsLoadingRoleplay(true);
    try {
      const response = await fetch("/api/gemini/counter-speech-roleplay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: currentScenario.situation,
          studentMessage: textToSend,
          speechType: currentScenario.speechType,
          history: speechLogs.map((l) => ({
            student: l.studentMessage,
            peer: l.peerResponse,
          })),
        }),
      });

      const data = await response.json();

      const newLog = {
        scenarioId: currentScenario.id,
        speechType: currentScenario.speechType,
        studentMessage: textToSend,
        peerResponse:
          data.peerResponse ||
          "어... 듣고 보니 네 말이 맞아. 내가 너무 생각 없이 친구들을 따라 썼나 봐. 미안해.",
        feedback:
          data.coachFeedback ||
          "상대방을 공격하지 않으면서도 핵심 문제를 짚은 훌륭한 대항발화(Counter-Speech)입니다!",
      };

      onUpdateProgress({
        counterSpeechLogs: [newLog, ...speechLogs],
      });
      setInputSpeech('');
    } catch (err) {
      console.error(err);
      const fallbackLog = {
        scenarioId: currentScenario.id,
        speechType: currentScenario.speechType,
        studentMessage: textToSend,
        peerResponse: "아, 듣고 보니 네 말이 맞아. 장난이라도 그런 표현은 안 쓸게.",
        feedback: "분위기를 해치지 않고 용기 있게 부당함을 지적한 멋진 실천입니다!",
      };
      onUpdateProgress({
        counterSpeechLogs: [fallbackLog, ...speechLogs],
      });
      setInputSpeech('');
    } finally {
      setIsLoadingRoleplay(false);
    }
  };

  const handleAddPledgeItem = () => {
    if (!newPledgeText.trim()) return;
    const next = [...pledgeItems, newPledgeText.trim()];
    onUpdateProgress({ classPledgeItems: next });
    setNewPledgeText('');
  };

  const handleRemovePledgeItem = (idx: number) => {
    const next = pledgeItems.filter((_, i) => i !== idx);
    onUpdateProgress({ classPledgeItems: next });
  };

  const handleCompletePledge = () => {
    if (!progress.personalPromise.trim()) {
      alert("나의 개인 실천 다짐을 먼저 작성해주세요!");
      return;
    }

    const completed = Array.from(new Set([...progress.completedSessions, 6]));
    onUpdateProgress({
      completedSessions: completed,
      pledgeCompleted: true,
    });

    // Launch celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const isFullyCompleted = progress.pledgeCompleted;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. 대항발화(Counter-Speech) 트레이닝 랩 */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4" />
          <span>활동 1: 방관자를 넘어서는 '대항발화(Counter-Speech)' 훈련</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
          침묵은 동조가 될 수 있습니다: 안전하고 당당한 대항 화법 4가지
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          친구가 무심코 혐오 발화를 할 때, 분위기를 깨지 않으면서도 부당함을 짚고 동조를 거부하는 <strong className="text-slate-700">구체적 대항발화 스킬</strong>을 롤플레잉으로 연습해 보세요.
        </p>

        {/* 4 Counter Speech Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 shadow-2xs">
            <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[10px] font-semibold">
              유형 1: 사실 정정형
            </span>
            <div className="font-bold text-xs text-slate-900 mt-2 mb-1">
              “그건 사실이 아니야”
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              가짜 뉴스나 왜곡된 편견에 객관적 팩트와 통계로 차분히 바로잡기
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 shadow-2xs">
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200/60 text-rose-700 text-[10px] font-semibold">
              유형 2: 감정 환기형
            </span>
            <div className="font-bold text-xs text-slate-900 mt-2 mb-1">
              “누군가에겐 큰 상처야”
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              공격받는 사람의 고통을 환기시키고 상대방의 공감 이끌어내기
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 shadow-2xs">
            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200/60 text-amber-700 text-[10px] font-semibold">
              유형 3: 동조 거부형
            </span>
            <div className="font-bold text-xs text-slate-900 mt-2 mb-1">
              “난 그런 농담 안 웃겨”
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              또래 압력에 휩쓸리지 않고 혐오 문화에 동참하지 않겠다는 선 긋기
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 shadow-2xs">
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-semibold">
              유형 4: 분위기 전환형
            </span>
            <div className="font-bold text-xs text-slate-900 mt-2 mb-1">
              “우리 다른 좋은 말 쓰자”
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              갈등을 키우지 않고 긍정적이고 즐거운 대화로 자연스럽게 전환하기
            </p>
          </div>
        </div>

        {/* Interactive Roleplay Simulator Box */}
        <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white space-y-4 shadow-xs border border-slate-800">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-sm sm:text-base text-slate-100">
                대항발화 롤플레잉 시뮬레이터
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {COUNTER_SPEECH_SCENARIOS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenarioId(s.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    selectedScenarioId === s.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  시나리오 {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Situation Prompt */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 space-y-2">
            <div className="text-xs text-indigo-300 font-semibold">
              📍 상황: {currentScenario.situation}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-100 bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
              🗣️ 친구의 혐오 발화: {currentScenario.peerStatement}
            </div>
          </div>

          {/* Quick Recommended Speech Buttons */}
          <div>
            <div className="text-xs text-slate-400 font-medium mb-2">
              💡 추천 대항발화 화법 클릭해보기:
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {currentScenario.recommendedResponses.map((res, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => handleSendCounterSpeech(res)}
                  disabled={isLoadingRoleplay}
                  className="flex-1 text-left p-2.5 rounded-xl bg-slate-800/90 hover:bg-indigo-950/60 border border-slate-700 hover:border-indigo-500 text-xs text-slate-200 transition-colors leading-relaxed"
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="직접 나만의 대항발화 문장을 입력해보세요..."
              value={inputSpeech}
              onChange={(e) => setInputSpeech(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendCounterSpeech()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
            />
            <button
              onClick={() => handleSendCounterSpeech()}
              disabled={isLoadingRoleplay || !inputSpeech.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {isLoadingRoleplay ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>발언하기</span>
                </>
              )}
            </button>
          </div>

          {/* Recent Dialogue Logs */}
          {speechLogs.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-indigo-300">
                💬 방금 나눈 대항발화 롤플레잉 결과:
              </div>
              {speechLogs.slice(0, 2).map((log, lIdx) => (
                <div
                  key={lIdx}
                  className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/80 space-y-2 text-xs"
                >
                  <div className="text-slate-300 leading-relaxed">
                    <span className="font-bold text-indigo-400">👤 나 (대항발화): </span>
                    “{log.studentMessage}”
                  </div>
                  <div className="text-emerald-300 leading-relaxed">
                    <span className="font-bold text-emerald-400">👥 친구의 반응: </span>
                    “{log.peerResponse}”
                  </div>
                  <div className="bg-indigo-950/50 p-2.5 rounded-lg text-indigo-200 border border-indigo-800/60 text-[11px] leading-relaxed">
                    ✨ <strong>코치 피드백:</strong> {log.feedback}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. 우리 반 '혐오 없는 평화로운 교실 지킴이 서약서' */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <FileCheck className="w-4 h-4" />
          <span>활동 2: 학급 실천 가이드라인 및 평화 교실 서약서 작성</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          우리 반만의 '혐오 없는 평화로운 교실 지킴이 서약서'
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          학교 및 전문 기관의 예방 가이드라인을 바탕으로 우리 반 친구들과 함께 지켜나갈 실천 약속을 정하고 서약서를 완성해 보세요.
        </p>

        {/* Classroom Pledge List Editor */}
        <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between">
            <span>📜 우리 반 평화 실천 약속 항목 ({pledgeItems.length}개)</span>
          </div>

          <div className="space-y-2">
            {pledgeItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 font-medium">{item}</span>
                </div>
                {pledgeItems.length > 2 && (
                  <button
                    onClick={() => handleRemovePledgeItem(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Item Form */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="새로운 실천 약속 항목 추가 (예: 갈등이 생기면 상대방의 말을 끝까지 듣겠습니다)"
              value={newPledgeText}
              onChange={(e) => setNewPledgeText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPledgeItem()}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddPledgeItem}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>추가</span>
            </button>
          </div>
        </div>

        {/* Personal Promise */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5 leading-relaxed">
            ✍️ 나의 개인 실천 서약 (6차시 교육을 마치며 나 자신과 맺는 약속):
          </label>
          <textarea
            rows={3}
            placeholder="예: 나는 일상 대화와 온라인 공간에서 어떠한 혐오 표현도 쓰지 않을 것이며, 친구가 상처받을 때 방관하지 않고 당당하게 대항발화하는 용기 있는 평화 지킴이가 되겠습니다."
            value={progress.personalPromise}
            onChange={(e) =>
              onUpdateProgress({ personalPromise: e.target.value })
            }
            className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-slate-50/50"
          />
        </div>

        {/* Pledge Sign & Certificate Generation */}
        <div className="pt-2">
          {!isFullyCompleted ? (
            <button
              onClick={handleCompletePledge}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" />
              <span>평화 교실 서약서 서명하고 6차시 프로젝트 완주하기</span>
            </button>
          ) : (
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs border border-slate-800">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-400 text-slate-950 shadow-xs">
                <Crown className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">
                  Certificate of Completion
                </span>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  중학교 혐오 표현 예방 교육 6차시 완주 인증서
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                  위 학생은 6차시 실천 중심 혐오 표현 예방 교육을 성실히 이수하고, 평화로운 교실을 지키는 <strong className="text-white">공식 평화 지킴이</strong>로 임명되었음을 인증합니다.
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-4 sm:p-5 max-w-md mx-auto border border-slate-700 text-xs text-left space-y-1.5 shadow-2xs">
                <div>
                  <span className="text-slate-400">소속: </span>
                  <span className="font-semibold text-white">{progress.gradeClass || '중학교 학급'}</span>
                </div>
                <div>
                  <span className="text-slate-400">성명: </span>
                  <span className="font-semibold text-amber-300">{progress.studentName || '평화 지킴이 학생'}</span>
                </div>
                <div>
                  <span className="text-slate-400">나의 다짐: </span>
                  <span className="italic text-slate-200">“{progress.personalPromise}”</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={onOpenPrintView}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>완성된 활동지 & 수료증 인쇄/저장</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
