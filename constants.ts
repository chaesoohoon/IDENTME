import { Question, PersonalityResult, TemperamentResult, CareerResult, Temperament } from './types';

// Questions updated to be highly engaging, fun, and scenario-based ("Dopamine" style)
export const QUESTIONS: Question[] = [
  // PART 1: Think (T) vs Feel (F) - 극한 상황 & 딜레마
  {
    id: 1,
    question: "좀비 바이러스가 퍼진 세상! 절친이 좀비에게 물린 것 같다. 당신의 선택은?",
    options: [
      { text: "냉정하지만 어쩔 수 없다. 감염되기 전에 격리하거나 처리한다. (생존 우선)", score: { T: 5, Analyst: 3 } },
      { text: "절대 포기 못 해! 내 몸을 묶어서라도 끝까지 곁에 있어 준다. (의리 우선)", score: { F: 5, Helper: 3 } },
    ],
  },
  {
    id: 2,
    question: "길을 걷다 100억이 든 가방을 주웠다. 경찰서는 오늘 쉰다. 당신은?",
    options: [
      { text: "CCTV 위치부터 확인하고, 법적 리스크가 없는 자금 세탁 방법을 강구한다.", score: { T: 5, Analyst: 4 } },
      { text: "미쳤다! 일단 친구들한테 자랑하고 오늘 밤 파티부터 연다!", score: { F: 4, Explorer: 4, C: 2 } },
    ],
  },
  {
    id: 3,
    question: "과거로 갈 수 있는 타임머신을 개발했다. 무엇을 하러 갈 것인가?",
    options: [
      { text: "비트코인, 주식, 로또 번호. 완벽한 재테크로 인생 역전을 설계한다.", score: { T: 5, Maker: 2, A: 2 } },
      { text: "보고 싶은 돌아가신 할머니를 만나 따뜻한 밥 한 끼를 먹고 온다.", score: { F: 5, Helper: 3, C: 1 } },
    ],
  },
  {
    id: 4,
    question: "'환승연애' 같은 데이팅 프로그램에 나갔다. 나의 플러팅 스타일은?",
    options: [
      { text: "상대의 취향, 이상형 정보를 수집해 완벽한 맞춤형 데이트 코스를 짠다.", score: { T: 4, Analyst: 3 } },
      { text: "그냥 내 매력을 보여줘! 눈빛 교환과 리액션으로 심장을 폭격한다.", score: { F: 5, Explorer: 2, C: 3 } },
    ],
  },
  
  // PART 2: Act (A) vs Connect (C) - 행동 패턴
  {
    id: 5,
    question: "내일 지구가 멸망한다면?",
    options: [
      { text: "벙커를 짓든 우주선을 탈취하든, 살 방법을 찾아 당장 움직인다.", score: { A: 5, Maker: 4 } },
      { text: "사랑하는 가족, 친구들을 한자리에 모아 마지막 만찬을 즐긴다.", score: { C: 5, Helper: 4 } },
    ],
  },
  {
    id: 6,
    question: "갑자기 초능력을 하나 가질 수 있다면?",
    options: [
      { text: "순간이동! 세계 어디든 내 맘대로 가서 구경하고 즐긴다.", score: { A: 4, Explorer: 5 } },
      { text: "텔레파시! 타인의 속마음을 읽고 오해 없는 세상을 만든다.", score: { C: 4, Helper: 3 } },
    ],
  },
  {
    id: 7,
    question: "무인도에 떨어졌다. 가방에 딱 하나의 아이템이 있다면?",
    options: [
      { text: "최고급 서바이벌 나이프 (집도 짓고 사냥도 해야 함)", score: { A: 5, Maker: 4 } },
      { text: "배구공 윌슨 (말동무가 필요해.. 혼자는 외로워)", score: { C: 5, Helper: 3 } },
    ],
  },
  {
    id: 8,
    question: "해리포터 호그와트에 입학했다. 기숙사 배정 모자가 묻는다. '어디 갈래?'",
    options: [
      { text: "슬리데린 or 그리핀도르. 야망을 실현하거나 영웅이 되어 세상을 뒤흔든다.", score: { A: 4, Maker: 2, Explorer: 3 } },
      { text: "후플푸프. 친구들과 옹기종기 모여 맛있는 거 먹고 평화롭게 지낸다.", score: { C: 5, Helper: 4 } },
    ],
  },

  // PART 3: Temperament Deep Dive - 밸런스 게임
  {
    id: 9,
    question: "당신이 게임 속 캐릭터라면, 어떤 직업을 선택할 것인가?",
    options: [
      { text: "전략가/마법사. 뒤에서 전장의 흐름을 읽고 판을 짠다.", score: { Analyst: 5, T: 2 } },
      { text: "전사/암살자. 내가 직접 적진 한가운데로 뛰어들어 썰어버린다.", score: { Maker: 4, A: 4 } },
    ],
  },
  {
    id: 10,
    question: "평생 한 가지 음식만 먹어야 한다면?",
    options: [
      { text: "완벽한 영양 성분이 담긴 캡슐. (먹는 시간도 아깝다, 효율 최고)", score: { Analyst: 4, T: 4 } },
      { text: "전 세계 미식 투어. (새로운 맛을 못 보는 건 죽음이다)", score: { Explorer: 5, F: 2 } },
    ],
  },
  {
    id: 11,
    question: "신이 나타나 1가지 소원을 들어준다고 한다.",
    options: [
      { text: "모든 사람을 행복하게 만드는 평화의 능력 주세요.", score: { Helper: 5, F: 3, C: 2 } },
      { text: "우주의 비밀을 모두 알 수 있는 전지전능한 지식 주세요.", score: { Analyst: 5, T: 3 } },
    ],
  },
  {
    id: 12,
    question: "유튜브 채널을 개설했다. 첫 영상 콘텐츠는?",
    options: [
      { text: "[DIY] 3D 프린터로 아이언맨 수트 만들기.", score: { Maker: 5, A: 2 } },
      { text: "[VLOG] 퇴사하고 바로 비행기 타고 떠난 썰 푼다.", score: { Explorer: 5, A: 2 } },
    ],
  },
  {
    id: 13,
    question: "다음 생에 태어난다면?",
    options: [
      { text: "스티브 잡스. 세상을 바꿀 혁신적인 제품을 만든다.", score: { Maker: 5, T: 2 } },
      { text: "유재석. 국민들에게 웃음과 감동을 주는 리더가 된다.", score: { Helper: 4, C: 4 } },
    ],
  },
  {
    id: 14,
    question: "절대 열지 말라는 '판도라의 상자'가 눈앞에 있다.",
    options: [
      { text: "하지 말라면 더 하고 싶다. 당장 열어본다.", score: { Explorer: 5, A: 4 } },
      { text: "위험할 수 있으니 안전장치를 먼저 설치하거나 봉인한다.", score: { Analyst: 3, T: 3 } },
    ],
  },
  {
    id: 15,
    question: "조별 과제 빌런을 만났다. '저 아파서 못 가요 ㅠㅠ'",
    options: [
      { text: "증빙 서류 제출하세요. (안 내면 이름 뺀다)", score: { Analyst: 4, T: 4 } },
      { text: "많이 아프신가요? 일단 얼른 나으세요! (내가 다 함)", score: { Helper: 5, F: 3 } },
    ],
  },
  {
    id: 16,
    question: "테스트가 끝났다. 결과가 마음에 안 든다면?",
    options: [
      { text: "왜 이런 결과가 나왔지? 로직을 분석해 본다.", score: { T: 3, Analyst: 3 } },
      { text: "아 몰라~ 그냥 재미로 본 거지 뭐! 친구한테 공유나 하자.", score: { F: 3, Explorer: 3, C: 2 } },
    ],
  },
];

