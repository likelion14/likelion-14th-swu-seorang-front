import TagBoothOpen from "../assets/img/Tag-Booth-Open.svg";
import TagBoothClose from "../assets/img/Tag-Booth-Close.svg";
import type { FleaMarketListItem } from "../data/fleaMarketBoothData";
import styles from "./FleaMarketDetailCard.module.css";

interface FleaMarketDetailCardProps {
  item: FleaMarketListItem;
  selected?: boolean;
  onClick?: () => void;
}

export default function FleaMarketDetailCard({
  item,
  selected = false,
  onClick,
}: FleaMarketDetailCardProps) {
  const isOperating = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    const startTime = 11 * 60; // 11:00
    const endTime = 17 * 60; // 17:00
    return currentTime >= startTime && currentTime < endTime;
  };

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
            src={isOperating() ? TagBoothOpen : TagBoothClose}
            alt={isOperating() ? "운영중" : "운영전"}
          />
        </div>
      </div>

      <p className={styles.description}>{item.description}</p>

      <div className={styles.hashtagList}>
        {item.hashtags.map((tag) => (
          <span key={tag} className={styles.hashtag}>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
