import styles from "./BoothInfoButton.module.css";

interface BoothInfoButtonProps {
  labels: string[];
  wide?: boolean;
  tall?: boolean;
  large?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

// 4글자는 2/2로 분리, 6글자는 3/3로 분리, 포토트레일러는 2/4로 분리, 그 외는 한 줄로 유지
const processLabels = (labels: string[]): { text: string; isSplit: boolean }[] => {
  const processed: { text: string; isSplit: boolean }[] = [];
  for (const label of labels) {
    if (label === "포토트레일러") {
      processed.push({ text: label.slice(0, 2), isSplit: true });
      processed.push({ text: label.slice(2), isSplit: true });
    } else if (label.length === 6) {
      processed.push({ text: label.slice(0, 3), isSplit: true });
      processed.push({ text: label.slice(3), isSplit: true });
    } else if (label.length === 4) {
      processed.push({ text: label.slice(0, 2), isSplit: true });
      processed.push({ text: label.slice(2), isSplit: true });
    } else {
      processed.push({ text: label, isSplit: false });
    }
  }
  return processed;
};

export default function BoothInfoButton({
  labels,
  wide = false,
  tall = false,
  large = false,
  selected = false,
  onClick,
}: BoothInfoButtonProps) {
  const processedLabels = processLabels(labels);

  return (
    <button
      type="button"
      className={`${styles.btn} ${wide ? styles.wide : ""} ${tall ? styles.tall : ""} ${
        large ? styles.large : ""
      } ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {processedLabels.map((item, index) => (
        <span key={`${item.text}-${index}`} className={styles.labelWrap}>
          {index > 0 && !item.isSplit && <span className={styles.divider} />}
          <span className={styles.label}>{item.text}</span>
        </span>
      ))}
    </button>
  );
}
