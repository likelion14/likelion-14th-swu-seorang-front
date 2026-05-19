import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.png";
import BoothInfoButton from "./BoothInfoButton";
import BoothDetailCard from "./BoothDetailCard";
import PickerDay from "./PickerDay";
import {
  CENTER_BOTTOM_ROW,
  CENTER_BOTTOM_ROW_FRIDAY,
  CENTER_MIDDLE_ROW,
  CENTER_MIDDLE_ROW_THURSDAY,
  CENTER_MIDDLE_ROW_FRIDAY,
  CENTER_TOP_ROW,
  CENTER_TOP_ROW_FRIDAY,
  CENTER_TOP_ROW_THURSDAY,
  CENTER_BOTTOM_ROW_THURSDAY,
  DEPARTMENT_BOOTH_LIST,
  DEPARTMENT_BOOTH_LIST_FRIDAY,
  DEPARTMENT_BOOTH_LIST_THURSDAY,
  LEFT_COLUMN,
  LEFT_COLUMN_FRIDAY,
  LEFT_COLUMN_THURSDAY,
  RIGHT_COLUMN,
  RIGHT_COLUMN_FRIDAY,
  RIGHT_COLUMN_THURSDAY,
} from "../data/departmentBoothLayout";
import type { FestivalDay, BoothGridCell } from "../types/booth";
import type { VisitedBooth } from "../api/getVisitedBooths";
import { checkVisit } from "../api/checkVisit";
import styles from "./MapBoothMap.module.css";

import LoginModal from "./Modal";

import CancelButton from "../assets/icon/Btn/Modal-Back.png";
import LogoutButton from "../assets/icon/Btn/Modal-Login.png";

