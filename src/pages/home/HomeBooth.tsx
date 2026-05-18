import { useState, useEffect } from "react";
import Header from "../../component/header";
import Tab from "../../component/Tab";
import BoothTab from "../../component/BoothTab";
import BoothLocationInfo from "../../component/BoothLocationInfo";
import MapBoothMap from "../../component/MapBoothMap";
import ShuniBoothMap from "../../component/ShuniBoothMap";
import FleaMarketBoothMap from "../../component/FleaMarketBoothMap";
import FoodTruckBoothMap from "../../component/FoodTruckBoothMap";
import type { FestivalDay } from "../../types/booth";
import { getBooths } from "../../api/getBooths";
import { getVisitedBooths, type VisitedBooth } from "../../api/getVisitedBooths";
import styles from "./HomeBooth.module.css";

export default function HomeBooth() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<FestivalDay>("2025-05-20");
  const [booths, setBooths] = useState<VisitedBooth[]>([]);
  const [loading, setLoading] = useState(false);

  const getDayNumber = (day: FestivalDay): number => {
    switch (day) {
      case "2025-05-20":
        return 1;
      case "2025-05-21":
        return 2;
      case "2025-05-22":
        return 3;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const fetchBooths = async () => {
      setLoading(true);
      try {
        const dayNumber = getDayNumber(selectedDay);
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          // 로그인 상태: 방문여부 포함 부스 정보 조회
          const data = await getVisitedBooths(dayNumber);
          setBooths(data);
        } else {
          // 비로그인 상태: 기본 부스 정보 조회 (visited 필드 추가)
          const data = await getBooths(dayNumber);
          const dataWithVisited: VisitedBooth[] = data.map((booth) => ({
            ...booth,
            visited: false,
          }));
          setBooths(dataWithVisited);
        }
      } catch (error) {
        console.error("Failed to fetch booths:", error);
        // 로그인 상태에서 API 실패 시 기본 API로 fallback
        try {
          const dayNumber = getDayNumber(selectedDay);
          const data = await getBooths(dayNumber);
          const dataWithVisited: VisitedBooth[] = data.map((booth) => ({
            ...booth,
            visited: false,
          }));
          setBooths(dataWithVisited);
        } catch (fallbackError) {
          console.error("Fallback fetch also failed:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, [selectedDay]);

  const getLocationText = () => {
    switch (currentIndex) {
      case 0:
        return "잔디광장";
      case 1:
        return "제1과학관 앞";
      case 2:
        return "한샘길";
      case 3:
        return "샬롬 입구 건너편, 제2과학관 앞 주차장";
      default:
        return "잔디광장";
    }
  };

  const locationText = getLocationText();

  const renderContent = () => {
    if (currentIndex === 0) {
      return (
        <MapBoothMap
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          booths={booths}
          loading={loading}
        />
      );
    }

    switch (currentIndex) {
      case 1:
        return <FoodTruckBoothMap />;
      case 2:
        return (
          <FleaMarketBoothMap
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
          />
        );
      case 3:
        return <ShuniBoothMap />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Header />

        <Tab />

        <BoothTab currentIndex={currentIndex} onIndexChange={setCurrentIndex} />

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <BoothLocationInfo locationText={locationText} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
