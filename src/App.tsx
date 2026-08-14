import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Printer,
  Award,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { Header } from './components/Header';
import { StudentGuideBanner } from './components/StudentGuideBanner';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { PrintableWorkbook } from './components/PrintableWorkbook';

import { Session1_Pyramid } from './components/Session1_Pyramid';
import { Session2_MediaAudit } from './components/Session2_MediaAudit';
import { Session3_EmpathyCause } from './components/Session3_EmpathyCause';
import { Session4_DetoxLiteracy } from './components/Session4_DetoxLiteracy';
import { Session5_DemocracyGender } from './components/Session5_DemocracyGender';
import { Session6_CounterSpeechPledge } from './components/Session6_CounterSpeechPledge';

import { SESSIONS_INFO, INITIAL_STUDENT_PROGRESS } from './data/curriculumData';
import { StudentProgress } from './types';

const STORAGE_KEY = 'hate_speech_prevention_progress_v1';

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STUDENT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return INITIAL_STUDENT_PROGRESS;
  });

  const [currentSession, setCurrentSession] = useState<number>(1);
  const [showGuideBanner, setShowGuideBanner] = useState<boolean>(true);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [isPrintViewOpen, setIsPrintViewOpen] = useState<boolean>(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const handleUpdateProgress = (updated: Partial<StudentProgress>) => {
    setProgress((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateStudentInfo = (name: string, gradeClass: string) => {
    handleUpdateProgress({ studentName: name, gradeClass });
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        '모든 작성 내용을 초기화하고 처음부터 다시 시작하시겠습니까?'
      )
    ) {
      setProgress(INITIAL_STUDENT_PROGRESS);
      setCurrentSession(1);
    }
  };

  const sessionInfo =
    SESSIONS_INFO.find((s) => s.num === currentSession) || SESSIONS_INFO[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Global Header */}
      <Header
        currentSession={currentSession}
        onSelectSession={(num) => setCurrentSession(num)}
        progress={progress}
        onUpdateStudentInfo={handleUpdateStudentInfo}
        onOpenTeacherGuide={() => setIsTeacherModalOpen(true)}
        onOpenPrintView={() => setIsPrintViewOpen(true)}
        showGuideBanner={showGuideBanner}
        onToggleGuideBanner={() => setShowGuideBanner(!showGuideBanner)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto pb-16">
        {/* Student Instruction Banner */}
        <StudentGuideBanner
          currentSession={currentSession}
          isOpen={showGuideBanner}
          onToggle={() => setShowGuideBanner(!showGuideBanner)}
        />

        {/* Active Session Content View */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {currentSession === 1 && (
            <Session1_Pyramid
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNextSession={() => setCurrentSession(2)}
            />
          )}

          {currentSession === 2 && (
            <Session2_MediaAudit
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNextSession={() => setCurrentSession(3)}
            />
          )}

          {currentSession === 3 && (
            <Session3_EmpathyCause
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNextSession={() => setCurrentSession(4)}
            />
          )}

          {currentSession === 4 && (
            <Session4_DetoxLiteracy
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNextSession={() => setCurrentSession(5)}
            />
          )}

          {currentSession === 5 && (
            <Session5_DemocracyGender
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNextSession={() => setCurrentSession(6)}
            />
          )}

          {currentSession === 6 && (
            <Session6_CounterSpeechPledge
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onOpenPrintView={() => setIsPrintViewOpen(true)}
            />
          )}

          {/* Bottom Session Navigation Controls */}
          <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setCurrentSession((prev) => Math.max(1, prev - 1))}
              disabled={currentSession === 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentSession === 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>이전 차시 ({Math.max(1, currentSession - 1)}차시)</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                진행 현황: <strong className="text-indigo-600">{currentSession}</strong> / 6차시
              </span>
              <button
                onClick={handleResetProgress}
                className="text-xs font-medium text-slate-400 hover:text-rose-600 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                title="처음부터 다시 작성"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>
            </div>

            <button
              onClick={() => setCurrentSession((prev) => Math.min(6, prev + 1))}
              disabled={currentSession === 6}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentSession === 6
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              <span>다음 차시 ({Math.min(6, currentSession + 1)}차시)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-semibold text-slate-700">
            중학교 혐오 표현 예방 교육 6차시 실천 중심 프로그램 | 바른말 이음
          </p>
          <p className="text-slate-400">
            내 안의 편견 마주하기 • 디지털 미디어 실태 • 피해 공감 • 댓글 디톡스 • 민주 토론 • 대항발화(Counter-Speech) 실천
          </p>
        </div>
      </footer>

      {/* Modals */}
      <TeacherGuideModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        initialSession={currentSession}
      />

      {isPrintViewOpen && (
        <PrintableWorkbook
          progress={progress}
          onClose={() => setIsPrintViewOpen(false)}
        />
      )}
    </div>
  );
}
