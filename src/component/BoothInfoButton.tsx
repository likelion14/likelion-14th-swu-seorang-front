import styles from "./BoothInfoButton.module.css";

interface BoothInfoButtonProps {
  labels: string[];
  wide?: boolean;
  tall?: boolean;
  large?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export default function BoothInfoButton({
  labels,
  wide = false,
  tall = false,
  large = false,
  selected = false,
  onClick,
}: BoothInfoButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${wide ? styles.wide : ""} ${tall ? styles.tall : ""} ${
        large ? styles.large : ""
      } ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {labels.map((label, index) => (
        <span key={`${label}-${index}`} className={styles.labelWrap}>
          {index > 0 && <span className={styles.divider} />}
          <span className={styles.label}>{label}</span>
        </span>
      ))}
    </button>
  );
}
