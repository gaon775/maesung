import {
  PyramidCard,
  MediaStat,
  VictimCase,
  DetoxComment,
  DebateTopic,
  CounterSpeechScenario,
  TeacherGuideData,
} from '../types';

export const SESSIONS_INFO = [
  {
    num: 1,
    title: "내 안의 편견과 '혐오 표현 피라미드' 마주하기",
    shortTitle: "혐오 피라미드 탐색",
    subtitle: "가벼운 농담에서 극단적 폭력으로 커지는 피라미드 구조 이해",
    tagline: "1단계 편견이 4단계 폭력으로 번지는 원리 파악",
    badge: "편견 감지기",
    color: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50 border-amber-200 text-amber-900",
    themeColor: "amber",
  },
  {
    num: 2,
    title: "디지털 세상 속 나의 모습: 실태 조사로 돌아보는 미디어 환경",
    shortTitle: "디지털 미디어 실태",
    subtitle: "청소년 혐오 표현 노출 통계와 나의 디지털 발자국 점검",
    tagline: "SNS 79.1% 노출 현실과 또래·사회적 인식 성찰",
    badge: "데이터 분석가",
    color: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50 border-blue-200 text-blue-900",
    themeColor: "blue",
  },
  {
    num: 3,
    title: "혐오의 무게: 상처받는 마음과 그 원인 추적하기",
    shortTitle: "피해 공감 & 원인 추적",
    subtitle: "피해 청소년의 마음 공감과 혐오가 번지는 구조적 원인 맵핑",
    tagline: "단순 분노를 넘어선 2년 이상의 트라우마 치유",
    badge: "공감 추적자",
    color: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50 border-rose-200 text-rose-900",
    themeColor: "rose",
  },
  {
    num: 4,
    title: "랜선 비판적 읽기: 디지털 미디어 리터러시 트레이닝",
    shortTitle: "댓글 디톡스 챌린지",
    subtitle: "인터넷 혐오 댓글 필터링과 '순화된 언어' 재작성 챌린지",
    tagline: "타인을 살리는 인권 존중의 언어로 직접 고쳐 쓰기",
    badge: "언어 정화사",
    color: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    themeColor: "emerald",
  },
  {
    num: 5,
    title: "교실 속 민주주의: 토론과 포괄적 성교육으로 편견 넘기",
    shortTitle: "교실 속 민주 토론",
    subtitle: "갈등 상황 롤플레잉 토론과 성평등·미러링 악순환 끊기",
    tagline: "남성혐오·여성혐오 고정관념을 넘어 상호 존중으로",
    badge: "민주 토론가",
    color: "from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50 border-indigo-200 text-indigo-900",
    themeColor: "indigo",
  },
  {
    num: 6,
    title: "방관자를 넘어서: '대항발화(Counter-Speech)' 실천 프로젝트",
    shortTitle: "대항발화 & 평화 서약",
    subtitle: "침묵하지 않는 대항발화 화법 훈련 및 우리 반 평화 서약서 제작",
    tagline: "방관자에서 행동하는 옹호자로 거듭나기",
    badge: "평화 지킴이",
    color: "from-violet-500 to-fuchsia-600",
    lightBg: "bg-violet-50 border-violet-200 text-violet-900",
    themeColor: "violet",
  },
];

