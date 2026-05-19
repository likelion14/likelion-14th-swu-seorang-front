import { useState, useMemo } from "react";
import StarYellow from "../assets/icon/Sticker/Star-yellow-medium.png";
import FoodTruckDetailCard from "./FoodTruckDetailCard";
import PickerDay from "./PickerDay";
import {
  FOOD_TRUCK_LIST,
  FOOD_TRUCK_ZONES,
  FOOD_TRUCK_CATEGORIES,
} from "../data/foodTruckData";
import { type FestivalDay } from "../types/booth";
import styles from "./FoodTruckBoothMap.module.css";

// 4글자는 2/2로 분리, 3글자는 한 줄로 유지
const processCategoryLabel = (label: string): string => {
  if (label.length === 4) {
    return label.slice(0, 2) + "\n" + label.slice(2);
  }
  return label;
};

export default function FoodTruckBoothMap() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<FestivalDay>("2025-05-20");

  const availableCategories = useMemo(() => {
    const categoriesForDay = FOOD_TRUCK_LIST
      .filter((item) => item.days.includes(selectedDay))
      .map((item) => item.name);
    return FOOD_TRUCK_CATEGORIES.filter((cat) => categoriesForDay.includes(cat));
  }, [selectedDay]);

  const filteredList = useMemo(() => {
    let result = FOOD_TRUCK_LIST;

    if (selectedCategory) {
      result = result.filter((item) => item.name.includes(selectedCategory));
    }

    result = result.filter((item) => item.days.includes(selectedDay));

    return result;
  }, [selectedCategory, selectedDay]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <PickerDay value={selectedDay} onChange={setSelectedDay} />

        <div className={styles.mapLayout}>
          <div className={`${styles.areaZone} ${styles.areaZoneTop}`}>
            <span className={styles.areaLabel}>{FOOD_TRUCK_ZONES.top.label}</span>
          </div>

          <div className={styles.categoryRow}>
            {availableCategories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.categoryButtonSelected : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {processCategoryLabel(category)}
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
          {filteredList.map((item) => (
            <FoodTruckDetailCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
