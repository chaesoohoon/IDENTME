import { Question, PersonalityResult, TemperamentResult, CareerResult, Temperament } from './types';

// Questions increased to 16 for better statistical reliability
// Scenarios are sharpened to strictly separate T/F and A/C traits
export const QUESTIONS: Question[] = [
  // PART 1: Think (T) vs Feel (F) & Analyst vs Helper
  {
    id: 1,
    question: "동료가 치명적인 실수를 저질러 프로젝트가 위기입니다. 당신의 첫 반응은?",
    options: [
      { text: "어디서부터 잘못됐지? 원인을 파악하고 수습 메뉴얼부터 만든다.", score: { T: 5, Analyst: 3 } },
      { text: "동료가 얼마나 당황했을까? 우선 진정시키고 함께 해결책을 찾는다.", score: { F: 5, Helper: 3 } },
    ],
  },
  {
    id: 2,
    question: "친구들과 여행 계획을 짤 때, 당신의 스타일은?",
    options: [
      { text: "맛집, 동선, 시간 단위로 엑셀에 정리해 효율을 극대화한다.", score: { T: 4, Analyst: 3, A: 1 } },
      { text: "전반적인 분위기와 테마만 정하고, 현지에서의 기분과 컨디션을 중시한다.", score: { F: 4, Explorer: 2, C: 2 } },
    ],
  },
  {
    id: 3,
    question: "누군가 당신에게 고민 상담을 해옵니다. 이때 당신이 줄 수 있는 최고의 도움은?",
    options: [
      { text: "현실적인 해결책과 대안을 제시하여 문제를 삭제해 주는 것.", score: { T: 5, Analyst: 2 } },
      { text: "그 사람의 감정에 깊이 공감해주며 '내 편'이 되어 주는 것.", score: { F: 5, Helper: 3 } },
    ],
  },
  {
    id: 4,
    question: "논쟁이 격해졌을 때, 당신은 어떻게 행동합니까?",
    options: [
      { text: "팩트와 논리에 어긋나는 점을 지적하며 내 주장의 정당성을 입증한다.", score: { T: 5, Analyst: 3 } },
      { text: "상대방이 상처받지 않도록 언어를 순화하며 타협점을 찾으려 노력한다.", score: { F: 5, Helper: 2, C: 2 } },
    ],
  },
  
  // PART 2: Act (A) vs Connect (C) & Maker vs Explorer
  {
    id: 5,
    question: "새로운 아이디어가 떠올랐을 때, 당신은?",
    options: [
      { text: "일단 프로토타입이나 초안을 바로 만들어보며 실행에 옮긴다.", score: { A: 5, Maker: 3 } },
      { text: "주변 사람들에게 아이디어를 이야기하며 피드백을 듣고 반응을 살핀다.", score: { C: 5, Helper: 2, Explorer: 1 } },
    ],
  },
  {
    id: 6,
    question: "예기치 않게 1주일의 휴가가 생겼습니다. 무엇을 하시겠습니까?",
    options: [
      { text: "평소 배우고 싶었던 기술을 익히거나, 개인 프로젝트에 몰입한다.", score: { A: 4, Maker: 3 } },
      { text: "보고 싶었던 친구들을 만나거나 파티를 열어 사람들과 어울린다.", score: { C: 5, Helper: 2 } },
    ],
  },
  {
    id: 7,
    question: "팀 프로젝트에서 리더가 되었습니다. 어떤 리더가 되고 싶나요?",
    options: [
      { text: "솔선수범하여 가장 앞에서 장애물을 제거하고 성과를 내는 돌격대장.", score: { A: 5, Maker: 2, Explorer: 2 } },
      { text: "팀원들의 의견을 조율하고 각자의 장점을 살려주는 오케스트라 지휘자.", score: { C: 5, Helper: 3 } },
    ],
  },
  {
    id: 8,
    question: "복잡한 기계를 조립해야 합니다. 설명서가 너무 어렵다면?",
    options: [
      { text: "이리저리 만져보고 끼워보며 손의 감각과 직관으로 해결한다.", score: { A: 4, Maker: 4 } },
      { text: "잘 아는 사람에게 물어보거나 온라인 커뮤니티에 질문하여 도움을 구한다.", score: { C: 4, Helper: 2 } },
    ],
  },

  // PART 3: Temperament Deep Dive (Specific Situations)
  {
    id: 9,
    question: "당신이 생각하는 '성공한 삶'의 정의에 가장 가까운 것은?",
    options: [
      { text: "세상의 원리를 이해하고, 지적으로 탁월한 경지에 오르는 것.", score: { Analyst: 5, T: 2 } },
      { text: "내 손으로 세상에 없던 무언가를 만들어 남기는 것.", score: { Maker: 5, A: 2 } },
    ],
  },
  {
    id: 10,
    question: "낯선 도시에 혼자 떨어졌습니다. 가장 먼저 할 일은?",
    options: [
      { text: "지도를 펴고 지형과 주요 랜드마크를 파악해 내 위치를 분석한다.", score: { Analyst: 4, T: 3 } },
      { text: "발길 닿는 대로 걸으며 골목 구석구석을 탐험하고 숨겨진 매력을 찾는다.", score: { Explorer: 5, A: 2 } },
    ],
  },
  {
    id: 11,
    question: "당신에게 초능력이 주어진다면 어떤 것을 선택하시겠습니까?",
    options: [
      { text: "모든 사람의 마음을 읽고 치유할 수 있는 능력.", score: { Helper: 5, F: 3, C: 2 } },
      { text: "어디든 순식간에 이동하여 새로운 세상을 경험하는 능력.", score: { Explorer: 5, A: 3 } },
    ],
  },
  {
    id: 12,
    question: "당신이 가장 견디기 힘든 상황은?",
    options: [
      { text: "비효율적이고 체계가 없어서 같은 일을 반복하는 상황.", score: { Analyst: 4, T: 3 } },
      { text: "자유가 억압되고 매일 똑같은 루틴이 반복되는 지루한 상황.", score: { Explorer: 5, A: 2 } },
    ],
  },
  {
    id: 13,
    question: "은퇴 후 살고 싶은 집의 모습은?",
    options: [
      { text: "직접 설계하고 지은, 나만의 취향과 공방이 있는 단독주택.", score: { Maker: 5, A: 2 } },
      { text: "사람들이 언제든 놀러 와서 웃고 떠들 수 있는 넓은 마당이 있는 집.", score: { Helper: 5, C: 3 } },
    ],
  },
  {
    id: 14,
    question: "세상을 바꾸는 방식 중 하나를 선택한다면?",
    options: [
      { text: "혁신적인 기술이나 발명품을 개발하여 인류의 삶을 진보시킨다.", score: { Maker: 5, T: 2 } },
      { text: "사람들의 인식을 바꾸고 사회적 연대를 통해 더 나은 문화를 만든다.", score: { Helper: 4, C: 3, F: 2 } },
    ],
  },
  {
    id: 15,
    question: "당신의 유튜브 알고리즘 추천 영상 1순위는?",
    options: [
      { text: "과학 다큐멘터리, 경제 분석, 미스터리 해설 영상.", score: { Analyst: 4, T: 2 } },
      { text: "세계 여행기, 오지 탐험, 익스트림 스포츠 영상.", score: { Explorer: 5, A: 2 } },
    ],
  },
  {
    id: 16,
    question: "마지막 질문입니다. 당신은 어떤 사람으로 기억되고 싶나요?",
    options: [
      { text: "'그 사람은 정말 유능하고 똑똑했어.' (능력 중심)", score: { T: 3, A: 3, Analyst: 2, Maker: 2 } },
      { text: "'그 사람은 정말 따뜻하고 좋은 사람이었어.' (관계 중심)", score: { F: 3, C: 3, Helper: 2 } },
    ],
  },
];

