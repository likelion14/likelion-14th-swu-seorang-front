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
  { id: "sci1", label: "제1과학관", left: 0, top: 19.4, width: 35.1, height: 43.5 },
  { id: "sci2", label: "제2과학관", left: 40.5, top: 7.7, width: 59.3, height: 43.5 },
  { id: "student", label: "학생누리관", left: 43.8, top: 64.5, width: 56.2, height: 35.5 },
];

export const SHUNI_BOOTH_MARKERS: ShuniBoothMarker[] = [
  { id: "photo-booth", labels: ["포토부스"], left: 86, top: 43 },
];

export const SHUNI_BOOTH_DETAIL: ShuniBoothDetail = {
  id: "shuni-main",
  title: "포토부스",
  markerIds: ["photo-booth"],
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
