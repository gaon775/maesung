import React from 'react';
import { Printer, X, Award, CheckCircle2 } from 'lucide-react';
import { StudentProgress } from '../types';
import {
  PYRAMID_CARDS,
  MEDIA_STATS,
  VICTIM_CASES,
  DETOX_COMMENTS,
  DEBATE_TOPICS,
} from '../data/curriculumData';

interface PrintableWorkbookProps {
  progress: StudentProgress;
  onClose: () => void;
}

export const PrintableWorkbook: React.FC<PrintableWorkbookProps> = ({
  progress,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-sm text-slate-100">
              6차시 전체 활동지 인쇄 및 PDF 저장 뷰
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>지금 인쇄하기 (Print / PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 overflow-y-auto space-y-8 text-slate-900 print:p-0 print:overflow-visible">
          {/* Cover Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-2">
            <div className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
              Middle School Hate Speech Prevention Education Portfolio
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              중학교 혐오 표현 예방 교육 6차시 실천 워크북
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              바른말 이음 — 존중과 공감으로 만드는 평화로운 우리 교실
            </p>

            <div className="pt-3 flex justify-between items-center text-xs font-semibold text-slate-700 border-t border-slate-200/80">
              <div>
                소속: <span className="underline font-bold text-slate-900">{progress.gradeClass || '중학교'}</span>
              </div>
              <div>
                성명: <span className="underline font-bold text-slate-900">{progress.studentName || '미작성'}</span>
              </div>
              <div>작성일: {currentDate}</div>
            </div>
          </div>

          {/* 1차시 요약 */}
          <section className="space-y-2 border-b border-slate-200/80 pb-5">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60">
              <span>[1차시] 내 안의 편견과 '혐오 표현 피라미드' 마주하기</span>
            </div>
            <div className="text-xs space-y-2 text-slate-800">
              <div>
                <strong className="text-slate-900 font-semibold">1. 일상 농담(1~2단계)이 폭력(3~4단계)으로 번지는 이유:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1 italic text-slate-700">
                  {progress.session1Reflect1 || '(미작성)'}
                </p>
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">2. 오늘부터 내가 멈추기로 다짐한 표현:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1 italic text-slate-700">
                  {progress.session1Reflect2 || '(미작성)'}
                </p>
              </div>
            </div>
          </section>

          {/* 2차시 요약 */}
          <section className="space-y-2 border-b border-slate-200/80 pb-5">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-indigo-900 bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200/60">
              <span>[2차시] 디지털 세상 속 나의 모습: 실태 조사로 돌아보는 미디어 환경</span>
            </div>
            <div className="text-xs space-y-2 text-slate-800">
              <div>
                <strong className="text-slate-900 font-semibold">1. 단톡방/게임/댓글에서 목격했던 혐오 표현 경험:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1 italic text-slate-700">
                  {progress.session2MyExperience || '(미작성)'}
                </p>
              </div>
              <div>
                <strong className="text-slate-900 font-semibold">2. 소수집단에 대한 미디어의 편견과 나의 생각:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1 italic text-slate-700">
                  {progress.session2MinorityOpinion || '(미작성)'}
                </p>
              </div>
            </div>
          </section>

          {/* 3차시 요약 */}
          <section className="space-y-2 border-b border-slate-200/80 pb-5">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-rose-900 bg-rose-50/80 p-2.5 rounded-xl border border-rose-200/60">
              <span>[3차시] 혐오의 무게: 상처받는 마음과 그 원인 추적하기</span>
            </div>
            <div className="text-xs space-y-2 text-slate-800">
              <div>
                <strong className="text-slate-900 font-semibold">1. 피해 청소년에게 보낸 공감과 위로의 편지:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1 italic text-slate-700">
                  {progress.empathyLetter || '(미작성)'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <strong>미디어 원인:</strong> {progress.causeAnalysis?.media || '(미작성)'}
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <strong>또래 모방 원인:</strong> {progress.causeAnalysis?.peerPressure || '(미작성)'}
                </div>
              </div>
            </div>
          </section>

          {/* 4차시 요약 */}
          <section className="space-y-2 border-b border-slate-200/80 pb-5">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-emerald-900 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/60">
              <span>[4차시] 랜선 비판적 읽기: 디지털 미디어 리터러시 트레이닝</span>
            </div>
            <div className="text-xs space-y-2 text-slate-800">
              <div>
                <strong className="text-slate-900 font-semibold">1. 내가 제작한 디지털 에티켓 공익 슬로건:</strong>
                <p className="p-3 bg-emerald-50 text-emerald-950 font-bold rounded-xl border border-emerald-300 mt-1 text-center">
                  “{progress.campaignSlogan || '(슬로건 미작성)'}”
                </p>
              </div>
            </div>
          </section>

          {/* 5차시 요약 */}
          <section className="space-y-2 border-b border-slate-200/80 pb-5">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-indigo-900 bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200/60">
              <span>[5차시] 교실 속 민주주의: 토론과 포괄적 성교육으로 편견 넘기</span>
            </div>
            <div className="text-xs space-y-2 text-slate-800">
              <div>
                <strong className="text-slate-900 font-semibold">1. 성평등 관점 기반 상호 존중 소통 다짐:</strong>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mt-1 italic text-slate-700">
                  {progress.genderEqualityReflection || '(미작성)'}
                </p>
              </div>
            </div>
          </section>

          {/* 6차시 & 수료증 */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-indigo-900 bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-200/60">
              <span>[6차시] 방관자를 넘어서: '대항발화' 실천 및 평화 서약</span>
            </div>

            <div className="border border-indigo-500/80 rounded-2xl p-5 bg-indigo-50/30 text-center space-y-3">
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-widest">
                우리 반 혐오 없는 평화로운 교실 지킴이 서약서
              </div>

              <div className="text-xs text-slate-800 space-y-1.5 max-w-lg mx-auto text-left">
                {progress.classPledgeItems?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-indigo-200/80 text-xs">
                <div className="font-bold text-slate-900 mb-1">
                  나의 개인 실천 서약:
                </div>
                <p className="italic text-indigo-950 font-medium">
                  “{progress.personalPromise || '혐오 표현에 침묵하지 않고 존중을 실천하겠습니다.'}”
                </p>
              </div>

              <div className="pt-2 flex justify-between text-xs font-semibold text-slate-700">
                <span>지도교사 확인: ________________ (인)</span>
                <span>서약자 학생: {progress.studentName || '___________'} (서명)</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
