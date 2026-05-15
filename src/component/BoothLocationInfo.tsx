import { useState } from "react";
import LocationIcon from "../assets/icon/Location-blue-icon.svg";
import LocationBlackIcon from "../assets/icon/Location-black-icon.svg";
import LocationButton from "../assets/icon/Btn/Location_Button.svg";
import CloseButton from "../assets/icon/Btn/Close-Round-Button.svg";
import GrassPlazaMap from "../assets/img/Grass-Plaza-Location-Map.svg";
import HansaemWayMap from "../assets/img/Hansaem-Way-Location-Map.svg";
import ScienceBldg1Map from "../assets/img/Science-Bldg1-Location-Map.svg";
import ScienceBldg2Map from "../assets/img/Science-Bldg2-Location-Map.svg";

interface BoothLocationInfoProps {
  locationText: string;
}

const getMapImage = (locationText: string): string => {
  if (locationText.includes("한샘길")) return HansaemWayMap;
  if (locationText.includes("제1과학관")) return ScienceBldg1Map;
  if (locationText.includes("제2과학관") || locationText.includes("샬롬")) return ScienceBldg2Map;
  return GrassPlazaMap;
};

export default function BoothLocationInfo({ locationText }: BoothLocationInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mapImage = getMapImage(locationText);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* 위치 표시 및 버튼 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "4px",
          alignSelf: "stretch",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <img src={LocationIcon} alt="Location Icon" style={{ width: "12px" }} />
          <span
            style={{
              color: "var(--Primary-Text, #007495)",
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
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* 모달 영역 */}
      {isModalOpen && (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(1px)",
              zIndex: 1000,
            }}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              zIndex: 1001,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "280px",
                height: "280px",
                borderRadius: "19px",
                overflow: "hidden",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* 지도 배경 이미지 */}
              <img
                src={mapImage}
                alt="지도"
                style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* 상단 글씨와 닫기 버튼을 감싸는 Flex 컨테이너 */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  width: "280px",       
                  padding: "16px",      
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  boxSizing: "border-box", 
                }}
              >
                {/* 왼쪽: 위치 라벨 */}
                <div
                  style={{
                    display: "flex",
                    padding: "4px 6px",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "999px",
                    background: "#F9FAFA",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img src={LocationBlackIcon} alt="위치" style={{ width: "12px", height: "12px", display: "flex", alignItems: "center" }} />
                  <span style={{ color: "var(--Gray-90, #33363D)", fontFamily: "Pretendard", fontSize: "12px", fontStyle: "normal", fontWeight: "600", lineHeight: "120%", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                    {locationText}
                  </span>
                </div>

                {/* 오른쪽: 닫기 버튼 */}
                <div
                  style={{
                    display: "flex",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#F9FAFA",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <img src={CloseButton} alt="닫기" style={{ width: "24px", height: "24px" }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}