// 학과 이름으로 mapCellId 매핑
const getMapCellIdByDepartmentName = (departmentName: string, selectedDay: FestivalDay): string => {
  const fridayMapping: Record<string, string> = {
    "생명환경공학과": "bio-env",
    "바이오헬스융합학과": "bio-env",
    "식품영양학과": "food-nutri",
    "식품생명공학과": "food-nutri",
    "원예생명조경학과": "horticulture",
    "화학과": "horticulture",
    "수학과": "math",
    "시각디자인전공": "visual-design",
    "첨단미디어디자인전공": "advanced-media",
    "현대미술전공": "contemporary-art",
    "공예전공": "craft",
    "아트앤디자인스쿨": "art-design",
    "기업 및 단체부스": "corp",
    "자유전공학부": "free1",
    "과학기술융합대학": "sci-tech",
    "경제학과": "econ",
    "문헌정보학과": "econ",
    "사회복지학과": "social-welfare",
    "스포츠운동과학과": "social-welfare",
    "심리인지과학학부": "psych",
    "아동학과": "psych",
    "언론영상학부": "media",
    "행정학과": "media",
    "사회과학대학": "soc-sci",
  };

  const thursdayMapping: Record<string, string> = {
    "언론영상학부": "media-admin",
    "행정학과": "media-admin",
    "심리인지과학학부": "psych-child",
    "아동학과": "psych-child",
    "사회복지학과": "social-sports",
    "스포츠운동과학과": "social-sports",
    "경제학과": "econ-doc",
    "문헌정보학과": "econ-doc",
    "사회과학대학": "soc-sci-only",
    "인문대학": "inmun-thu",
    "영어영문학과": "english-thu",
    "프랑스문화콘텐츠전공": "french-thu",
    "독일문화콘텐츠전공": "german-thu",
    "국어국문학과": "korean-thu",
    "AI융합콘텐츠전공": "ai-content-thu",
    "기업 및 단체부스": "corp",
    "기독교학과": "gidok",
    "사학과": "sahak",
    "일어일문학과": "ilmun",
    "중어중문학과": "jungmun",
    "패션산업학과": "digital",
    "지능정보보호학부": "digital",
    "소프트웨어학과": "software",
    "디지털미디어학과": "software",
    "경영학과": "ind-data",
    "산업디자인학과": "ind-data",
    "데이터사이언스학과": "biz",
    "미래산업융합대학": "fusion",
  };

  const defaultMapping: Record<string, string> = {
    "미래산업융합대학": "fusion",
    "경영학과": "ind-data",
    "패션산업학과": "digital",
    "산업디자인학과": "ind-data",
    "데이터사이언스학과": "biz",
    "미래산업융합자유전공": "software",
    "소프트웨어학과": "software",
    "디지털미디어학과": "software",
    "지능정보보호학부": "digital",
    "아트앤디자인스쿨": "fashion1",
    "시각디자인전공": "city",
    "공예전공": "craft",
    "첨단미디어디자인전공": "chem",
    "현대미술전공": "contemporary-art",
    "인문대학": "inmun",
    "영어영문학과": "english",
    "프랑스문화콘텐츠전공": "french",
    "독일문화콘텐츠전공": "german",
    "국어국문학과": "korean",
    "AI융합콘텐츠전공": "ai-content",
    "기독교학과": "gidok",
    "사학과": "sahak",
    "일어일문학과": "ilmun",
    "중어중문학과": "jungmun",
    "기업 및 단체부스": "corp",
    "생명환경공학과": "bio-env",
    "바이오헬스융합학과": "bio-env",
    "식품영양학과": "food-nutri",
    "식품생명공학과": "food-nutri",
    "원예생명조경학과": "horticulture",
    "화학과": "horticulture",
    "수학과": "math",
    "과학기술융합대학": "sci-tech",
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

  const mapping =
    selectedDay === "2025-05-22"
      ? fridayMapping
      : selectedDay === "2025-05-21"
      ? thursdayMapping
      : defaultMapping;
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

  const leftColumn = useMemo<BoothGridCell[]>(() => {
    if (selectedDay === "2025-05-22") {
      return filterByDay(LEFT_COLUMN_FRIDAY);
    }
    if (selectedDay === "2025-05-21") {
      // Thursday
      // @ts-ignore – defined in data file
      return filterByDay(LEFT_COLUMN_THURSDAY as any);
    }
    return filterByDay(LEFT_COLUMN);
  }, [selectedDay]);

  const centerTop = useMemo<BoothGridCell[]>(() => {
    if (selectedDay === "2025-05-22") {
      return filterByDay(CENTER_TOP_ROW_FRIDAY);
    }
    if (selectedDay === "2025-05-21") {
      // Thursday
      // @ts-ignore – defined in data file
      return filterByDay(CENTER_TOP_ROW_THURSDAY as any);
    }
    return filterByDay(CENTER_TOP_ROW);
  }, [selectedDay]);

  const centerMiddle = useMemo<BoothGridCell[]>(() => {
      if (selectedDay === "2025-05-22") {
        // Friday: use Friday-specific middle row
        // @ts-ignore – defined in data file
        return filterByDay(CENTER_MIDDLE_ROW_FRIDAY as any);
      }
      if (selectedDay === "2025-05-21") {
        // Thursday
        // @ts-ignore – defined in data file
        return filterByDay(CENTER_MIDDLE_ROW_THURSDAY as any);
      }
    return filterByDay(CENTER_MIDDLE_ROW);
  }, [selectedDay]);

  const centerBottom = useMemo<BoothGridCell[]>(() => {
    if (selectedDay === "2025-05-22") {
      return filterByDay(CENTER_BOTTOM_ROW_FRIDAY);
    }
    if (selectedDay === "2025-05-21") {
      // Thursday
      // @ts-ignore – defined in data file
      return filterByDay(CENTER_BOTTOM_ROW_THURSDAY as any);
    }
    return filterByDay(CENTER_BOTTOM_ROW);
  }, [selectedDay]);

  const rightColumn = useMemo<BoothGridCell[]>(() => {
    if (selectedDay === "2025-05-22") {
      return filterByDay(RIGHT_COLUMN_FRIDAY);
    }
    if (selectedDay === "2025-05-21") {
      // Thursday
      // @ts-ignore – defined in data file
      return filterByDay(RIGHT_COLUMN_THURSDAY as any);
    }
    return filterByDay(RIGHT_COLUMN);
  }, [selectedDay]);
  const boothList = useMemo(() => {
    if (booths.length > 0) {
      const mapped = booths.map((booth) => ({
        id: `api-${booth.id}`,
        department: booth.name,
        mapCellId: getMapCellIdByDepartmentName(booth.name, selectedDay),
        isOpen: booth.operatingStatus === "운영중",
        days: [selectedDay],
        checked: checkedBoothIds.has(`api-${booth.id}`),
      }));

      // 선택된 셀이 있으면 해당 셀에 속하는 부스만 필터링
      if (selectedCellId) {
        return mapped.filter((item) => item.mapCellId === selectedCellId);
      }

      return mapped;
    }

    const filtered = filterByDay(
      selectedDay === "2025-05-22"
        ? DEPARTMENT_BOOTH_LIST_FRIDAY
        : selectedDay === "2025-05-21"
        ? DEPARTMENT_BOOTH_LIST_THURSDAY
        : DEPARTMENT_BOOTH_LIST
    );
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
              {centerTop.map((cell) => {
                  const cellSelectionId = cell.mapCellId ?? cell.id;
                  return (
                    <BoothInfoButton
                      key={cell.id}
                      labels={cell.labels}
                      wide={cell.wide}
                      selected={selectedCellId === cellSelectionId}
                      onClick={() => handleCellClick(cellSelectionId)}
                    />
                  );
                })}
            </div>

            <div className={styles.centerMiddleRow}>
              {centerMiddle.map((cell) => {
                const cellSelectionId = cell.mapCellId ?? cell.id;
                return (
                  <BoothInfoButton
                    key={cell.id}
                    labels={cell.labels}
                    wide={cell.wide}
                    selected={selectedCellId === cellSelectionId}
                    onClick={() => handleCellClick(cellSelectionId)}
                  />
                );
              })}
            </div>

            <div className={styles.centerBottomRow}>
              {centerBottom.map((cell) => {
                const cellSelectionId = cell.mapCellId ?? cell.id;
                return (
                  <BoothInfoButton
                    key={cell.id}
                    labels={cell.labels}
                    wide={cell.wide}
                    selected={selectedCellId === cellSelectionId}
                    onClick={() => handleCellClick(cellSelectionId)}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.sideColumn}>
            {rightColumn.map((cell) => {
              const cellSelectionId = cell.mapCellId ?? cell.id;
              return (
                <BoothInfoButton
                  key={cell.id}
                  labels={cell.labels}
                  tall={cell.tall ?? cell.labels.length > 1}
                  selected={selectedCellId === cellSelectionId}
                  onClick={() => handleCellClick(cellSelectionId)}
                />
              );
            })}
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
