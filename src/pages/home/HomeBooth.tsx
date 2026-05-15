import { useState } from "react";
import Header from "../../component/header";
import Tab from "../../component/Tab";
import BoothTab from "../../component/BoothTab";
import BoothLocationInfo from "../../component/BoothLocationInfo";
import MapBoothMap from "../../component/MapBoothMap";
import ShuniBoothMap from "../../component/ShuniBoothMap";
import FleaMarketBoothMap from "../../component/FleaMarketBoothMap";
import type { FestivalDay } from "../../types/booth";
import styles from "./HomeBooth.module.css";

export default function HomeBooth() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<FestivalDay>("2025-05-22");

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
        />
      );
    }

    switch (currentIndex) {
      case 1:
        return <div className={styles.placeholder}>푸드트럭 컨텐츠</div>;
      case 2:
        return <FleaMarketBoothMap />;
      case 3:
        return <ShuniBoothMap />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <Tab />

      <BoothTab currentIndex={currentIndex} onIndexChange={setCurrentIndex} />

      <BoothLocationInfo locationText={locationText} />

      {renderContent()}
    </div>
  );
}
