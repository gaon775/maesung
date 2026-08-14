import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Clock,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { TEACHER_GUIDES, SESSIONS_INFO } from '../data/curriculumData';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSession?: number;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
  initialSession = 1,
}) => {
  const [selectedSession, setSelectedSession] = useState(initialSession);

  if (!isOpen) return null;

  const currentGuide =
    TEACHER_GUIDES.find((g) => g.sessionNum === selectedSession) || TEACHER_GUIDES[0];
  const sessionInfo =
    SESSIONS_INFO.find((s) => s.num === selectedSession) || SESSIONS_INFO[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  교사용 교수-학습 과정안
                </span>
                <span className="text-xs text-slate-400">45분 표준 수업 모형</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                중학교 혐오 표현 예방 교육 6차시 지도 가이드
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="지도안 인쇄"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Session Selector Tabs */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SESSIONS_INFO.map((s) => (
            <button
              key={s.num}
              onClick={() => setSelectedSession(s.num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedSession === s.num
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{s.num}차시</span>
              <span className="opacity-80 hidden sm:inline">{s.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 flex-1">
          {/* Overview Card */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
            <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
              {currentGuide.sessionNum}차시 수업 개요 & 목표
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
              {currentGuide.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              🎯 <strong className="text-slate-900">학습 목표:</strong> {currentGuide.objective}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {currentGuide.keyConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-slate-700 text-xs font-medium shadow-2xs"
                >
                  #{concept}
                </span>
              ))}
            </div>
          </div>

          {/* 45-Minute Lesson Flow (도입, 전개, 정리) */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>45분 표준 수업 진행 흐름 (도입 - 전개 - 정리)</span>
            </h4>

            <div className="space-y-3">
              {/* 도입 */}
              <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold">
                    도입 ({currentGuide.timeAllocation.intro.minutes}분)
                  </span>
                  <span className="text-xs text-slate-400 font-medium">동기 유발 및 문제 인식</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                  {currentGuide.timeAllocation.intro.content}
                </p>
                <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-200/60 text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    교사용 핵심 발문:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    {currentGuide.timeAllocation.intro.questions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 전개 */}
              <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-800 text-xs font-bold">
                    전개 ({currentGuide.timeAllocation.development.minutes}분)
                  </span>
                  <span className="text-xs text-slate-400 font-medium">실천 활동 및 모둠 협동 학습</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                  {currentGuide.timeAllocation.development.content}
                </p>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-200/60 text-xs text-indigo-900">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-700" />
                    교사용 핵심 발문:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-indigo-800">
                    {currentGuide.timeAllocation.development.questions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 정리 */}
              <div className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold">
                    정리 ({currentGuide.timeAllocation.wrapUp.minutes}분)
                  </span>
                  <span className="text-xs text-slate-400 font-medium">성찰, 자가진단 및 배지 획득</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                  {currentGuide.timeAllocation.wrapUp.content}
                </p>
                <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-200/60 text-xs text-emerald-900">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                    교사용 핵심 발문:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-emerald-800">
                    {currentGuide.timeAllocation.wrapUp.questions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Facilitation Tips & Caution Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tips */}
            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
              <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>수업 운영 및 촉진 팁 (Facilitation Tips)</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
                {currentGuide.facilitationTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Caution */}
            <div className="bg-rose-50/60 rounded-2xl p-4 sm:p-5 border border-rose-200/70 shadow-2xs">
              <h5 className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>지도상 유의점 & 안전 가이드</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-rose-800 leading-relaxed">
                {currentGuide.cautionPoints.map((caution, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{caution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            * 디지털 교과서 및 스마트패드(Chromebook, Tablet) 전 기기 완벽 지원
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            확인 및 수업 진행하기
          </button>
        </div>
      </div>
    </div>
  );
};
