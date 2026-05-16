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
}

export const FLEA_MARKET_ZONES = {
  top: { id: "triangle-forest", label: "삼각숲" },
  bottom: { id: "hansaem", label: "한샘길" },
} as const;

export const FLEA_MARKET_MARKERS: FleaMarketMarker[] = [
  { id: "damgi", labels: ["담기"] },
  { id: "knit-cafe", labels: ["뜨개다방"] },
  { id: "raven", labels: ["레이븐팩토리"] },
  { id: "lapelle", labels: ["라플레르"] },
  { id: "wish", labels: ["소원상점"] },
  { id: "knit-cat", labels: ["뜨개순애옹상점"] },
  { id: "plein", labels: ["플레인톤"] },
  { id: "cherry", labels: ["체리쉬미앤유"] },
];

export const FLEA_MARKET_LIST: FleaMarketListItem[] = [
  {
    id: "damgi",
    name: "담기;淡器",
    mapMarkerId: "damgi",
    description: "도자기 판매",
    hashtags: ["키링", "그릇", "화병", "접시", "컵", "식기도구"],
    isOpen: true,
  },
  {
    id: "knit-cafe",
    name: "뜨개다방",
    mapMarkerId: "knit-cafe",
    description: "뜨개 핸드메이드 소품",
    hashtags: ["키링", "스크런치", "거울", "티코스터", "뱃지"],
    isOpen: true,
  },
  {
    id: "raven",
    name: "레이븐팩토리",
    mapMarkerId: "raven",
    description: "비즈팔찌와 키링",
    hashtags: ["팔찌", "키링", "품목", "만들기 체험"],
    isOpen: true,
  },
  {
    id: "lapelle",
    name: "라플레르",
    mapMarkerId: "lapelle",
    description: "핸드메이드 액세서리",
    hashtags: ["귀걸이", "목걸이", "반지"],
    isOpen: true,
  },
  {
    id: "wish",
    name: "소원상점",
    mapMarkerId: "wish",
    description: "소품·굿즈 판매",
    hashtags: ["키링", "스티커", "엽서"],
    isOpen: true,
  },
  {
    id: "knit-cat",
    name: "뜨개순애옹상점",
    mapMarkerId: "knit-cat",
    description: "뜨개 인형·소품",
    hashtags: ["인형", "키링", "코스터"],
    isOpen: true,
  },
  {
    id: "plein",
    name: "플레인톤",
    mapMarkerId: "plein",
    description: "일러스트 굿즈",
    hashtags: ["엽서", "스티커", "포스터"],
    isOpen: false,
  },
  {
    id: "cherry",
    name: "체리쉬미앤유",
    mapMarkerId: "cherry",
    description: "핸드메이드 소품",
    hashtags: ["키링", "파우치", "뱃지"],
    isOpen: true,
  },
];
