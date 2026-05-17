import TagBoothOpen from "../assets/img/Tag-Booth-Open.svg";
import TagBoothClose from "../assets/img/Tag-Booth-Close.svg";
import BoothCheck from "../assets/icon/Btn/BoothCheck.png";
import StarPinkCheck from "../assets/icon/Sticker/Star-pink-check.png";
import type { BoothListItem } from "../types/booth";
import styles from "./BoothDetailCard.module.css";

interface BoothDetailCardProps {
  item: BoothListItem;
  selected?: boolean;
  onClick?: () => void;
  onCheck?: () => void;
  checking?: boolean;
}

export default function BoothDetailCard({
  item,
  selected = false,
  onClick,
  onCheck,
  checking = false,
}: BoothDetailCardProps) {
  return (
    <article
      className={styles.card}
      style={selected ? { borderColor: "#1ccafb" } : undefined}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <div className={styles.textArea}>
        <span className={styles.atIcon}>@</span>
        <h3 className={styles.department}>{item.department}</h3>
        <div className={styles.statusRow}>
          <img
            src={item.isOpen ? TagBoothOpen : TagBoothClose}
            alt={item.isOpen ? "운영중" : "운영종료"}
            height={14}
          />
        </div>
      </div>

      <button
        type="button"
        className={`${styles.checkBtn} ${item.checked ? styles.checkBtnDone : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!item.checked && !checking) {
            onCheck?.();
          }
        }}
        disabled={checking || item.checked}
      >
        <img
          src={item.checked ? StarPinkCheck : BoothCheck}
          alt=""
        />
      </button>
    </article>
  );
}
