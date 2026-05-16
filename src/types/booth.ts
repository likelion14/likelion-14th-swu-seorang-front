export type FestivalDay = "2025-05-20" | "2025-05-21" | "2025-05-22";

export interface DayOption {
  value: FestivalDay;
  label: string;
  dayBadge: string;
}

export const DAY_OPTIONS: DayOption[] = [
  { value: "2025-05-20", label: "5/20 수요일", dayBadge: "Day1" },
  { value: "2025-05-21", label: "5/21 목요일", dayBadge: "Day2" },
  { value: "2025-05-22", label: "5/22 금요일", dayBadge: "Day3" },
];

export interface BoothGridCell {
  id: string;
  labels: string[];
  wide?: boolean;
  departmentName: string;
  days: FestivalDay[];
}

export interface BoothListItem {
  id: string;
  department: string;
  mapCellId: string;
  isOpen: boolean;
  days: FestivalDay[];
  checked?: boolean;
}
