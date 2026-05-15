import { useState } from "react";
import StarBlue from "../assets/icon/Sticker/Star-blue-big.svg";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.svg";
import FoodTruckDetailCard from "./FoodTruckDetailCard";
import {
  FOOD_TRUCK_LIST,
  FOOD_TRUCK_ZONES,
  FOOD_TRUCK_CATEGORIES,
} from "../data/foodTruckData";
import styles from "./FoodTruckBoothMap.module.css";

export default function FoodTruckBoothMap() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <img src={StarBlue} alt="" className={styles.decorStarBlue} />

        <div className={styles.mapLayout}>
          <div className={`${styles.areaZone} ${styles.areaZoneTop}`}>
            <span className={styles.areaLabel}>{FOOD_TRUCK_ZONES.top.label}</span>
          </div>

          <div className={styles.categoryRow}>
            {FOOD_TRUCK_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.categoryButtonSelected : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={`${styles.areaZone} ${styles.areaZoneBottom}`}>
            <span className={styles.areaLabel}>{FOOD_TRUCK_ZONES.bottom.label}</span>
          </div>
        </div>

        <img src={StarYellow} alt="" className={styles.decorStarYellow} />
      </div>

      <div className={styles.listSection}>
        <h2 className={styles.listTitle}>부스목록</h2>
        <div className={styles.listScroll}>
          {FOOD_TRUCK_LIST.map((item) => (
            <FoodTruckDetailCard
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