export const TRAIT_DESCRIPTIONS: Record<string, PersonalityResult> = {
  TA: {
    code: "TA",
    title: "냉철한 개척자 (The Logical Doer)",
    description: "당신은 사고의 속도만큼 실행 속도가 빠른 사람입니다. 불필요한 감정 소모를 줄이고, 오직 '해결'과 '성과'에 집중합니다. 당신에게 고민은 실행을 위한 짧은 준비 운동일 뿐입니다. 분석된 데이터를 바탕으로 망설임 없이 돌진하는 당신은 조직의 핵심 엔진입니다.",
  },
  TC: {
    code: "TC",
    title: "전략적 지휘자 (The Logical Connector)",
    description: "당신은 차가운 머리와 뜨거운 리더십을 동시에 지녔습니다. 단순히 사람 좋게 대하는 것이 아니라, 논리적인 비전과 명확한 체계로 사람들을 설득하고 이끕니다. 당신은 혼자 일하기보다, 시스템을 만들고 적재적소에 인재를 배치하여 더 큰 그림을 그리는 '설계자'입니다.",
  },
  FA: {
    code: "FA",
    title: "열정적인 행동가 (The Empathic Doer)",
    description: "당신은 가슴이 뛰면 앞뒤 재지 않고 뛰어드는 로맨티스트이자 모험가입니다. 논리적 타당성보다는 '직감'과 '가치'가 당신을 움직입니다. 당신의 행동은 주변 사람들에게 영감을 주며, 딱딱한 분위기를 순식간에 활기차게 바꾸는 분위기 메이커 역할을 합니다.",
  },
  FC: {
    code: "FC",
    title: "다정한 조율자 (The Empathic Connector)",
    description: "당신은 사람과 사람 사이를 잇는 접착제 같은 존재입니다. 타인의 감정을 기가 막히게 포착하고, 갈등 상황을 부드럽게 녹여냅니다. 성과 경쟁보다는 '함께하는 즐거움'을 중요시하며, 당신이 있는 팀은 언제나 웃음이 끊이지 않고 심리적 안전감을 느낍니다.",
  },
};

