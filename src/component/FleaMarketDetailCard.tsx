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
            src={item.isOpen ? TagBoothOpen : TagBoothClose}
            alt={item.isOpen ? "운영중" : "운영전"}
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
