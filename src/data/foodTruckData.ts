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
}

export const FOOD_TRUCK_ZONES = {
  top: { id: "science-building-1", label: "제1과학관" },
  bottom: { id: "triangle-forest", label: "삼각숲" },
} as const;

export const FOOD_TRUCK_CATEGORIES = [
  "닭강정",
  "야끼소바",
  "닭꼬치",
  "불초밥",
  "콩고기덮밥",
  "크레페",
  "츄러스",
] as const;

export const FOOD_TRUCK_MARKERS: FoodTruckMarker[] = [
  { id: "dakkochi-1", labels: ["닭꼬치"] },
  { id: "churros-1", labels: ["츄러스"] },
  { id: "dakgangjeong", labels: ["닭강정"] },
  { id: "yakisoba", labels: ["야끼소바"] },
  { id: "fire-sushi", labels: ["불초밥"] },
  { id: "soy-meat", labels: ["콩고기"] },
  { id: "crepe", labels: ["크레페"] },
];

export const FOOD_TRUCK_LIST: FoodTruckListItem[] = [
  {
    id: "dakkochi-1",
    name: "00닭꼬치",
    mapMarkerId: "dakkochi-1",
    status: "operating",
    menuItems: [
      { name: "닭꼬치", price: "3,000원" },
      { name: "소세지", price: "2,500원" },
      { name: "떡꼬치", price: "2,000원" },
    ],
  },
  {
    id: "churros-1",
    name: "00츄러스",
    mapMarkerId: "churros-1",
    status: "closed",
    menuItems: [
      { name: "츄러스", price: "2,500원" },
      { name: "아이스크림", price: "2,000원" },
      { name: "초코츄러스", price: "3,000원" },
    ],
  },
  {
    id: "dakgangjeong",
    name: "00닭강정",
    mapMarkerId: "dakgangjeong",
    status: "operating",
    menuItems: [
      { name: "닭강정", price: "5,000원" },
      { name: "간장닭강정", price: "5,500원" },
      { name: "마늘닭강정", price: "5,500원" },
    ],
  },
  {
    id: "yakisoba",
    name: "00야끼소바",
    mapMarkerId: "yakisoba",
    status: "operating",
    menuItems: [
      { name: "야끼소바", price: "4,000원" },
      { name: "떡야끼소바", price: "4,500원" },
      { name: "치즈야끼소바", price: "5,000원" },
    ],
  },
  {
    id: "fire-sushi",
    name: "00불초밥",
    mapMarkerId: "fire-sushi",
    status: "operating",
    menuItems: [
      { name: "불초밥", price: "4,500원" },
      { name: "치즈불초밥", price: "5,000원" },
      { name: "특불초밥", price: "5,500원" },
    ],
  },
  {
    id: "soy-meat",
    name: "00콩고기",
    mapMarkerId: "soy-meat",
    status: "closed",
    menuItems: [
      { name: "콩고기덮밥", price: "4,000원" },
      { name: "비빔콩고기", price: "4,500원" },
      { name: "제육콩고기", price: "5,000원" },
    ],
  },
  {
    id: "crepe",
    name: "00크레페",
    mapMarkerId: "crepe",
    status: "operating",
    menuItems: [
      { name: "생크림크레페", price: "3,500원" },
      { name: "과일크레페", price: "4,000원" },
      { name: "초코크레페", price: "3,500원" },
    ],
  },
];