// Session 1: Pyramid Cards
export const PYRAMID_CARDS: PyramidCard[] = [
  {
    id: "p1",
    text: "“너 어디 출신이야? 사투리 쓰니까 좀 촌스럽고 신기하다.”",
    category: "origin",
    correctLevel: 1,
    explanation: "1단계: 편견 및 고정관념에 기반한 태도입니다. 악의가 없다고 생각해도 특정 지역이나 출신에 대한 선입견을 강화합니다.",
    exampleContext: "일상적인 대화에서 흔히 농담처럼 오가는 출신/배경에 대한 고정관념"
  },
  {
    id: "p2",
    text: "“여자는 원래 수학 못하고 남자는 원래 감정이 메말랐잖아~”",
    category: "joke",
    correctLevel: 1,
    explanation: "1단계: 성별 고정관념에 기반한 편견입니다. 개인의 다양한 잠재력을 성별이라는 틀에 가둡니다.",
    exampleContext: "친구들끼리 성별에 따른 능력을 단정 짓는 말"
  },
  {
    id: "p3",
    text: "“야 너 완전 급식충/틀딱/○○충 같아 ㅋㅋㅋ 말 섞지 마.”",
    category: "joke",
    correctLevel: 2,
    explanation: "2단계: 편견적 표현 및 비하/조롱입니다. 특정 집단을 벌레(충) 등에 비유하여 인간적인 존엄을 깎아내리는 언어폭력입니다.",
    exampleContext: "온라인 댓글이나 단톡방에서 유행어처럼 남발되는 멸칭"
  },
  {
    id: "p4",
    text: "“쟤 장애인 티 팍팍 내네. 꼴 보기 싫으니까 저리 가라 그래.”",
    category: "joke",
    correctLevel: 2,
    explanation: "2단계: 소수자 집단의 특성을 부정적인 비하의 도구로 사용하는 명백한 혐오 표현입니다.",
    exampleContext: "게임 중 실수하거나 마음에 안 드는 행동을 했을 때 쏟아내는 비하 발언"
  },
  {
    id: "p5",
    text: "“우리 단톡방에서 쟤 내보내고 다른 방 파자. 쟤랑 말 섞는 사람도 다 같이 손절이야.”",
    category: "exclusion",
    correctLevel: 3,
    explanation: "3단계: 집단적 차별 및 배제(따돌림)입니다. 의도적으로 관계에서 고립시키고 집단에서 배제하는 행동입니다.",
    exampleContext: "학급 또는 또래 무리 내에서 발생하는 집단 따돌림과 카톡 감옥/배제"
  },
  {
    id: "p6",
    text: "“우리 식당/가게에 저런 특정 국적/집단 사람들은 출입 금지합니다.”",
    category: "exclusion",
    correctLevel: 3,
    explanation: "3단계: 특정 집단의 구성원이라는 이유만으로 공간 이용이나 사회적 권리를 박탈하는 제도적·사회적 차별입니다.",
    exampleContext: "사회적 공간이나 모임에서의 집단 거부와 출입 차단"
  },
  {
    id: "p7",
    text: "“저 집단 놈들 지나갈 때 단체로 둘러싸서 겁주고 길바닥에 넘어뜨려 버리자.”",
    category: "violence",
    correctLevel: 4,
    explanation: "4단계: 신체적 위협 및 폭력/혐오 범죄입니다. 언어적 혐오가 용인된 사회에서 발생하는 실제 물리적 폭력 단계입니다.",
    exampleContext: "혐오가 현실의 물리적 공격, 집단 폭행, 살해 협박으로 이어지는 극단적 단계"
  },
  {
    id: "p8",
    text: "“집주소 알아내서 밤에 찾아가서 싹 다 불지르고 없애버리겠다.”",
    category: "violence",
    correctLevel: 4,
    explanation: "4단계: 증오와 적대감이 극에 달해 특정 개인이나 집단의 생명과 안전을 위협하는 중대 범죄 행위입니다.",
    exampleContext: "온라인 신상 털기 후 오프라인 살해 협박 및 테러 위협"
  }
];

// Session 2: Statistics & Media Audit
export const MEDIA_STATS: MediaStat[] = [
  {
    label: "인터넷·SNS 노출률",
    value: 79.1,
    subText: "청소년 10명 중 약 8명이 온라인 공간에서 혐오 표현을 직접 목격하거나 접함",
    iconName: "Globe"
  },
  {
    label: "유튜브·동영상 댓글",
    value: 68.2,
    subText: "자극적인 쇼츠, 릴스, 영상 댓글란을 통해 무분별하게 유입되는 혐오 발언",
    iconName: "Video"
  },
  {
    label: "온라인 게임 채팅",
    value: 56.4,
    subText: "게임 승패 과정에서 발생하는 부모 비하, 성차별 욕설, 소수자 비하",
    iconName: "Gamepad2"
  },
  {
    label: "친구·또래 집단 접촉",
    value: 22.3,
    subText: "‘남들도 다 쓰니까’, ‘재밌는 밈이라서’ 친구를 통해 학습되는 모방 경향",
    iconName: "Users"
  },
  {
    label: "언론인·방송 매체",
    value: 18.2,
    subText: "자극적인 헤드라인과 편견 섞인 프레임으로 갈등을 조장하는 미디어 보도",
    iconName: "Newspaper"
  },
  {
    label: "정치인·사회적 공인",
    value: 16.5,
    subText: "갈라치기와 혐오를 정치적 목적으로 이용하는 공인들의 무책임한 발언",
    iconName: "Megaphone"
  }
];

export const DIGITAL_FOOTPRINT_QUESTIONS = [
  {
    id: "q1",
    question: "게임이나 단톡방에서 화가 날 때 나도 모르게 특정 집단을 비하하는 유행어(예: ○○충, 잼민이 등)를 쓴 적이 있다.",
    category: "사용 습관"
  },
  {
    id: "q2",
    question: "유튜브나 SNS 댓글에서 특정 성별, 외국인, 약자를 조롱하는 영상을 보고 ‘좋아요’를 누르거나 친구에게 공유한 적이 있다.",
    category: "확산 및 동조"
  },
  {
    id: "q3",
    question: "친구 무리에서 누군가를 깎아내리는 농담을 할 때, 분위기상 어색해질까 봐 같이 웃거나 맞장구를 친 적이 있다.",
    category: "방관 및 동조"
  },
  {
    id: "q4",
    question: "인터넷에서 자극적인 갈등 기사를 볼 때, 사실 확인 없이 댓글의 분노 여론에 쉽게 휩쓸린 적이 있다.",
    category: "미디어 수용"
  },
  {
    id: "q5",
    question: "온라인에서 나와 생각이 다르거나 소수 집단에 속한 사람에게 공격적인 댓글을 달아본 적이 있다.",
    category: "직접 발화"
  }
];

