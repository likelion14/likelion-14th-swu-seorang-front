import type { BoothGridCell, BoothListItem, FestivalDay } from "../types/booth";

const bothDays: FestivalDay[] = ["2025-05-22", "2025-05-23"];
const day1Only: FestivalDay[] = ["2025-05-22"];
const day2Only: FestivalDay[] = ["2025-05-23"];

export const LEFT_COLUMN: BoothGridCell[] = [
  { id: "admin", labels: ["행정", "언영"], departmentName: "행정학과", days: bothDays },
  { id: "child", labels: ["아동", "심과"], departmentName: "아동학과", days: bothDays },
  { id: "social", labels: ["스과", "사복"], departmentName: "사회복지학과", days: bothDays },
  { id: "culture", labels: ["문정", "경제"], departmentName: "문화예술학과", days: day1Only },
  { id: "edu", labels: ["사전", "사대"], departmentName: "사범대학", days: bothDays },
];

export const CENTER_TOP_ROW: BoothGridCell[] = [
  { id: "food-sci", labels: ["현미"], departmentName: "식품영양학과", days: bothDays },
  { id: "chem", labels: ["첨디"], departmentName: "첨단디자인학과", days: bothDays },
  { id: "craft", labels: ["공예"], departmentName: "공예학과", days: bothDays },
  { id: "city", labels: ["시디"], departmentName: "도시디자인학과", days: bothDays },
  { id: "fashion1", labels: ["아디"], departmentName: "패션디자인학과", days: bothDays },
  { id: "fashion2", labels: ["아디"], departmentName: "패션디자인학과", days: day2Only },
];

export const CENTER_BOTTOM_ROW: BoothGridCell[] = [
  {
    id: "corp",
    labels: ["기업 및 단체부스"],
    wide: true,
    departmentName: "기업 및 단체부스",
    days: bothDays,
  },
  { id: "free1", labels: ["자유", "전공"], departmentName: "자유전공학부", days: bothDays },
  { id: "free2", labels: ["자유", "전공"], departmentName: "자유전공학부", days: day2Only },
];

export const RIGHT_COLUMN: BoothGridCell[] = [
  { id: "digital", labels: ["디미", "정보"], departmentName: "디지털미디어학과", days: bothDays },
  { id: "software", labels: ["소융", "융전"], departmentName: "소프트웨어융합학과", days: bothDays },
  { id: "ind-design", labels: ["산디"], departmentName: "산업디자인학과", days: bothDays },
  { id: "data-sci", labels: ["데사"], departmentName: "데이터사이언스학과", days: bothDays },
  { id: "biz", labels: ["경영", "패산"], departmentName: "경영학과", days: bothDays },
  { id: "fusion", labels: ["미산융"], departmentName: "미디어산업융합학과", days: bothDays },
];

export const DEPARTMENT_BOOTH_LIST: BoothListItem[] = [
  {
    id: "list-ind-design",
    department: "산업디자인학과",
    mapCellId: "ind-design",
    isOpen: true,
    days: bothDays,
    checked: true,
  },
  {
    id: "list-data-sci",
    department: "데이터사이언스학과",
    mapCellId: "data-sci",
    isOpen: true,
    days: bothDays,
    checked: true,
  },
  {
    id: "list-biz",
    department: "경영학과",
    mapCellId: "biz",
    isOpen: true,
    days: bothDays,
    checked: false,
  },
  {
    id: "list-digital",
    department: "디지털미디어학과",
    mapCellId: "digital",
    isOpen: false,
    days: day1Only,
    checked: false,
  },
  {
    id: "list-food",
    department: "식품영양학과",
    mapCellId: "food-sci",
    isOpen: true,
    days: day2Only,
    checked: false,
  },
];

export const getAllGridCells = (): BoothGridCell[] => [
  ...LEFT_COLUMN,
  ...CENTER_TOP_ROW,
  ...CENTER_BOTTOM_ROW,
  ...RIGHT_COLUMN,
];
