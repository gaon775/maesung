export interface PyramidCard {
  id: string;
  text: string;
  category: 'origin' | 'joke' | 'exclusion' | 'violence';
  correctLevel: 1 | 2 | 3 | 4;
  explanation: string;
  exampleContext: string;
}

export interface MediaStat {
  label: string;
  value: number;
  subText: string;
  iconName: string;
}

export interface VictimCase {
  id: string;
  nickname: string;
  grade: string;
  situation: string;
  physicalImpact: string[];
  mentalImpact: string[];
  story: string;
}

export interface DetoxComment {
  id: string;
  category: string;
  originalText: string;
  harmfulPoints: string[];
  guidingQuestion: string;
  sampleRewrite: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  scenario: string;
  keyIssues: string[];
  discussionPoints: string[];
  perspectiveA: string;
  perspectiveB: string;
}

export interface CounterSpeechScenario {
  id: string;
  situation: string;
  speechType: 'fact' | 'empathy' | 'refusal' | 'pivot';
  peerStatement: string;
  recommendedResponses: string[];
  explanation: string;
}

export interface StudentProgress {
  studentName: string;
  gradeClass: string;
  completedSessions: number[];
  
  // Session 1 state
  pyramidAnswers: Record<string, number>;
  session1Reflect1: string;
  session1Reflect2: string;

  // Session 2 state
  footprintChecklist: Record<string, boolean>;
  session2MinorityOpinion: string;
  session2MyExperience: string;

  // Session 3 state
  empathySelectedCase: string;
  empathyLetter: string;
  causeAnalysis: {
    media: string;
    peerPressure: string;
    publicFigures: string;
    personalStress: string;
  };

  // Session 4 state
  detoxRewrites: Record<string, string>;
  detoxAIFeedbacks: Record<string, { score: number; praise: string; suggestion: string }>;
  campaignSlogan: string;

  // Session 5 state
  debateOpinions: Record<string, { myStance: string; solution: string }>;
  genderEqualityReflection: string;

  // Session 6 state
  counterSpeechLogs: Array<{
    scenarioId: string;
    speechType: string;
    studentMessage: string;
    peerResponse: string;
    feedback: string;
  }>;
  classPledgeItems: string[];
  personalPromise: string;
  pledgeCompleted: boolean;
}

export interface TeacherGuideData {
  sessionNum: number;
  title: string;
  objective: string;
  timeAllocation: {
    intro: { minutes: number; content: string; questions: string[] };
    development: { minutes: number; content: string; questions: string[] };
    wrapUp: { minutes: number; content: string; questions: string[] };
  };
  keyConcepts: string[];
  facilitationTips: string[];
  cautionPoints: string[];
}