// Session 3: Victim Cases & Mind Map Causes
export const VICTIM_CASES: VictimCase[] = [
  {
    id: "case1",
    nickname: "민우(가명)",
    grade: "중학교 2학년",
    situation: "온라인 게임에서 실수를 했다는 이유로 단톡방에서 '장애인 취급'과 가족 비하 욕설을 3개월간 당함",
    physicalImpact: ["만성 신경성 두통과 복통", "수면 장애 (가위눌림)", "식욕 부진으로 체중 4kg 감소"],
    mentalImpact: ["학교 가기가 두려워 자퇴 고민", "모르는 사람과 눈을 마주치지 못하는 대인기피", "핸드폰 알림음만 울려도 심장이 쿵쾅거림 (2년 이상 트라우마)"],
    story: "처음에는 게임 속 가벼운 장난인 줄 알았어요. 그런데 학교 단톡방에까지 제 얼굴을 캡처해서 조롱 밈을 만들고, '저런 놈은 사회에서 걸러야 한다'며 배제하기 시작했습니다. 1년이 지난 지금도 길을 걸을 때 뒤에서 웃음소리가 들리면 날 비웃는 것 같아 식은땀이 납니다."
  },
  {
    id: "case2",
    nickname: "서연(가명)",
    grade: "중학교 3학년",
    situation: "다문화 가정이라는 이유로 반 친구들에게 '외국인 노동자 자식'이라는 멸칭과 편견 섞인 수군거림을 지속적으로 겪음",
    physicalImpact: ["잦은 감기와 면역력 저하", "가슴 답답함과 과호흡 증상", "불안으로 인한 손톱 물어뜯기"],
    mentalImpact: ["나의 뿌리와 가족에 대한 수치심과 죄책감", "‘내가 사라지면 모두가 편할까’라는 우울감", "새로운 친구를 사귀는 것에 대한 극심한 불신"],
    story: "부모님이 다른 나라에서 오셨다는 건 제가 부끄러워할 일이 아니었는데, 친구들이 SNS 댓글로 '너희 나라로 돌아가라'는 식의 밈을 올릴 때마다 세상에 제가 있을 자리가 없는 것 같았어요. 부모님께 상처가 될까 봐 집에서도 말하지 못하고 혼자 울었습니다."
  },
  {
    id: "case3",
    nickname: "준호(가명)",
    grade: "중학교 1학년",
    situation: "체격이 작고 얌전하다는 이유로 남학생 단톡방에서 여성 비하적 표현과 함께 지속적인 조롱을 당함",
    physicalImpact: ["등교 전 구토 증세", "극심한 만성 피로", "소화 불량"],
    mentalImpact: ["자존감 바닥으로 인한 무기력증", "자신을 지키지 못했다는 자책감", "사람 많은 공간(학원, 교실)에 대한 공포"],
    story: "친구들은 '장난인데 왜 그렇게 진지하냐, 쿨하지 못하다'라며 저를 더 몰아세웠어요. 장난이라는 이름 뒤에 숨어서 던진 말 한마디 한마디가 제게는 칼날처럼 박혔습니다. 가해자들은 다음 날 아무렇지 않게 웃고 떠드는데, 제 시간은 멈춰버렸습니다."
  }
];

