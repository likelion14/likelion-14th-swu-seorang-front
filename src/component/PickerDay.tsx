import { useEffect, useRef, useState } from "react";
import StarBlue from "../assets/icon/Sticker/Star-blue-big.svg";
import ChevronDown from "../assets/icon/Chevron-Down-blue.svg";
import { DAY_OPTIONS, type FestivalDay } from "../types/booth";
import styles from "./PickerDay.module.css";

interface PickerDayProps {
  value: FestivalDay;
  onChange: (day: FestivalDay) => void;
}

export default function PickerDay({ value, onChange }: PickerDayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected =
    DAY_OPTIONS.find((option) => option.value === value) ?? DAY_OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (day: FestivalDay) => {
    onChange(day);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.dayBadge}>
        <img src={StarBlue} alt="" className={styles.star} />
        <span className={styles.dayLabel}>{selected.dayBadge}</span>
      </div>

      <div className={styles.dropdownWrap}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.dateText}>{selected.label}</span>
          <img
            src={ChevronDown}
            alt=""
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          />
        </button>

        {isOpen && (
          <div className={styles.dropdown} role="listbox">
            {/* {DAY_OPTIONS.map((option, index) => (*/}
            {DAY_OPTIONS.filter((option) => option.value !== value).map((option, index) => (
              <div key={option.value}>
                {index > 0 && <div className={styles.divider} />}
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  className={`${styles.option} ${
                    value === option.value ? styles.optionActive : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
