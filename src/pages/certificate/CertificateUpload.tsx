import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeft from "../../assets/icon/Chevron-Left-White.svg";
import styles from "./CertificateUpload.module.css";
import NoticeImg from "../../assets/img/Notice.svg"
import ActiveButton from "../../assets/icon/Btn/ActiveButton.png";
import DisabledButton from "../../assets/icon/Btn/DisabledButton.png";
import ErrorIcon from "../../assets/icon/Error-icon.svg";
import ErrorIconGray from "../../assets/icon/Error-icon-gray.svg";
import FeedPhotoUploader from "../../assets/img/Feed-Photo-Uploader.svg";
import TrashButton from "../../assets/icon/Btn/TrashButton.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const MAX_TAGS = 2;
const MAX_TAG_LENGTH = 4;

export default function CertificateUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    setTagError(value.length > MAX_TAG_LENGTH);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags(prev => prev.slice(0, -1));
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tagError || tags.length >= MAX_TAGS) return;
    if (trimmed.length > MAX_TAG_LENGTH) {
      setTagError(true);
      return;
    }
    setTags(prev => [...prev, trimmed]);
    setTagInput("");
    setTagError(false);
  };

  const removeTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const canSubmit = photoFile !== null && tags.length >= 1;
  
  const handleSubmit = async () => {
    if (!canSubmit) return;
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("imgUrl", photoFile!);
    formData.append("tag1", tags[0]);
    if (tags[1]) formData.append("tag2", tags[1]);

    await fetch(`${BASE_URL}/api/posts`,{
      method: "POST",
      headers: {Authorization: `Bearer ${token}`},
      body: formData,
    });
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.uploadHeader}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src={ChevronLeft} alt="뒤로가기" className={styles.chevron} />
        </button>
        <span className={styles.headerTitle}>인증샷 업로드</span>
        <div className={styles.headerRight} />
      </div>

      <div className={styles.inner}>
        <img src={NoticeImg} alt="이벤트 공지"/>

        <div className={styles.uploaderWrapper}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handlePhotoSelect}
          />

          {photoUrl ? (
            <div className={styles.photoPreview}>
              <img src={photoUrl} alt="업로드 사진" className={styles.previewImg} />
              <div className={styles.photoOverlay}>
                <button
                  className={styles.trashBtn}
                  onClick={() => setPhotoUrl(null)}
                >
                  <img src={TrashButton} alt="사진 삭제"/>
                </button>
              </div>
            </div>
          ) : (
            <button
              className={styles.photoPlaceholder}
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={FeedPhotoUploader} alt="사진추가" className={styles.UploaderImg}/>
            </button>
          )}
        </div>

        <div className={styles.tagSection}>
          <p className={styles.tagLabel}>태그 작성</p>

          <div className={`${styles.tagInputBox} ${tagError ? styles.tagInputBoxError : ""}`}>
            <div className={styles.tagInputInner}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.tagChip}>
                  <span className={styles.tagChipText}>{tag}</span>
                  <button className={styles.tagChipDelete} onClick={() => removeTag(i)}>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                      <path d="M1 1L5 5M5 1L1 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ))}
              {tags.length < MAX_TAGS && (
                <input
                  className={styles.tagRawInput}
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  placeholder={tags.length === 0 ? "태그를 작성해주세요" : ""}
                />
              )}
            </div>
            <span className={styles.counter}>
              <span className={styles.counterActive}>{tags.length}</span>
              <span className={styles.counterLimit}>/{MAX_TAGS}</span>
            </span>
          </div>

          <div className ={styles.tagHint}>
            <img
              src={tagError ? ErrorIcon : ErrorIconGray}
              alt=""
              className={styles.tagHintIcon}
              />
            <span className={tagError ? styles.tagHintTextError : styles.tagHintText}>
              태그는 최대 2개, 각 4글자까지 입력 가능해요
            </span>
          </div>
        </div>

        <button
          className={styles.submitBtn}
          onClick={() => {if(canSubmit) handleSubmit();}}
          disabled={!canSubmit}
        >
        <img src={canSubmit ? ActiveButton : DisabledButton} alt="완료 버튼"/>
        </button>
      </div>
    </div>
  );
}