// Session 4: Detox Comments
export const DETOX_COMMENTS: DetoxComment[] = [
  {
    id: "detox1",
    category: "성별·능력 편견 댓글",
    originalText: "“여자가 무슨 리더를 해? 감정적이라 일 망치니까 그냥 뒤에서 청소나 해라 ㅋㅋㅋ”",
    harmfulPoints: ["성별에 따른 능력 편견", "인격 폄하 및 조롱", "특정 성별의 사회적 참여 제한"],
    guidingQuestion: "능력과 자질은 성별이 아니라 개인의 노력과 역량으로 평가해야 합니다. 이를 존중하는 문장으로 바꿔볼까요?",
    sampleRewrite: "“리더십은 성별과 상관없이 책임감과 소통 능력으로 발휘되는 것입니다. 편견 없이 팀원의 역량을 믿고 함께 협력합시다.”"
  },
  {
    id: "detox2",
    category: "연령·세대 비하 멸칭",
    originalText: "“요즘 잼민이/급식충들 진짜 뇌가 없나? 길거리에서 마주치면 패주고 싶네.”",
    harmfulPoints: ["어린이·청소년 전체를 벌레(충)에 비유", "폭력 선동 및 신체적 위협", "세대 간 갈등 유발"],
    guidingQuestion: "성장기 청소년들의 시행착오를 따뜻하게 이끌어주고 건강한 대화를 제안하는 언어로 고쳐보세요.",
    sampleRewrite: "“누구나 어리고 미숙했던 시절이 있습니다. 비난과 멸칭 대신 서로 배려하는 공공 에티켓을 함께 배우고 지켜나가면 좋겠습니다.”"
  },
  {
    id: "detox3",
    category: "다문화·외국인 혐오",
    originalText: "“외국인 노동자들 싹 다 쫓아내라. 범죄율만 높이고 우리나라 세금만 축낸다.”",
    harmfulPoints: ["거짓 통계에 기반한 선동", "특정 출신 집단 전체에 대한 낙인", "집단 추방 및 배제 선동"],
    guidingQuestion: "외국인 주민들도 우리 사회를 지탱하는 소중한 구성원입니다. 사실과 상생의 관점에서 표현해보세요.",
    sampleRewrite: "“실제 통계상 다문화 구성원들의 범죄율은 높지 않으며, 우리 사회의 다양한 산업에서 큰 기여를 하고 있습니다. 차별 없는 상생의 시선이 필요합니다.”"
  },
  {
    id: "detox4",
    category: "외모·신체 비하",
    originalText: "“와 쟤 턱주가리 실화냐? 뚱뚱해서 돼지 같네. 밖에는 어떻게 돌아다님?”",
    harmfulPoints: ["신체적 특징에 대한 원색적 조롱", "인간의 존엄성 훼손", "외모지상주의 조장"],
    guidingQuestion: "사람의 가치는 외모가 아닌 내면과 개성에 있습니다. 타인의 외모를 평가하지 않는 존중의 문장으로 바꿔보세요.",
    sampleRewrite: "“외모는 타인이 함부로 품평하거나 조롱할 대상이 아닙니다. 서로의 고유한 개성과 매력을 존중하는 문화가 정착되어야 합니다.”"
  }
];

// Session 5: Debate Topics
export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: "debate1",
    title: "상황 1: '단톡방 굴욕 사진 밈' — 친한 사이의 유쾌한 장난인가, 사이버 혐오 폭력인가?",
    scenario: "학급 단톡방에서 한 친구의 졸린 표정 굴욕 사진을 캡처하여 '오늘자 레전드 빻은 얼굴'이라는 문구와 함께 밈 스티커를 만들어 돌려보며 웃고 있습니다. 당사자는 하지 말라고 했지만, 친구들은 '친하니까 장난치는 건데 왜 혼자 진지 빠냐'며 계속 공유합니다.",
    keyIssues: ["친밀감이라는 핑계로 합리화되는 언어폭력", "당사자의 거부 의사를 무시하는 또래 압력", "디지털 공간에서의 잊힐 권리와 2차 가해"],
    discussionPoints: ["친한 친구 사이라도 상대방이 불쾌감을 표시했다면 멈춰야 하는가?", "장난과 괴롭힘을 구분하는 객관적 기준은 무엇인가?"],
    perspectiveA: "장난을 친 사람들은 악의가 없었고 웃자고 한 일이다. 너무 민감하게 반응하면 학급 분위기만 어색해진다.",
    perspectiveB: "상대방이 고통받는 순간 이미 장난이 아닌 폭력이다. 친하다는 이유로 선을 넘는 행위는 더 큰 집단 배제로 이어질 수 있다."
  },
  {
    id: "debate2",
    title: "상황 2: '혐오에 맞선 미러링(Mirroring)' — 효과적인 저항인가, 혐오의 재생산인가?",
    scenario: "인터넷과 학교에서 특정 성별을 비하하는 혐오 단어들이 퍼지자, 반대편에서도 똑같은 수위의 반대 성별 멸칭을 만들어 '너희도 당해보라'며 되갚아주는 미러링 표현을 쓰기 시작했습니다. 이로 인해 교실 내 남녀 학생 간 갈등의 골이 더욱 깊어졌습니다.",
    keyIssues: ["혐오에 혐오로 맞서는 미러링의 한계", "성별 이분법적 적대감 심화", "진정한 성평등과 상호 존중 소통의 길"],
    discussionPoints: ["미러링이 상대방에게 문제의 심각성을 깨닫게 하는 효과가 있는가?", "결국 또 다른 혐오를 낳아 대화와 공존을 불가능하게 만드는가?"],
    perspectiveA: "일방적으로 당하기만 하면 가해자들은 모른다. 똑같이 되돌려주어야 자신들의 언어가 얼마나 폭력적인지 체감할 수 있다.",
    perspectiveB: "눈에는 눈, 이에는 이 방식은 온 세상을 눈멀게 만든다. 혐오를 복제하는 것은 결국 혐오 표현의 사용 자체를 정당화시킬 뿐이다."
  }
];

