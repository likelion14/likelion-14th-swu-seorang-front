export interface FleaMarketZone {
  id: string;
  label: string;
}

export interface FleaMarketMarker {
  id: string;
  labels: string[];
}

export interface FleaMarketListItem {
  id: string;
  name: string;
  mapMarkerId: string;
  description: string;
  hashtags: string[];
  isOpen: boolean;
  days: string[];
}

export const FLEA_MARKET_ZONES = {
  top: { id: "triangle-forest", label: "잔디광장" },
  bottom: { id: "hansaem", label: "누리관" },
} as const;

export const FLEA_MARKET_MARKERS: FleaMarketMarker[] = [
  { id: "damgi", labels: ["담기;淡器"] },
  { id: "knit-cafe", labels: ["뜨개다방"] },
  { id: "mong-i-rang", labels: ["몽이랑"] },
  { id: "hanna", labels: ["HANNA"] },
  { id: "susemi", labels: ["슈세미 입양소"] },
  { id: "lapelle", labels: ["라플레르"] },
  { id: "jjukjjuk", labels: ["쥑쥑 상점"] },
  { id: "pyeolin", labels: ["편린"] },
  { id: "ppitteul", labels: ["삐뚤빼뚤상점"] },
  { id: "dehaksaeng", labels: ["데학생 됴마도"] },
];

export const FLEA_MARKET_LIST: FleaMarketListItem[] = [
  {
    id: "damgi",
    name: "담기;淡器",
    mapMarkerId: "damgi",
    description: "키링, 도자기 판매",
    hashtags: ["키링", "도자기", "소품", "피크닉"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
  },
  {
    id: "knit-cafe",
    name: "뜨개다방",
    mapMarkerId: "knit-cafe",
    description: "뜨개 소품 판매",
    hashtags: ["핸드메이드", "뜨개소품", "키링"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
  },
  {
    id: "mong-i-rang",
    name: "몽이랑",
    mapMarkerId: "mong-i-rang",
    description: "털인형 판매",
    hashtags: ["핸드메이드", "털인형", "인형", "귀여운소품"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
  },
  {
    id: "hanna",
    name: "HANNA",
    mapMarkerId: "hanna",
    description: "핸드메이드 제품 제작 및 판매",
    hashtags: ["핸드메이드", "실용성"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
  },
  {
    id: "susemi",
    name: "슈세미 입양소",
    mapMarkerId: "susemi",
    description: "수세미 판매",
    hashtags: ["수세미", "주방용품", "핸드메이드"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-21"],
  },
  {
    id: "lapelle",
    name: "라플레르",
    mapMarkerId: "lapelle",
    description: "꽃 판매",
    hashtags: ["꽃", "생화", "꽃한송이", "힐링"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-21"],
  },
  {
    id: "jjukjjuk",
    name: "쥑쥑 상점",
    mapMarkerId: "jjukjjuk",
    description: "스티커와 핀뱃지 판매",
    hashtags: ["스티커", "핀뱃지", "문구류", "귀여운소품"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-22"],
  },
  {
    id: "pyeolin",
    name: "편린",
    mapMarkerId: "pyeolin",
    description: "액세서리와 소품 판매",
    hashtags: ["가챠스트랩", "피규어스트랩"],
    isOpen: true,
    days: ["2025-05-20", "2025-05-22"],
  },
  {
    id: "ppitteul",
    name: "삐뚤빼뚤상점",
    mapMarkerId: "ppitteul",
    description: "뜨개 소품 판매",
    hashtags: ["미니파우치", "카드지갑", "키링"],
    isOpen: true,
    days: ["2025-05-21", "2025-05-22"],
  },
  {
    id: "dehaksaeng",
    name: "데학생 됴마도",
    mapMarkerId: "dehaksaeng",
    description: "다양한 굿즈 판매",
    hashtags: ["스티커", "아크릴키링", "캐릭터굿즈", "이벤트"],
    isOpen: true,
    days: ["2025-05-21", "2025-05-22"],
  },
];
