import { useState } from "react";
import StarBlue from "../assets/icon/Sticker/Star-blue-big.svg";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.png";
import BoothInfoButton from "./BoothInfoButton";
import ShuniBoothDetailCard from "./ShuniBoothDetailCard";
import {
  SHUNI_BOOTH_MARKERS,
  SHUNI_BUILDING_ZONES,
} from "../data/shuniBoothData";
import styles from "./ShuniBoothMap.module.css";

export default function ShuniBoothMap() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <img src={StarBlue} alt="" className={styles.decorStarBlue} />

        <div className={styles.mapArea}>
          {SHUNI_BUILDING_ZONES.map((zone) => (
            <div
              key={zone.id}
              className={`${styles.buildingZone} ${
                zone.id === "sci2" ? styles.sci2Zone : ""
              }`}
              style={{
                left: `${zone.left}%`,
                top: `${zone.top}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
              }}
            >
              <span className={styles.buildingLabel}>{zone.label}</span>
            </div>
          ))}

          {SHUNI_BOOTH_MARKERS.map((marker) => (
            <div
              key={marker.id}
              className={styles.boothMarker}
              style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
            >
              <BoothInfoButton
                labels={marker.labels}
                large
                selected={selectedMarkerId === marker.id}
                onClick={() => setSelectedMarkerId(marker.id)}
              />
            </div>
          ))}
        </div>

        <img src={StarYellow} alt="" className={styles.decorStarYellow} />
      </div>

      <div className={styles.listSection}>
        <h2 className={styles.listTitle}>부스목록</h2>
        <div className={styles.listScroll}>
          <ShuniBoothDetailCard />
        </div>
      </div>
    </section>
  );
}