// Session 6: Counter-Speech Scenarios
export const COUNTER_SPEECH_SCENARIOS: CounterSpeechScenario[] = [
  {
    id: "cs1",
    situation: "쉬는 시간, 친구들이 소수 집단이나 특정 지역 사람들에 대해 가짜 뉴스나 편견 섞인 비하 발언을 재미 삼아 떠들고 있을 때",
    speechType: "fact",
    peerStatement: "“야, 쟤네 집안 사람들 다 범죄자 출신이라더니 진짜 위험한 놈들이네 ㅋㅋㅋ 뉴스 보니까 소수자들은 다 문제 덩어리라던데?”",
    recommendedResponses: [
      "“그거 확인된 사실 아니야. 자극적인 가짜 뉴스에 속지 말고 정확한 팩트를 확인해보자.”",
      "“특정 집단 전체를 그렇게 일반화하는 건 잘못된 편견이야. 통계 자료도 전혀 그렇지 않아.”"
    ],
    explanation: "사실 정정형 대항발화: 감정적으로 맞서기보다 객관적인 팩트와 논리를 차분하게 제시하여 왜곡된 정보를 바로잡습니다."
  },
  {
    id: "cs2",
    situation: "온라인 게임 중 팀원이 실수하자, 다른 친구가 부모 비하 및 심각한 장애인 비하 욕설을 퍼붓고 있을 때",
    speechType: "empathy",
    peerStatement: "“아 진짜 눈깔이 삐었나 장애인이야 뭐야? 저딴 놈 때문에 게임 졌네 ㅋㅋㅋ 멘탈 털려봐라”",
    recommendedResponses: [
      "“게임에서 질 수도 있지, 그런 표현은 상대방에게 너무 큰 상처가 돼.”",
      "“장애를 욕으로 쓰는 건 부끄러운 일이야. 듣는 사람 마음을 한 번만 생각해보자.”"
    ],
    explanation: "감정 환기/공감 유도형 대항발화: 공격받는 사람의 고통을 환기시키고, 언어의 칼날이 얼마나 아픈지 공감을 이끌어냅니다."
  },
  {
    id: "cs3",
    situation: "단톡방에서 친구들이 특정 친구의 외모나 말투를 캡처해 조롱하며 같이 웃자고 부추길 때",
    speechType: "refusal",
    peerStatement: "“야 ㅋㅋㅋ 너도 이거 보고 웃기지? 빨리 리액션해 봐, 너도 같은 생각이지?”",
    recommendedResponses: [
      "“난 남을 깎아내리는 농담에는 전혀 웃음이 안 나. 그런 장난은 같이 안 할래.”",
      "“동의하지 않아. 우리 이런 조롱 밈 공유하는 거 이제 그만 멈추자.”"
    ],
    explanation: "동조 거부형 대항발화: 또래 압력에 굴복하지 않고, 단호하게 침묵을 깨며 혐오 문화에 동참하지 않겠다는 경계선을 긋습니다."
  },
  {
    id: "cs4",
    situation: "교실에서 친구들이 성별 고정관념이나 혐오 유행어를 쓰며 분위기를 험악하게 몰고 갈 때",
    speechType: "pivot",
    peerStatement: "“역시 남자는/여자는 이래서 안 된다니까? 쟤네들 싹 다 걸러야 해.”",
    recommendedResponses: [
      "“우리 그런 편견 섞인 말 대신 서로 칭찬하고 재미있는 다음 활동 이야기하자!”",
      "“서로 갈라치기하지 말고, 우리가 어떻게 하면 다 같이 즐겁게 지낼 수 있을지 좋은 아이디어를 내보자.”"
    ],
    explanation: "대안 제시 및 분위기 전환형 대항발화: 혐오 발화를 긍정적이고 건설적인 화제로 부드럽게 유도하여 건강한 대화 분위기를 만듭니다."
  }
];

