import TagBoothOpen from "../assets/img/Tag-Booth-Open.svg";
import TagBoothClose from "../assets/img/Tag-Booth-Close.svg";
import type { FoodTruckListItem } from "../data/foodTruckData";
import styles from "./FoodTruckDetailCard.module.css";

interface FoodTruckDetailCardProps {
  item: FoodTruckListItem;
  selected?: boolean;
  onClick?: () => void;
}

export default function FoodTruckDetailCard({
  item,
  selected = false,
  onClick,
}: FoodTruckDetailCardProps) {
  return (
    <article
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className={styles.header}>
        <span className={styles.atIcon}>@</span>
        <h3 className={styles.name}>{item.name}</h3>
        <div className={styles.statusRow}>
          <img
            src={item.status === "operating" ? TagBoothOpen : TagBoothClose}
            alt={item.status === "operating" ? "운영중" : "운영전"}
          />
        </div>
      </div>

      <div className={styles.menuList}>
        {item.menuItems.map((menuItem, index) => (
          <div key={index} className={styles.menuItem}>
            <span className={styles.menuName}>{menuItem.name}</span>
            <span className={styles.menuPrice}>{menuItem.price}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
