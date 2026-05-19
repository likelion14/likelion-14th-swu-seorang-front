import TagBoothOpen from "../assets/img/Tag-Booth-Open.svg";
import TagBoothClose from "../assets/img/Tag-Booth-Close.svg";
import Shuni4cutsA from "../assets/img/Shuni-4cuts-A.svg";
import Shuni4cutsB from "../assets/img/Shuni-4cuts-B.svg";
import Chongjang4cuts from "../assets/img/Chongjang_4cuts.svg";
import {
  SHUNI_BOOTH_DETAIL,
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
            alt={detail.isOpen ? "운영중" : "운영전"}
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
        <img src={Shuni4cutsA} alt="" className={styles.frameThumb} />
        <img src={Shuni4cutsB} alt="" className={styles.frameThumb} />
        <img src={Chongjang4cuts} alt="" className={styles.frameThumb} />
      </div>
    </article>
  );
}
