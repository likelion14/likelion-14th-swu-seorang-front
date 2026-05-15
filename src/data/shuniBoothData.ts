export interface ShuniBuildingZone {
  id: string;
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ShuniBoothMarker {
  id: string;
  labels: string[];
  left: number;
  top: number;
}

export interface ShuniPriceItem {
  description: string;
  price: string;
}

export interface ShuniBoothDetail {
  id: string;
  title: string;
  markerIds: string[];
  isOpen: boolean;
  prices: ShuniPriceItem[];
  paymentNote: string;
}

/** Figma Map/BoothMap(204:3750) 내부 좌표 — 322×299 기준 % */
export const SHUNI_BUILDING_ZONES: ShuniBuildingZone[] = [
  { id: "parking-left", label: "주차장", left: 0, top: 6.4, width: 13.7, height: 40.1 },
  { id: "sci1", label: "제1과학관", left: 36, top: 6.4, width: 27.6, height: 14.7 },
  { id: "parking-center", label: "주차장", left: 48.4, top: 26.4, width: 13.7, height: 30.1 },
  { id: "shalom", label: "샬롬\n하우스", left: 0, top: 53.2, width: 13.7, height: 40.1 },
  { id: "sci2", label: "제2과학관", left: 64.9, top: 6.4, width: 34.2, height: 50.2 },
  { id: "student", label: "학생누리관", left: 61.2, top: 85.3, width: 38.8, height: 14.7 },
];

export const SHUNI_BOOTH_MARKERS: ShuniBoothMarker[] = [
  { id: "photo-trailer", labels: ["포토", "트레일러"], left: 16.1, top: 16.4 },
  { id: "photo-booth", labels: ["포토", "부스"], left: 77, top: 29.1 },
];

export const SHUNI_BOOTH_DETAIL: ShuniBoothDetail = {
  id: "shuni-main",
  title: "포토트레일러, 포토부스",
  markerIds: ["photo-trailer", "photo-booth"],
  isOpen: true,
  prices: [
    { description: "2×6 사이즈 2장(1+1)", price: "4,000원" },
    { description: "4×6 사이즈 2장(1+1)", price: "5,000원" },
  ],
  paymentNote: "* 카드, 현금, 계좌이체 가능",
};

/** 프레임 썸네일 플레이스홀더 색상 */
export const SHUNI_FRAME_PREVIEWS = [
  { id: "frame-1", color: "#c8e6c9" },
  { id: "frame-2", color: "#fff9c4" },
  { id: "frame-3", color: "#bbdefb" },
  { id: "frame-4", color: "#f8bbd0" },
];