export const TEMPERAMENT_DESCRIPTIONS: Record<Temperament, TemperamentResult> = {
  Analyst: {
    code: "Analyst",
    description: "본질을 꿰뚫는 통찰가",
    details: [
      "감정보다 팩트를 신뢰하며 객관적 판단을 선호함",
      "복잡한 문제를 구조화하여 해결책을 찾는 능력",
      "지적 호기심이 강하고 끊임없이 탐구하는 자세"
    ],
  },
  Maker: {
    code: "Maker",
    description: "현실을 빚어내는 창조자",
    details: [
      "추상적 아이디어를 손에 잡히는 결과물로 구현함",
      "도구, 기술, 시스템을 다루는 데 탁월한 감각",
      "완성도에 집착하는 장인 정신과 몰입력"
    ],
  },
  Helper: {
    code: "Helper",
    description: "성장을 돕는 가이드",
    details: [
      "타인의 잠재력을 발견하고 성장을 지원하는 멘토",
      "진정성 있는 공감 능력과 경청하는 태도",
      "조직의 결속력을 높이고 화합을 이끄는 힘"
    ],
  },
  Explorer: {
    code: "Explorer",
    description: "자유로운 영혼의 모험가",
    details: [
      "정해진 길보다 새로운 길을 개척하는 것을 즐김",
      "변화와 불확실성을 기회로 받아들이는 유연성",
      "다양한 경험을 융합해 독창적인 시각을 제시함"
    ],
  },
};

export const CAREER_GUIDE: Record<string, CareerResult> = {
  "Analyst_IT": {
    category: "디지털 아키텍트",
    description: "논리와 데이터로 가상 세계의 구조를 설계하고 최적화합니다. 복잡한 코드를 다루거나 시스템의 허점을 찾아내는 일에서 희열을 느낍니다.",
    jobs: ["AI 연구원", "데이터 사이언티스트", "화이트 해커", "블록체인 개발자", "백엔드 엔지니어"],
  },
  "Analyst_Research": {
    category: "전략적 솔루션 전문가",
    description: "시장과 트렌드의 흐름을 분석하여 미래의 전략을 제시합니다. 깊이 있는 리서치와 인사이트 도출 능력이 필요한 분야가 적합합니다.",
    jobs: ["경영 컨설턴트", "투자 분석가(애널리스트)", "UX 리서처", "도시 계획가", "정책 연구원"],
  },
  "Maker_Creative": {
    category: "비주얼 크리에이터",
    description: "상상 속의 이미지를 현실로 꺼내어 사람들의 감각을 자극합니다. 독창적인 시각 표현 능력을 발휘할 수 있는 분야가 어울립니다.",
    jobs: ["3D 모션 그래픽 디자이너", "인터랙티브 미디어 아티스트", "공간 디자이너", "웹툰/일러스트 작가", "영상 감독"],
  },
  "Maker_Tech": {
    category: "엔지니어링 마스터",
    description: "정교한 기술력을 바탕으로 실질적인 기능을 구현합니다. 기계, 로봇, 하드웨어 등 물리적인 실체를 다루는 일에 강점이 있습니다.",
    jobs: ["로보틱스 엔지니어", "반도체 설비 엔지니어", "스마트팜 전문가", "드론 개발자", "사운드 엔지니어"],
  },
  "Helper_Social": {
    category: "커뮤니티 빌더",
    description: "사람들을 모으고 조직 문화를 긍정적으로 변화시킵니다. 소통 능력과 조율 능력이 핵심인 직무에서 빛을 발합니다.",
    jobs: ["커뮤니티 매니저", "HRD(교육) 담당자", "홍보/PR 전문가", "엔터테인먼트 기획자", "심리 상담가"],
  },
  "Helper_Medical": {
    category: "휴먼 케어 전문가",
    description: "전문 지식과 따뜻한 마음으로 타인의 삶을 직접적으로 돕습니다. 의료, 복지, 교육 등 사람에게 헌신하는 분야가 적합합니다.",
    jobs: ["임상 심리사", "언어 치료사", "사회복지사", "특수교사", "반려동물 행동 교정사"],
  },
  "Explorer_Biz": {
    category: "혁신 벤처가",
    description: "불확실한 시장에서 기회를 포착하고 과감하게 도전합니다. 남들이 가지 않은 길을 개척하여 새로운 비즈니스를 만듭니다.",
    jobs: ["스타트업 창업가", "그로스 해커", "벤처 캐피탈리스트(VC)", "프로젝트 오너(PO)", "영업 전문가"],
  },
  "Explorer_Content": {
    category: "트렌드 세터",
    description: "세상의 새로운 흐름을 가장 먼저 감지하고 알립니다. 여행, 문화, 미식 등 다양한 경험을 콘텐츠로 가공하는 일에 능합니다.",
    jobs: ["여행 크리에이터", "팝업스토어 기획자", "패션 머천다이저(MD)", "방송/공연 기획자", "문화비평가"],
  },
};