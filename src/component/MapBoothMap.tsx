import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.png";
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

import LoginModal from "./Modal";

import CancelButton from "../assets/icon/Btn/Modal-Back.png";
import LogoutButton from "../assets/icon/Btn/Modal-Login.png";

// 학과 이름으로 mapCellId 매핑
const getMapCellIdByDepartmentName = (departmentName: string): string => {
  const mapping: Record<string, string> = {
    "미래산업융합대학": "fusion",
    "경영학과": "biz",
    "패션산업학과": "biz",
    "산업디자인학과": "ind-data",
    "데이터사이언스학과": "ind-data",
    "미래산업융합자유전공": "software",
    "소프트웨어학과": "software",
    "디지털미디어학과": "digital",
    "지능정보보호학부": "digital",
    "아트앤디자인스쿨": "fashion1",
    "시각디자인전공": "city",
    "공예전공": "craft",
    "첨단미디어디자인전공": "chem",
    "현대미술전공": "contemporary-art",
    "행정학과": "admin",
    "언론영상학부": "admin",
    "아동학과": "child",
    "심리인지과학학부": "child",
    "스포츠운동과학과": "social",
    "사회복지학과": "social",
    "문헌정보학과": "culture",
    "경제학과": "culture",
    "사회과학자유전공": "edu",
    "사회과학대학": "edu",
    "자유전공학부": "free1",
  };
  return mapping[departmentName] || "";
};

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

  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] =
  useState(false);

  const leftColumn = useMemo(() => filterByDay(LEFT_COLUMN), [selectedDay]);
  const centerTop = useMemo(() => filterByDay(CENTER_TOP_ROW), [selectedDay]);
  const centerBottom = useMemo(() => filterByDay(CENTER_BOTTOM_ROW), [selectedDay]);
  const rightColumn = useMemo(() => filterByDay(RIGHT_COLUMN), [selectedDay]);
  const boothList = useMemo(() => {
    if (booths.length > 0) {
      const mapped = booths.map((booth) => ({
        id: `api-${booth.id}`,
        department: booth.name,
        mapCellId: getMapCellIdByDepartmentName(booth.name),
        isOpen: booth.dayOpen,
        days: [selectedDay],
        checked: checkedBoothIds.has(`api-${booth.id}`),
      }));

      // 선택된 셀이 있으면 해당 셀에 속하는 부스만 필터링
      if (selectedCellId) {
        return mapped.filter((item) => item.mapCellId === selectedCellId);
      }

      return mapped;
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

        if (
        error instanceof Error &&
        error.message ===
          "로그인이 필요합니다."
      ) {
        setShowLoginModal(true);

        return;
      }

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
        {showLoginModal && (
          <LoginModal
            type="로그인 안내"
            title="로그인이 필요한 서비스 입니다."
            description="로그인을 원하지 않는 경우 '돌아가기' 버튼을 눌러주세요." 

            cancelButtonImage={CancelButton}
            confirmButtonImage={LogoutButton}

            onCancel={() => {
              setShowLoginModal(false);
              navigate("/");
            }}

            onConfirm={() => {
              setShowLoginModal(false);
              navigate("/login");
            }}
          />
        )}
      </div>
    </section>
  );
}