export const TRAIT_DESCRIPTIONS: Record<string, PersonalityResult> = {
  TA: {
    code: "TA",
    title: "팩트폭격 불도저 (Logical Doer)",
    description: "당신은 감성팔이? 딱 질색입니다. 좀비가 나타나면 가장 먼저 무기를 들고, 무인도에 가면 집부터 짓는 생존력 만렙입니다. 고민할 시간에 실행하는 당신, 혹시 AI 아니세요? 효율과 성과가 없는 인생은 당신에게 지옥입니다.",
  },
  TC: {
    code: "TC",
    title: "빅픽처 설계자 (Logical Connector)",
    description: "당신은 차가운 머리로 뜨거운 심장을 지휘하는 마에스트로입니다. 혼자 다 해먹기보다는, 사람들을 장기말... 아니, 적재적소에 배치해 최고의 효율을 뽑아냅니다. 공감 능력은 학습된 것이지만, 리더십 하나는 타고났군요.",
  },
  FA: {
    code: "FA",
    title: "낭만파 행동대장 (Empathic Doer)",
    description: "당신은 '가보자고!'를 입에 달고 사는 프로 열정러입니다. 논리? 개연성? 그런 건 중요하지 않아요. 삘(Feel) 받으면 바로 비행기 티켓 끊는 스타일! 당신 주변엔 항상 사건 사고와 웃음이 끊이지 않네요.",
  },
  FC: {
    code: "FC",
    title: "인간 댕댕이 (Empathic Connector)",
    description: "당신은 사람 없이는 못 사는 핵인싸입니다. 리액션 부자, 공감 요정! 친구가 울면 따라 우느라 휴지 한 통 다 씁니다. 세상의 평화와 사랑을 지키는 당신, 혹시 천사가 실수로 지상에 내려온 건가요?",
  },
};

