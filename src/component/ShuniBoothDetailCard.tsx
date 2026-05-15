import TagBoothOpen from "../assets/img/Tag-Booth-Open.svg";
import TagBoothClose from "../assets/img/Tag-Booth-Close.svg";
import {
  SHUNI_BOOTH_DETAIL,
  SHUNI_FRAME_PREVIEWS,
  type ShuniBoothDetail,
} from "../data/shuniBoothData";
import styles from "./ShuniBoothDetailCard.module.css";

interface ShuniBoothDetailCardProps {
  detail?: ShuniBoothDetail;
}

export default function ShuniBoothDetailCard({
  detail = SHUNI_BOOTH_DETAIL,
}: ShuniBoothDetailCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.atIcon}>@</span>
        <h3 className={styles.title}>{detail.title}</h3>
        <div className={styles.statusRow}>
          <img
            src={detail.isOpen ? TagBoothOpen : TagBoothClose}
            alt={detail.isOpen ? "운영중" : "운영종료"}
          />
        </div>
      </div>

      <ul className={styles.priceList}>
        {detail.prices.map((item) => (
          <li key={item.description} className={styles.priceItem}>
            <span className={styles.priceDesc}>{item.description}</span>
            <span className={styles.priceValue}>{item.price}</span>
          </li>
        ))}
      </ul>

      <p className={styles.paymentNote}>{detail.paymentNote}</p>

      <div className={styles.frameGallery}>
        {SHUNI_FRAME_PREVIEWS.map((frame) => (
          <div
            key={frame.id}
            className={styles.frameThumb}
            style={{ backgroundColor: frame.color }}
            aria-hidden
          />
        ))}
      </div>
    </article>
  );
}
