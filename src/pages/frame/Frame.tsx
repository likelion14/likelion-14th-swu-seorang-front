import { useRef, useState } from "react";

import Header from "../../component/header";
import Tab from "../../component/Tab";

import styles from "../frame/Frame.module.css";

import BlurFrame from "../../assets/img/Blur-Frame.svg";
import FrameImage from "../../assets/img/Frame.png";

import Placeholder from "../../assets/icon/Plus-Icon.svg";
import EditButton from "../../assets/icon/Btn/Frame-Edit.svg";
import DeleteIcon from "../../assets/icon/Trash-icon.svg";
import DownloadButton from "../../assets/icon/Btn/Frame-Download.svg";
import RefreshButton from "../../assets/icon/Btn/Refresh-Button.svg";
import FrameEvent from "../../assets/icon/Frame-event.svg";


import html2canvas from "html2canvas";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export default function Frame() {
  // 슬롯별 이미지 상태
  const [images, setImages] = useState([
    "",
    "",
    "",
    "",
  ]);

  // 여러 슬롯 선택 가능
  const [selectedSlots, setSelectedSlots] =
    useState<number[]>([]);

  // 바텀시트 상태
  const [isBottomSheetOpen, setIsBottomSheetOpen] =
    useState(false);

  // 완성 이미지
  const [finalImage, setFinalImage] =
    useState("");

  // 프레임 ref
  const frameRef =
    useRef<HTMLDivElement>(null);

  // input ref 4개
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // 슬롯 클릭
  const handleClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  // 이미지 선택
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const newImages = [...images];
    newImages[index] = imageUrl;

    setImages(newImages);
  };

  // 이미지 삭제
  const handleDelete = (index: number) => {
    const newImages = [...images];

    newImages[index] = "";

    setImages(newImages);

    // 선택 상태 제거
    setSelectedSlots(
      selectedSlots.filter((i) => i !== index)
    );
  };

  const handleReset = () => {
    setImages(["", "", "", ""]);

    setSelectedSlots([]);
  };


  // 네 장 모두 채워졌는지 검사
  const isAllImagesFilled = images.every(
    (image) => image !== ""
  );

  // 네컷 생성
  const handleCreateFrame = async () => {
    if (!isAllImagesFilled) {
      return;
    }

    if (!frameRef.current) return;

    setSelectedSlots([]);

    await new Promise((resolve) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
      )
    );

    const canvas = await html2canvas(
      frameRef.current,
      {
        backgroundColor: null,
        useCORS: true,
        scale: 3,
      }
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const imageUrl =
        URL.createObjectURL(blob);

      setFinalImage(imageUrl);

      setIsBottomSheetOpen(true);
    }, "image/png");

    setIsBottomSheetOpen(true);
  };

  // 다운로드
  const handleDownload = async () => {
    if (!finalImage) return;

    try {
      const response = await fetch(
        finalImage
      );

      const blob = await response.blob();

      const file = new File(
        [blob],
        "멋사X서랑제 네컷.png",
        {
          type: "image/png",
        }
      );

      // 모바일 공유 API
      if (
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        await navigator.share({
          files: [file],
          title: "네컷사진",
        });

        return;
      }

      // fallback
      const link =
        document.createElement("a");

      link.href = finalImage;
      link.download = "멋사X서랑제 네컷.png";

      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Header />
        <Tab />

        <img
          src={BlurFrame}
          className={styles.backgroundframe}
        />

        <img
          src={RefreshButton}
          className={styles.refreshButton}
          onClick={handleReset}
        />

      {/* 실제 네컷 */}
      <div
        className={styles.frameWrapper}
        ref={frameRef}
      >
        {[1, 2, 3, 4].map((slot, index) => (
          <div
            key={slot}
            className={styles[`slot${slot}`]}
            onClick={() => {
              // 이미지 없으면 업로드
              if (!images[index]) {
                handleClick(index);
                return;
              }

              // 이미 선택된 상태면 해제
              if (
                selectedSlots.includes(index)
              ) {
                setSelectedSlots(
                  selectedSlots.filter(
                    (i) => i !== index
                  )
                );
              } else {
                // 선택 추가
                setSelectedSlots([
                  ...selectedSlots,
                  index,
                ]);
              }
            }}
          >
            {images[index] ? (
              <>
                {/* zoom 영역 */}
                <div
                  className={
                    styles.transformContainer
                  }
                >
                  <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    centerOnInit
                    limitToBounds={false}
                    doubleClick={{
                      disabled: true,
                    }}
                    pinch={{ step: 5 }}
                  >
                    <TransformComponent
                      wrapperStyle={{
                        width: "100%",
                        height: "100%",
                      }}

                    >
                      <img
                        src={images[index]}
                        className={
                          styles.uploadedImage
                        }
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>

                {/* overlay */}
                {selectedSlots.includes(
                  index
                ) && (
                    <div
                      className={styles.slotOverlay}
                      onClick={(e) => {
                        e.stopPropagation();

                        setSelectedSlots(
                          selectedSlots.filter(
                            (i) => i !== index
                          )
                        );
                      }}
                    >
                      <img
                        src={DeleteIcon}
                        className={
                          styles.deleteIcon
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(index);
                        }}
                      />
                    </div>
                  )}
              </>
            ) : (
              <div
                className={styles.placeholder}
              >
                <img
                  src={Placeholder}
                  className={
                    styles.placeholderIcon
                  }
                />
                <p>사진 추가</p>
              </div>
            )}

            {/* 숨겨진 input */}
            <input
              ref={fileInputRefs[index]}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                handleChange(e, index)
              }
            />
          </div>
        ))}

        {/* 프레임 */}
        <img
          src={FrameImage}
          className={styles.frameImage}
        />
      </div>

      {/* 하단 버튼 */}
      <img
        src={EditButton}
        className={styles.bottomButton}
        onClick={handleCreateFrame}
      />

      {/* 바텀시트 */}
      {isBottomSheetOpen && (
        <div
          className={
            styles.bottomSheetOverlay
          }
          onClick={() =>
            setIsBottomSheetOpen(false)
          }
        >
          <div
            className={styles.bottomSheet}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <p className={styles.sheetText}>
              프레임 미리보기
            </p>

            {finalImage && (
              <img
                src={finalImage}
                className={styles.resultImage}
              />
            )}
            <img
              src={FrameEvent}
              className={styles.frameEvent}
            />

            <img
              src={DownloadButton}
              className={
                styles.downloadButton
              }
              onClick={handleDownload}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}