import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header";
import Tab from "../../component/Tab";
import styles from "./Certificate.module.css";
import NoticeImg from "../../assets/img/Notice.svg";
import LikeIcon from "../../assets/icon/Btn/Like.svg";
import UnLikeIcon from "../../assets/icon/Btn/UnLike.svg";
import DotMenuIcon from "../../assets/icon/Btn/DotMenu.svg";
import FabImg from "../../assets/icon/Btn/FAB.svg";
import FabNoticeImg from "../../assets/img/FabNotice.svg";
import CloseButton from "../../assets/icon/Btn/CloseButton.svg";
import CancelButton from "../../assets/icon/Btn/CancelButton.svg";
import DeleteConfirmButton from "../../assets/icon/Btn/DeleteConfirmButton.svg";

type FeedItem = {
  id: number;
  imageUrl?: string;
  likes: number;
  liked: boolean;
  tags: string[];
  isOwner: boolean;
};

const MOCK_FEED: FeedItem[] = [
  { id: 1, likes: 23, liked: false, tags: ["고양이", "치즈냥이"], isOwner: true },
  { id: 2, likes: 20, liked: false, tags: ["SWU", "축제"], isOwner: false },
  { id: 3, likes: 16, liked: false, tags: ["Tag1", "Tag2"], isOwner: false },
  { id: 4, likes: 8, liked: false, tags: ["Tag1", "Tag2"], isOwner: false },
  { id: 5, likes: 5, liked: false, tags: ["Tag1", "Tag2"], isOwner: false },
  { id: 6, likes: 1, liked: false, tags: ["Tag1", "Tag2"], isOwner: false },
];

export default function Certificate() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState<FeedItem[]>(MOCK_FEED);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setFeed(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const handleDelete = () => {
    if (deleteTargetId !== null) {
      setFeed(prev => prev.filter(item => item.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <div className={styles.page} onClick={() => setOpenMenuId(null)}>
      <div className={styles.inner}>
        <Header />
        <Tab />

       <img src={NoticeImg} alt="이벤트 공지" className={styles.notice}/>

        <div className={styles.grid}>
          {feed.map(item => (
            <div key={item.id} className={styles.card} onClick={e => e.stopPropagation()}>
              <div className={styles.cardImage}>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt="인증샷" className={styles.img} />
                )}
              </div>

              {item.isOwner && (
                <div className={styles.dotMenuWrapper}>
                  <button
                    className={styles.dotMenuBtn}
                    onClick={e => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === item.id ? null : item.id);
                    }}
                  >
                    <img src={DotMenuIcon} alt="메뉴" className={styles.dotMenuImg}/>
                  </button>
                  {openMenuId === item.id && (
                    <div className={styles.dropdownMenu}>
                      <button
                        className={styles.dropdownItem}
                        onClick={() => {
                          navigate(`/certificate/edit/${item.id}`);
                          setOpenMenuId(null);
                        }}
                      >
                        수정하기
                      </button>
                      <div className={styles.dropdownDivider} />
                      <button
                        className={styles.dropdownItem}
                        onClick={() => {
                          setDeleteTargetId(item.id);
                          setOpenMenuId(null);
                        }}
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className={styles.cardBottom}>
                <button className={styles.heartBtn} onClick={() => toggleLike(item.id)}>
                  <img src={item.liked ? LikeIcon : UnLikeIcon} alt="좋아요" className={styles.heartImg}/>
                  <span className={styles.heartCount}>{item.likes}</span>
                </button>
                <div className={styles.tagBar}>
                  {item.tags.map(tag => (
                    <span key={tag} className={styles.tagItem}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fabWrapper}>
        <img src={FabNoticeImg} alt="이벤트 안내" className={styles.fabnotice}/>
        <button className={styles.fabBtn} onClick={() => navigate("/certificate/upload")}>
          <img src={FabImg} alt="사진 업로드" className={styles.fabimg}/>
        </button>
      </div>

      {deleteTargetId !== null && (
        <div className={styles.overlay} onClick={() => setDeleteTargetId(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTop}>
              <div className={styles.modalTextGroup}>
                <span className={styles.modalTitle}>게시물 삭제 안내</span>
                <p className={styles.modalHeading}>게시물을 삭제하시겠습니까?</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setDeleteTargetId(null)}>
                <img src={CloseButton} alt="닫기" className={styles.closeBtnImg}/>
              </button>
            </div>
            <p className={styles.modalDesc}>
              삭제한 게시물은 되돌릴 수 없습니다. <br/>
              삭제를 원하지 않는 경우 '돌아가기' 버튼을 눌러주세요.
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.modalBtn} onClick={() => setDeleteTargetId(null)}>
                <img src={CancelButton} alt="취소" className={styles.modalBtnImg} />
              </button>
              <button className={styles.modalBtn} onClick={handleDelete}>
                <img src={DeleteConfirmButton} alt="삭제" className={styles.modalBtnImg}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