export const TEMPERAMENT_DESCRIPTIONS: Record<Temperament, TemperamentResult> = {
  Analyst: {
    code: "Analyst",
    description: "뇌섹남녀 분석가",
    details: [
      "감정에 휘둘리지 않고 팩트로 뼈 때리는 능력 보유",
      "남들이 못 보는 패턴과 허점을 기가 막히게 찾아냄",
      "궁금한 건 못 참음, 밤새 검색해서라도 알아냄"
    ],
  },
  Maker: {
    code: "Maker",
    description: "금손 장인",
    details: [
      "말로만 떠드는 건 질색, 내 손으로 직접 보여줌",
      "도구, 기계, 코딩 등 뭐든 만지면 뚝딱 만들어냄",
      "디테일 변태 소리 들을 정도로 완성도에 집착함"
    ],
  },
  Helper: {
    code: "Helper",
    description: "힐링 마스터",
    details: [
      "상담해주다가 상대방 멘탈 치유하고 팬으로 만듦",
      "분위기 파악 속도 5G급, 눈치가 빠름",
      "남 챙겨주는 데서 희열을 느끼는 기부 천사"
    ],
  },
  Explorer: {
    code: "Explorer",
    description: "자유로운 영혼",
    details: [
      "반복되는 일상? 그건 감옥임. 새로운 자극 필요",
      "적응력 만렙, 어디 떨어뜨려 놔도 잘 먹고 잘 삼",
      "인생은 한 번뿐, 'YOLO'가 인생 모토"
    ],
  },
};

export const CAREER_GUIDE: Record<string, CareerResult> = {
  "Analyst_IT": {
    category: "디지털 세계의 건축가",
    description: "복잡한 코드를 보면 마음이 편안해지시나요? 논리적인 구조를 설계하고 시스템을 만드는 일이 천직입니다.",
    jobs: ["AI 개발자", "데이터 분석가", "화이트 해커", "블록체인 전문가"],
  },
  "Analyst_Research": {
    category: "미래를 읽는 예언가",
    description: "데이터를 통해 남들이 못 보는 인사이트를 찾아냅니다. 셜록 홈즈급 추리력으로 시장을 분석하세요.",
    jobs: ["투자 분석가", "경영 컨설턴트", "프로파일러", "UX 리서처"],
  },
  "Maker_Creative": {
    category: "비주얼 마법사",
    description: "당신의 머릿속 판타지를 현실로 꺼내세요. 당신의 손끝에서 탄생한 결과물이 사람들을 홀릴 겁니다.",
    jobs: ["모션 그래픽 디자이너", "웹툰 작가", "영상 감독", "메타버스 크리에이터"],
  },
  "Maker_Tech": {
    category: "현실판 토니 스타크",
    description: "직접 만들고, 조립하고, 작동시키는 데서 희열을 느낍니다. 기술로 세상을 업그레이드하세요.",
    jobs: ["로봇 엔지니어", "드론 개발자", "반도체 장인", "사운드 엔지니어"],
  },
  "Helper_Social": {
    category: "슈퍼 커넥터",
    description: "사람과 사람을 잇는 허브 역할을 합니다. 당신이 있는 곳엔 언제나 긍정적인 에너지가 넘칩니다.",
    jobs: ["커뮤니티 매니저", "홍보/마케터", "엔터 기획자", "심리 상담가"],
  },
  "Helper_Medical": {
    category: "수호천사",
    description: "타인의 아픔을 돌보고 성장을 돕는 일에서 깊은 보람을 느낍니다. 진정한 히어로입니다.",
    jobs: ["의사/간호사", "언어 치료사", "사회복지사", "반려동물 전문가"],
  },
  "Explorer_Biz": {
    category: "야생의 사업가",
    description: "위험을 기회로 바꾼 승부사! 남들이 가지 않은 길에 깃발을 꽂는 개척자 정신이 있습니다.",
    jobs: ["스타트업 대표", "벤처 투자자", "글로벌 세일즈", "프로젝트 오너"],
  },
  "Explorer_Content": {
    category: "트렌드 사냥꾼",
    description: "세상 힙한 건 다 해봐야 직성이 풀립니다. 당신의 경험 자체가 돈이 되는 콘텐츠가 됩니다.",
    jobs: ["여행 유튜버", "팝업 기획자", "패션 MD", "문화 평론가"],
  },
};