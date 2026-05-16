import { useMemo, useState, useEffect } from "react";
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
import type { VisitedBooth } from "../api/getVisitedBooths";
import { checkVisit } from "../api/checkVisit";
import styles from "./MapBoothMap.module.css";

interface MapBoothMapProps {
  selectedDay: FestivalDay;
  onDayChange: (day: FestivalDay) => void;
  booths?: VisitedBooth[];
  loading?: boolean;
}

export default function MapBoothMap({ selectedDay, onDayChange, booths = [], loading = false }: MapBoothMapProps) {
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [checkedBoothIds, setCheckedBoothIds] = useState<Set<string>>(new Set());
  const [checkingId, setCheckingId] = useState<string | null>(null);

  // API에서 받은 방문 여부로 체크 상태 초기화
  useEffect(() => {
    if (booths.length > 0) {
      const visitedIds = new Set(
        booths
          .filter((booth) => booth.visited)
          .map((booth) => `api-${booth.id}`)
      );
      setCheckedBoothIds(visitedIds);
    }
  }, [booths]);

  const filterByDay = <T extends { days: FestivalDay[] }>(items: T[]) =>
    items.filter((item) => item.days.includes(selectedDay));

  const leftColumn = useMemo(() => filterByDay(LEFT_COLUMN), [selectedDay]);
  const centerTop = useMemo(() => filterByDay(CENTER_TOP_ROW), [selectedDay]);
  const centerBottom = useMemo(() => filterByDay(CENTER_BOTTOM_ROW), [selectedDay]);
  const rightColumn = useMemo(() => filterByDay(RIGHT_COLUMN), [selectedDay]);
  const boothList = useMemo(() => {
    if (booths.length > 0) {
      return booths.map((booth) => ({
        id: `api-${booth.id}`,
        department: booth.name,
        mapCellId: "",
        isOpen: booth.dayOpen,
        days: [selectedDay],
        checked: checkedBoothIds.has(`api-${booth.id}`),
      }));
    }

    const filtered = filterByDay(DEPARTMENT_BOOTH_LIST);
    const mapped = filtered.map((item) => ({
      ...item,
      checked: checkedBoothIds.has(item.id),
    }));

    // 선택된 셀이 있으면 해당 셀에 속하는 부스만 필터링
    if (selectedCellId) {
      return mapped.filter((item) => item.mapCellId === selectedCellId);
    }

    return mapped;
  }, [selectedDay, checkedBoothIds, booths, filterByDay, selectedCellId]);

  const handleCellClick = (cellId: string) => {
    setSelectedCellId(cellId);
  };

  const handleCheck = async (boothId: string) => {
    if (checkingId === boothId) return;

    // API 호출이 필요한 부스인지 확인
    const isApiBooth = boothId.startsWith("api-");

    if (isApiBooth) {
      setCheckingId(boothId);

      try {
        // boothId에서 숫자 부분만 추출 (예: "api-1" -> 1)
        const numericId = boothId.replace("api-", "");

        await checkVisit(parseInt(numericId, 10));

        // 방문 완료된 부스 ID 목록에 추가
        setCheckedBoothIds((prev) => new Set(prev).add(boothId));
      } catch (error) {
        console.error("방문 체크 실패:", error);
        alert(error instanceof Error ? error.message : "방문 체크에 실패했습니다.");
      } finally {
        setCheckingId(null);
      }
    } else {
      // 정적(로컬) 데이터인 경우, 서버 요청 없이 로컬 상태만 바로 업데이트
      setCheckedBoothIds((prev) => new Set(prev).add(boothId));
    }
  };

  const handleBoothClick = (item: any) => {
    if (item.mapCellId) {
      setSelectedCellId(item.mapCellId);
    }
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
        {loading ? (
          <div className={styles.listScroll}>로딩 중...</div>
        ) : (
          <div className={styles.listScroll}>
            {boothList.map((item) => (
              <BoothDetailCard
                key={item.id}
                item={item}
                selected={selectedCellId === item.mapCellId}
                onClick={() => handleBoothClick(item)}
                onCheck={() => handleCheck(item.id)}
                checking={checkingId === item.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
