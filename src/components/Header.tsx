import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Printer,
  User,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { SESSIONS_INFO } from '../data/curriculumData';
import { StudentProgress } from '../types';

interface HeaderProps {
  currentSession: number;
  onSelectSession: (sessionNum: number) => void;
  progress: StudentProgress;
  onUpdateStudentInfo: (name: string, gradeClass: string) => void;
  onOpenTeacherGuide: () => void;
  onOpenPrintView: () => void;
  showGuideBanner: boolean;
  onToggleGuideBanner: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSession,
  onSelectSession,
  progress,
  onUpdateStudentInfo,
  onOpenTeacherGuide,
  onOpenPrintView,
  showGuideBanner,
  onToggleGuideBanner,
}) => {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [tempName, setTempName] = useState(progress.studentName || '');
  const [tempGradeClass, setTempGradeClass] = useState(progress.gradeClass || '');

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudentInfo(tempName, tempGradeClass);
    setIsEditingInfo(false);
  };

  const completedCount = progress.completedSessions.length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 tracking-tight">
                중학교 6차시 실천 프로젝트
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                혐오 표현 예방 교육
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              바른말 이음 <span className="text-slate-400 font-normal text-sm sm:text-base">| 스마트 실천 워크북</span>
            </h1>
          </div>
        </div>

        {/* Student Profile & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Student Profile Chip */}
          {isEditingInfo ? (
            <form onSubmit={handleSaveInfo} className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-300 text-xs shadow-2xs">
              <input
                type="text"
                placeholder="학년/반 (예: 2-3)"
                value={tempGradeClass}
                onChange={(e) => setTempGradeClass(e.target.value)}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 w-24 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                autoFocus
              />
              <input
                type="text"
                placeholder="이름 (예: 홍길동)"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 w-20 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                저장
              </button>
            </form>
          ) : (
            <button
              onClick={() => {
                setTempName(progress.studentName);
                setTempGradeClass(progress.gradeClass);
                setIsEditingInfo(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              title="클릭하여 학생 정보 수정"
            >
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {progress.studentName ? (
                  <>
                    <span className="text-slate-400 mr-1">{progress.gradeClass || '중학교'}</span>
                    <span className="text-slate-900">{progress.studentName}</span>
                  </>
                ) : (
                  <span className="text-indigo-600">👤 내 이름/학번 입력</span>
                )}
              </span>
            </button>
          )}

          {/* Student Guide Toggle */}
          <button
            onClick={onToggleGuideBanner}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors shadow-2xs ${
              showGuideBanner
                ? 'bg-amber-50 border-amber-300/80 text-amber-900 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="학생 참여 안내 가이드 토글"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">학습 안내</span>
          </button>

          {/* Teacher Guide Button */}
          <button
            onClick={onOpenTeacherGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200 text-xs font-bold text-indigo-700 transition-colors shadow-2xs"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>교사용 지도안</span>
          </button>

          {/* Printable Workbook */}
          <button
            onClick={onOpenPrintView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">활동지 인쇄</span>
          </button>
        </div>
      </div>

      {/* Session Progress Bar & Step Navigation */}
      <div className="bg-slate-50/80 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-1.5 sm:gap-2 no-scrollbar">
            {SESSIONS_INFO.map((session) => {
              const isActive = currentSession === session.num;
              const isCompleted = progress.completedSessions.includes(session.num);

              return (
                <button
                  key={session.num}
                  onClick={() => onSelectSession(session.num)}
                  className={`flex-1 min-w-[130px] sm:min-w-[160px] flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left transition-all border ${
                    isActive
                      ? 'bg-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/10 text-slate-900'
                      : isCompleted
                      ? 'bg-emerald-50/80 border-emerald-200/90 text-slate-700 hover:bg-emerald-50'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : session.num}
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold tracking-tight text-slate-900 flex items-center gap-1">
                      <span>{session.num}차시</span>
                      {isCompleted && (
                        <span className="text-[10px] text-emerald-600 font-semibold">완료</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {session.shortTitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Progress Indicator */}
        <div className="h-0.5 w-full bg-slate-200/80">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
      </div>
    </header>
  );
};
