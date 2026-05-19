export interface FoodTruckZone {
  id: string;
  label: string;
}

export interface FoodTruckMarker {
  id: string;
  labels: string[];
}

export interface FoodTruckMenuItem {
  name: string;
  price: string;
}

export interface FoodTruckListItem {
  id: string;
  name: string;
  mapMarkerId: string;
  status: "operating" | "closed";
  menuItems: FoodTruckMenuItem[];
  days: string[];
}

export const FOOD_TRUCK_ZONES = {
  top: { id: "science-building-1", label: "제1과학관" },
  bottom: { id: "triangle-forest", label: "잔디광장" },
} as const;

export const FOOD_TRUCK_CATEGORIES = [
  "츄러스",
  "분식",
  "삼겹말이",
  "케밥",
  "불초밥",
  "야끼소바",
  "닭강정",
] as const;

export const FOOD_TRUCK_MARKERS: FoodTruckMarker[] = [
  { id: "churros-1", labels: ["츄러스"] },
  { id: "bunsik", labels: ["분식"] },
  { id: "samgyeop", labels: ["삼겹말이"] },
  { id: "kebab", labels: ["케밥"] },
  { id: "fire-sushi", labels: ["불초밥"] },
  { id: "yakisoba", labels: ["야끼소바"] },
  { id: "dakgangjeong", labels: ["닭강정"] },
];

export const FOOD_TRUCK_LIST: FoodTruckListItem[] = [
  {
    id: "churros-1",
    name: "츄러스",
    mapMarkerId: "churros-1",
    status: "operating",
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
    menuItems: [
      { name: "츄러스", price: "4,500원" },
      { name: "아이스크림 츄러스", price: "6,000원" },
      { name: "치즈볼", price: "7,000원" },
    ],
  },
  {
    id: "bunsik",
    name: "분식",
    mapMarkerId: "bunsik",
    status: "closed",
    days: ["2025-05-20"],
    menuItems: [
      { name: "떡볶이", price: "5,000원" },
      { name: "순대", price: "5,000원" },
      { name: "떡순이", price: "10,000원" },
      { name: "떡튀순", price: "12,000원" },
    ],
  },
  {
    id: "samgyeop",
    name: "삼겹말이",
    mapMarkerId: "samgyeop",
    status: "operating",
    days: ["2025-05-21", "2025-05-22"],
    menuItems: [
      { name: "김치삼겹살말이", price: "9,000원" },
      { name: "팽이삼겹살말이", price: "9,000원" },
    ],
  },
  {
    id: "kebab",
    name: "케밥",
    mapMarkerId: "kebab",
    status: "operating",
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
    menuItems: [
      { name: "치킨케밥", price: "8,000원" },
      { name: "양케밥", price: "8,000원" },
      { name: "콩고기케밥", price: "8,000원" },
    ],
  },
  {
    id: "fire-sushi",
    name: "불초밥",
    mapMarkerId: "fire-sushi",
    status: "operating",
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
    menuItems: [
      { name: "불초밥", price: "11,000원" },
      { name: "새우초밥", price: "11,000원" },
      { name: "연어초밥", price: "11,000원" },
    ],
  },
  {
    id: "yakisoba",
    name: "야끼소바",
    mapMarkerId: "yakisoba",
    status: "operating",
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
    menuItems: [
      { name: "야끼소바", price: "10,000원" },
      { name: "불 야끼소바", price: "11,000원" },
    ],
  },
  {
    id: "dakgangjeong",
    name: "닭강정",
    mapMarkerId: "dakgangjeong",
    status: "operating",
    days: ["2025-05-20", "2025-05-21", "2025-05-22"],
    menuItems: [
      { name: "후라이드/양념 기본컵", price: "12,000원" },
      { name: "후라이드/양념 더블컵", price: "22,000원" },
    ],
  },
];
