import { useState } from "react";
import StarBlue from "../assets/icon/Sticker/Star-blue-big.svg";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.png";
import BoothInfoButton from "./BoothInfoButton";
import FleaMarketDetailCard from "./FleaMarketDetailCard";
import {
  FLEA_MARKET_LIST,
  FLEA_MARKET_MARKERS,
  FLEA_MARKET_ZONES,
} from "../data/fleaMarketBoothData";
import styles from "./FleaMarketBoothMap.module.css";

export default function FleaMarketBoothMap() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <img src={StarBlue} alt="" className={styles.decorStarBlue} />

        <div className={styles.mapLayout}>
          <div className={styles.areaZone}>
            <span className={styles.areaLabel}>{FLEA_MARKET_ZONES.top.label}</span>
          </div>

          <div className={styles.boothRow}>
            {FLEA_MARKET_MARKERS.map((marker) => (
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
          {FLEA_MARKET_LIST.map((item) => (
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
