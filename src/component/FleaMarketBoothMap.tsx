import { useState, useMemo } from "react";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.png";
import BoothInfoButton from "./BoothInfoButton";
import FleaMarketDetailCard from "./FleaMarketDetailCard";
import PickerDay from "./PickerDay";
import {
  FLEA_MARKET_LIST,
  FLEA_MARKET_MARKERS,
  FLEA_MARKET_ZONES,
} from "../data/fleaMarketBoothData";
import type { FestivalDay } from "../types/booth";
import styles from "./FleaMarketBoothMap.module.css";

interface FleaMarketBoothMapProps {
  selectedDay: FestivalDay;
  onDayChange: (day: FestivalDay) => void;
}

export default function FleaMarketBoothMap({ selectedDay, onDayChange }: FleaMarketBoothMapProps) {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const filterByDay = <T extends { days: string[] }>(items: T[]) =>
    items.filter((item) => item.days.includes(selectedDay));

  const filteredMarkers = useMemo(() => filterByDay(FLEA_MARKET_MARKERS.map((marker) => ({
    ...marker,
    days: FLEA_MARKET_LIST.find((item) => item.mapMarkerId === marker.id)?.days || []
  }))), [selectedDay]);

  const filteredList = useMemo(() => {
    const byDay = filterByDay(FLEA_MARKET_LIST);
    if (selectedMarkerId) {
      return byDay.filter((item) => item.mapMarkerId === selectedMarkerId);
    }
    return byDay;
  }, [selectedMarkerId, selectedDay]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <PickerDay value={selectedDay} onChange={onDayChange} />

        <div className={styles.mapLayout}>
          <div className={styles.areaZone}>
            <span className={styles.areaLabel}>{FLEA_MARKET_ZONES.top.label}</span>
          </div>

          <div className={styles.boothRow}>
            {filteredMarkers.map((marker) => (
              <div key={marker.id} className={styles.boothCell}>
                <BoothInfoButton
                  labels={marker.labels}
                  tall
                  selected={selectedMarkerId === marker.id}
                  onClick={() => setSelectedMarkerId(marker.id)}
                />
              </div>
            ))}
          </div>

          <div className={styles.areaZone}>
            <span className={styles.areaLabel}>{FLEA_MARKET_ZONES.bottom.label}</span>
          </div>
        </div>

        <img src={StarYellow} alt="" className={styles.decorStarYellow} />
      </div>

      <div className={styles.listSection}>
        <h2 className={styles.listTitle}>부스목록</h2>
        <div className={styles.listScroll}>
          {filteredList.map((item) => (
            <FleaMarketDetailCard
              key={item.id}
              item={item}
              selected={selectedMarkerId === item.mapMarkerId}
              onClick={() => setSelectedMarkerId(item.mapMarkerId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