// Teacher Lesson Plan & Facilitation Guides
export const TEACHER_GUIDES: TeacherGuideData[] = [
  {
    sessionNum: 1,
    title: "내 안의 편견과 '혐오 표현 피라미드' 마주하기",
    objective: "혐오 표현의 개념을 바르게 이해하고, 일상 속 가벼운 농담이나 편견이 어떻게 폭력으로 이어지는지 피라미드 구조를 통해 스스로 진단한다.",
    timeAllocation: {
      intro: {
        minutes: 10,
        content: "동기 유발: 일상에서 '장난'이라고 생각했던 말이 누군가에게 비수가 되었던 경험 나누기. 혐오 표현의 사전적·법적 정의 탐구.",
        questions: ["'단순한 농담'과 '혐오 표현'은 어떤 기준으로 구분할 수 있을까요?", "우리 사회에서 혐오가 발생하는 근본적인 마음은 무엇일까요?"]
      },
      development: {
        minutes: 25,
        content: "'말풍선 피라미드' 4단계 워크숍: 1단계(편견적 태도) -> 2단계(비하/조롱) -> 3단계(집단 배제/차별) -> 4단계(폭력/범죄) 카드 분류 및 모둠 토론.",
        questions: ["왜 1단계의 가벼운 고정관념을 방치하면 3~4단계의 폭력으로 번지게 될까요?", "피라미드의 기초가 무너지면 꼭대기의 폭력도 사라질 수 있을까요?"]
      },
      wrapUp: {
        minutes: 10,
        content: "학습 내용 정리 및 나의 언어 습관 자가진단표 작성. 다음 차시(디지털 미디어 실태 조사) 예고.",
        questions: ["오늘 수업을 통해 내 안의 어떤 작은 편견을 발견했나요?"]
      }
    },
    keyConcepts: ["혐오 표현의 정의", "피라미드 4단계 전개 구조", "일상적 편견의 위험성", "언어의 확장성"],
    facilitationTips: [
      "학생들이 특정 학생을 지목하여 비난하지 않도록 일반적인 상황 예시 카드로 접근하도록 유도합니다.",
      "1단계 카드를 다룰 때 '나도 무심코 쓴 적이 있다'는 점을 솔직하게 인정하는 안전한 학급 분위기를 조성합니다."
    ],
    cautionPoints: [
      "혐오 표현 예시 단어를 소리 내어 크게 외치며 장난치는 일이 없도록 진지한 수업 규범을 사전에 안내합니다."
    ]
  },
  {
    sessionNum: 2,
    title: "디지털 세상 속 나의 모습: 실태 조사로 돌아보는 미디어 환경",
    objective: "청소년의 혐오 표현 노출 실태 통계를 바탕으로, 자신이 매일 접하는 온라인 공간과 또래 관계를 객관적으로 분석한다.",
    timeAllocation: {
      intro: {
        minutes: 10,
        content: "실태 통계 데이터 브리핑: 청소년 79.1%가 SNS/인터넷에서 혐오 표현에 노출되는 현실 확인 및 충격 요인 점검.",
        questions: ["우리가 매일 쓰는 스마트폰 속에서 혐오 표현을 얼마나 자주 보나요?", "가장 많이 접하는 플랫폼(유튜브, 게임, 인스타)은 어디인가요?"]
      },
      development: {
        minutes: 25,
        content: "'디지털 발자국' 점검 체크리스트 수행 및 또래 집단/사회적 공인의 언행이 미치는 영향 모둠 토론.",
        questions: ["'남들도 다 쓰니까'라는 생각이 우리를 어떻게 무감각하게 만들었을까요?", "사회적 공인이나 인플루언서의 혐오 발언은 청소년에게 어떤 영향을 줄까요?"]
      },
      wrapUp: {
        minutes: 10,
        content: "소수집단(소년범, 다문화, 장애인 등)에 대한 사회적 시선의 명과 암을 기록하고 객관적 미디어 소비 다짐하기.",
        questions: ["나의 디지털 발자국 점수는 몇 점이었나요? 앞으로 어떤 태도를 취해야 할까요?"]
      }
    },
    keyConcepts: ["디지털 노출 실태 통계 (79.1%)", "디지털 발자국", "모방 심리와 동조 압력", "미디어 리터러시"],
    facilitationTips: [
      "통계 그래프를 인터랙티브하게 조작해보며 숫자가 주는 객관적 심각성을 체감하도록 돕습니다.",
      "단순한 자책이 아니라 건강한 디지털 시민으로 성장하기 위한 메타인지 과정임을 강조합니다."
    ],
    cautionPoints: [
      "실태 점검 중 과거 잘못을 공개적으로 추궁하는 형태가 되지 않도록 비밀 보장 원칙을 지킵니다."
    ]
  },
  {
    sessionNum: 3,
    title: "혐오의 무게: 상처받는 마음과 그 원인 추적하기",
    objective: "혐오 표현이 타인에게 미치는 신체적·정신적 피해를 공감하고, 우리 사회와 또래 문화 속에 혐오가 자리 잡은 원인을 추적한다.",
    timeAllocation: {
      intro: {
        minutes: 10,
        content: "피해 사례 인터뷰 스토리텔링: 단순한 '기분 나쁨'을 넘어 자퇴 고민, 신체 잔병치레, 2년 이상 지속되는 트라우마 조명.",
        questions: ["말 한마디가 몸의 질병(두통, 복통)으로까지 이어지는 이유는 무엇일까요?", "피해자가 겪는 가장 큰 고통은 무엇일까요?"]
      },
      development: {
        minutes: 25,
        content: "'공감의 편지' 작성 및 원인 입체 분석 맵핑(미디어 알고리즘, 또래 동조, 공인의 언행, 개인 스트레스) 조별 발표.",
        questions: ["혐오를 쓰는 사람들의 내면에는 어떤 심리(불안, 우월감, 스트레스)가 숨어 있을까요?", "구조적 원인을 해결하기 위해 사회와 우리는 무엇을 해야 할까요?"]
      },
      wrapUp: {
        minutes: 10,
        content: "공감의 온도계 확인 및 피해 청소년을 위한 따뜻한 지지 메시지 공유.",
        questions: ["오늘 내가 쓴 공감의 한 줄은 무엇인가요?"]
      }
    },
    keyConcepts: ["피해자의 신체적·정신적 외상(트라우마)", "공감 역량", "구조적 원인 4대 축", "심리적 메커니즘"],
    facilitationTips: [
      "피해 사례를 읽을 때 깊은 정서적 몰입이 일어날 수 있도록 조용하고 경건한 음악이나 차분한 분위기를 유도합니다.",
      "공감 편지는 학급 친구들뿐만 아니라 보이지 않는 온라인 피해자 모두를 위로하는 마음으로 작성하게 합니다."
    ],
    cautionPoints: [
      "교실 내에 실제 유사 피해를 겪고 있는 학생이 있을 수 있으므로 세심한 정서적 관찰과 지지가 필요합니다."
    ]
  },
  {
    sessionNum: 4,
    title: "랜선 비판적 읽기: 디지털 미디어 리터러시 트레이닝",
    objective: "SNS와 커뮤니티의 정보와 언어적 표현을 비판적으로 수용하고, 책임 있는 디지털 의사소통 태도를 기른다.",
    timeAllocation: {
      intro: {
        minutes: 10,
        content: "댓글 디톡스(Detox) 개념 안내: 온라인 상의 유해한 독소 언어를 걸러내고 건강한 언어로 정화하는 미디어 리터러시 훈련.",
        questions: ["우리는 왜 악플을 보면 쉽게 피로해지고 분노하게 될까요?", "글을 쓰기 전에 '필터'를 거치는 방법은 무엇일까요?"]
      },
      development: {
        minutes: 25,
        content: "'순화된 언어' 재작성 챌린지: 혐오 댓글 4종을 인권 존중의 언어로 직접 고쳐 쓰고 AI/교사 피드백 받기. 공익 슬로건 제작.",
        questions: ["원래의 혐오 문장과 내가 순화한 문장은 어떤 감정의 차이를 만드나요?", "비판(의견 제시)과 비하(인격 모독)의 결정적 차이는 무엇일까요?"]
      },
      wrapUp: {
        minutes: 10,
        content: "우수 순화 문장 및 슬로건 발표, '바른말 멘토' 뱃지 획득.",
        questions: ["내가 만든 슬로건을 오늘 SNS 프로필 상태메시지로 달아볼까요?"]
      }
    },
    keyConcepts: ["댓글 디톡스(Detox)", "순화된 언어 변환", "비판과 비하의 구분", "디지털 에티켓"],
    facilitationTips: [
      "단순히 착한 척하는 말이 아니라, 자신의 정당한 비판 의견을 품격 있게 전달하는 표현법을 연습하도록 안내합니다.",
      "AI 피드백 기능을 활용하여 학생 개개인이 맞춤형 피드백을 실시간으로 확인하도록 독려합니다."
    ],
    cautionPoints: [
      "순화 과정에서 원래 문장의 혐오 표현에 다시 집중되지 않도록 '새롭게 쓰인 긍정적 문장'에 초점을 맞춥니다."
    ]
  },
  {
    sessionNum: 5,
    title: "교실 속 민주주의: 토론과 포괄적 성교육으로 편견 넘기",
    objective: "일방적 주입식 교육에서 벗어나 토론을 통해 차별을 극복하고, 성평등 및 상호 존중의 가치를 내면화한다.",
    timeAllocation: {
      intro: {
        minutes: 10,
        content: "교실 속 민주적 토론의 규칙 설정: 경청과 상호 존중, 인신공격 금지. 성별 갈등 및 미러링 현상 문제 제기.",
        questions: ["민주적인 교실이란 어떤 교실일까요?", "왜 우리는 성별이나 외모로 서로를 갈라치기하게 되었을까요?"]
      },
      development: {
        minutes: 25,
        content: "소그룹 토론: 상황1(단톡방 굴욕 사진 밈)과 상황2(혐오에 맞선 미러링) 찬반 및 대안 토론. 포괄적 성평등 소통 가이드 작성.",
        questions: ["'미러링'은 혐오를 멈추는 데 도움이 되었을까요, 아니면 혐오의 불씨를 키웠을까요?", "성별 고정관념을 깨고 서로를 동등한 인격체로 대하는 방법은 무엇일까요?"]
      },
      wrapUp: {
        minutes: 10,
        content: "모둠별 합의안 도출 및 교실 민주주의 선언문 공유.",
        questions: ["토론을 통해 나의 기존 생각에 어떤 변화가 생겼나요?"]
      }
    },
    keyConcepts: ["민주적 토론", "성평등 관점", "미러링(Mirroring)의 한계", "상호 존중 소통법"],
    facilitationTips: [
      "성별 이슈는 감정적 대립이 발생하기 쉬우므로, '남 vs 여'의 구도가 아니라 '혐오 문화 vs 존중 문화'의 대결로 프레임을 전환합니다.",
      "모든 학생이 최소 1회 이상 발언할 수 있도록 모둠 내 사회자 역할을 순번제로 지정합니다."
    ],
    cautionPoints: [
      "토론 중 특정 성별이나 집단을 향한 공격적인 비난이 발생하지 않도록 교사가 적극적으로 중재합니다."
    ]
  },
  {
    sessionNum: 6,
    title: "방관자를 넘어서: '대항발화(Counter-Speech)' 실천 프로젝트",
    objective: "혐오 표현을 방관하지 않고 이에 적극적으로 대응하는 '대항발화' 스킬을 익혀 학급 내 실천 계획을 수립한다.",
    timeAllocation: {
      intro: {
        minutes: 10,
        content: "방관자의 침묵이 혐오를 키운다: 대항발화(Counter-Speech)의 정의와 4가지 핵심 패턴(사실 정정, 감정 환기, 동조 거부, 분위기 전환) 학습.",
        questions: ["친구가 혐오 표현을 쓸 때 왜 우리는 쉽게 나서서 말리지 못했을까요?", "싸우지 않고 분위기를 지키며 거절하는 방법은 무엇일까요?"]
      },
      development: {
        minutes: 25,
        content: "대항발화 롤플레잉 시뮬레이션 실습 & 우리 반만의 '혐오 없는 평화로운 교실 지킴이 서약서' 항목 작성.",
        questions: ["직접 소리 내어 대항발화를 해보니 어떤 기분이 드나요?", "우리 반 게시판에 걸어둘 가장 중요한 3가지 약속은 무엇일까요?"]
      },
      wrapUp: {
        minutes: 10,
        content: "개인 실천 서약 수료증 발급 및 학급 서약서 전체 낭독, 축하 세레머니.",
        questions: ["6차시 전체 과정을 마치며, 나는 오늘부터 어떤 사람이 될 것인가요?"]
      }
    },
    keyConcepts: ["대항발화(Counter-Speech)", "방관자 효과 극복", "4대 대항 화법 패턴", "학급 실천 서약"],
    facilitationTips: [
      "학생들이 롤플레잉을 쑥스러워할 수 있으므로, 예시 문장을 따라 읽는 것부터 시작하여 점차 자신의 언어로 변형하도록 격려합니다.",
      "서약서 작성 후 수료증 인쇄 및 배지 발급으로 6차시 프로젝트 완주의 성취감을 극대화합니다."
    ],
    cautionPoints: [
      "대항발화가 또 다른 싸움이나 물리적 갈등으로 번지지 않도록 '안전하고 침착한 화법'을 거듭 강조합니다."
    ]
  }
];

export const INITIAL_STUDENT_PROGRESS = {
  studentName: "",
  gradeClass: "",
  completedSessions: [],
  
  pyramidAnswers: {},
  session1Reflect1: "",
  session1Reflect2: "",

  footprintChecklist: {},
  session2MinorityOpinion: "",
  session2MyExperience: "",

  empathySelectedCase: "case1",
  empathyLetter: "",
  causeAnalysis: {
    media: "",
    peerPressure: "",
    publicFigures: "",
    personalStress: ""
  },

  detoxRewrites: {},
  detoxAIFeedbacks: {},
  campaignSlogan: "",

  debateOpinions: {},
  genderEqualityReflection: "",

  counterSpeechLogs: [],
  classPledgeItems: [
    "장난이라는 이름으로 친구의 외모, 출신, 성별을 비하하지 않겠습니다.",
    "온라인 단톡방과 게임에서 혐오 멸칭을 쓰지 않고 바른말을 사용하겠습니다.",
    "친구가 부당하게 비하당할 때 방관하지 않고 용기 있게 대항발화하겠습니다.",
    "차이와 다름을 편견 없이 존중하며 서로의 성장을 응원하겠습니다."
  ],
  personalPromise: "",
  pledgeCompleted: false
};
