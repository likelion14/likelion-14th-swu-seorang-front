import { useMemo, useState } from "react";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.svg";
import BoothInfoButton from "./BoothInfoButton";
import BoothDetailCard from "./BoothDetailCard";
import PickerDay from "./PickerDay";
import {
  CENTER_BOTTOM_ROW,
  CENTER_TOP_ROW,
  DEPARTMENT_BOOTH_LIST,
  LEFT_COLUMN,
  RIGHT_COLUMN,
} from "../data/departmentBoothLayout";
import type { FestivalDay } from "../types/booth";
import styles from "./MapBoothMap.module.css";

interface MapBoothMapProps {
  selectedDay: FestivalDay;
  onDayChange: (day: FestivalDay) => void;
}

export default function MapBoothMap({ selectedDay, onDayChange }: MapBoothMapProps) {
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [checkedBoothIds, setCheckedBoothIds] = useState<Set<string>>(new Set());

  const filterByDay = <T extends { days: FestivalDay[] }>(items: T[]) =>
    items.filter((item) => item.days.includes(selectedDay));

  const leftColumn = useMemo(() => filterByDay(LEFT_COLUMN), [selectedDay]);
  const centerTop = useMemo(() => filterByDay(CENTER_TOP_ROW), [selectedDay]);
  const centerBottom = useMemo(() => filterByDay(CENTER_BOTTOM_ROW), [selectedDay]);
  const rightColumn = useMemo(() => filterByDay(RIGHT_COLUMN), [selectedDay]);
  const boothList = useMemo(() => {
    const filtered = filterByDay(DEPARTMENT_BOOTH_LIST);
    return filtered.map((item) => ({
      ...item,
      checked: checkedBoothIds.has(item.id),
    }));
  }, [selectedDay, checkedBoothIds]);

  const handleCellClick = (cellId: string) => {
    setSelectedCellId(cellId);
  };

  const handleCheck = (boothId: string) => {
    setCheckedBoothIds((prev) => new Set(prev).add(boothId));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <PickerDay value={selectedDay} onChange={onDayChange} />

        <div className={styles.boothGrid}>
          <div className={styles.sideColumn}>
            {leftColumn.map((cell) => (
              <BoothInfoButton
                key={cell.id}
                labels={cell.labels}
                tall
                selected={selectedCellId === cell.id}
                onClick={() => handleCellClick(cell.id)}
              />
            ))}
          </div>

          <div className={styles.centerColumn}>
            <div className={styles.centerTopRow}>
              {centerTop.map((cell) => (
                <BoothInfoButton
                  key={cell.id}
                  labels={cell.labels}
                  selected={selectedCellId === cell.id}
                  onClick={() => handleCellClick(cell.id)}
                />
              ))}
            </div>

            <div className={styles.centerBottomRow}>
              {centerBottom.map((cell) => (
                <BoothInfoButton
                  key={cell.id}
                  labels={cell.labels}
                  wide={cell.wide}
                  selected={selectedCellId === cell.id}
                  onClick={() => handleCellClick(cell.id)}
                />
              ))}
            </div>
          </div>

          <div className={styles.sideColumn}>
            {rightColumn.map((cell) => (
              <BoothInfoButton
                key={cell.id}
                labels={cell.labels}
                tall={cell.labels.length > 1}
                selected={selectedCellId === cell.id}
                onClick={() => handleCellClick(cell.id)}
              />
            ))}
          </div>
        </div>

        <img src={StarYellow} alt="" className={styles.decorStar} />
      </div>

      <div className={styles.listSection}>
        <h2 className={styles.listTitle}>부스목록</h2>
        <div className={styles.listScroll}>
          {boothList.map((item) => (
            <BoothDetailCard
              key={item.id}
              item={item}
              selected={selectedCellId === item.mapCellId}
              onClick={() => setSelectedCellId(item.mapCellId)}
              onCheck={() => handleCheck(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
