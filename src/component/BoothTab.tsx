import ChevronLeft from "../assets/icon/Btn/Chevron-Left.svg";
import ChevronRight from "../assets/icon/Btn/Chevron-Right.svg";

const tabs = ["학과부스", "푸드트럭", "플리마켓", "슈니네컷"];

interface BoothTabProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function BoothTab({ currentIndex, onIndexChange }: BoothTabProps) {
  const handlePrev = () => {
    onIndexChange(currentIndex === 0 ? tabs.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onIndexChange(currentIndex === tabs.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "44px",
        padding: "8px 0",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        
      }}
    >
      <button
        onClick={handlePrev}
        style={{
          display: "flex",
          width: "26px",
          height: "26px",
          padding: "1px",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      >
        <img src={ChevronLeft} alt="left" style={{ width: "100%", height: "100%" }} />
      </button>

      <span
        style={{
          color: "#FFFFFF",
          textShadow: "-2px -2px 0 #07BCED, 2px -2px 0 #07BCED, -2px 2px 0 #07BCED, 2px 2px 0 #07BCED, -2px 0 0 #07BCED, 2px 0 0 #07BCED, 0 -2px 0 #07BCED, 0 2px 0 #07BCED",
          fontFamily: "Moneygraphy",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "130%",
        }}
      >
        {tabs[currentIndex]}
      </span>

      <button
        onClick={handleNext}
        style={{
          display: "flex",
          width: "26px",
          height: "26px",
          padding: "1px",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      >
        <img src={ChevronRight} alt="right" style={{ width: "100%", height: "100%" }} />
      </button>
    </div>
  );
}
