import LocationIcon from "../assets/icon/Location-icon.svg";
import LocationButton from "../assets/icon/Btn/Location_Button.svg";

interface LocationDisplayProps {
  locationText: string;
}

export default function LocationDisplay({ locationText }: LocationDisplayProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "4px",
        alignSelf: "stretch",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <img
          src={LocationIcon}
          alt="Location Icon"
          style={{
            display: "flex",
            width: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <span
          style={{
            color: "#007495",
            fontFamily: "Pretendard",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "120%",
          }}
        >
          {locationText}
        </span>
      </div>

      <img 
        src={LocationButton} 
        alt="위치보기" 
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
