import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header";
import Tab from "../../component/Tab";
import styles from "./Certificate.module.css";
import NoticeImg from "../../assets/img/Notice.svg";
import LikeIcon from "../../assets/icon/Btn/Like.svg";
import UnLikeIcon from "../../assets/icon/Btn/UnLike.svg";
import DotMenuIcon from "../../assets/icon/Btn/DotMenu.svg";
import FabImg from "../../assets/icon/Btn/FAB.png";
import FabNoticeImg from "../../assets/img/FabNotice.svg";
import CloseButton from "../../assets/icon/Btn/CloseButton.svg";
import CancelButton from "../../assets/icon/Btn/CancelButton.png";
import DeleteConfirmButton from "../../assets/icon/Btn/DeleteConfirmButton.png";
import ModalBack from "../../assets/icon/Btn/Modal-Back.png";
import ModalLogin from "../../assets/icon/Btn/Modal-Login.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type FeedItem = {
  postId: number;
  imgUrl?: string;
  likeCount: number;
  isLiked: boolean;
  isOwner: boolean;
  tag1: string;
  tag2?: string;
  tag3?: string | null;
  authorId: number;
};

export default function Certificate() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch(`${BASE_URL}/api/posts`, { 
      headers: token ? {Authorization: `Bearer ${token}`} : {},
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFeed(data);
      })
      .catch(err => console.error("피드 불러오기 실패:", err));
  }, []);

  const toggleLike = async (postId: number) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${BASE_URL}/api/posts/${postId}/like`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFeed(prev =>
        prev.map(item =>
          item.postId === postId
            ? { ...item, likeCount: data.likeCount, isLiked: data.liked }
            : item
        )
      );
    } catch (err) {
      console.error("좋아요 실패:", err);
    }
  };

  const handleDelete = async () => {
    if (deleteTargetId === null) return;
    const token = localStorage.getItem("accessToken");
    try {
      await fetch(`${BASE_URL}/api/posts/${deleteTargetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeed(prev => prev.filter(item => item.postId !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <div className={styles.page} onClick={() => setOpenMenuId(null)}>
      <div className={styles.inner}>
        <Header />
        <Tab />

        <img src={NoticeImg} alt="이벤트 공지" className={styles.notice} />

        <div className={styles.grid}>
          {feed.map(item => {
            const tags = [item.tag1, item.tag2, item.tag3].filter(Boolean) as string[];
            return (
              <div key={item.postId} className={styles.card} onClick={e => e.stopPropagation()}>
                <div className={styles.cardImage}>
                  {item.imgUrl && (
                    <img src={item.imgUrl} alt="인증샷" className={styles.img} />
                  )}
                </div>

                {item.isOwner && (
                  <div className={styles.dotMenuWrapper}>
                    <button
                      className={styles.dotMenuBtn}
                      onClick={e => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === item.postId ? null : item.postId);
                      }}
                    >
                      <img src={DotMenuIcon} alt="메뉴" className={styles.dotMenuImg} />
                    </button>
                    {openMenuId === item.postId && (
                      <div className={styles.dropdownMenu}>
                        <button
                          className={styles.dropdownItem}
                          onClick={() => {
                            navigate(`/certificate/edit/${item.postId}`, { state: {post: item }});
                            setOpenMenuId(null);
                          }}
                        >
                          수정하기
                        </button>
                        <div className={styles.dropdownDivider} />
                        <button
                          className={styles.dropdownItem}
                          onClick={() => {
                            setDeleteTargetId(item.postId);
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
                  <button className={styles.heartBtn} onClick={() => toggleLike(item.postId)}>
                    <img src={item.isLiked ? LikeIcon : UnLikeIcon} alt="좋아요" className={styles.heartImg} />
                    <span className={styles.heartCount}>{item.likeCount}</span>
                  </button>
                  <div className={styles.tagBar}>
                    {tags.map(tag => (
                      <span key={tag} className={styles.tagItem}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isLoggedIn && (
      <div className={styles.fabWrapper}>
        <img src={FabNoticeImg} alt="이벤트 안내" className={styles.fabnotice} />
        <button className={styles.fabBtn} onClick={() => navigate("/certificate/upload")}>
          <img src={FabImg} alt="사진 업로드" className={styles.fabimg} />
        </button>
      </div>
      )}

      {deleteTargetId !== null && (
        <div className={styles.overlay} onClick={() => setDeleteTargetId(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTop}>
              <div className={styles.modalTextGroup}>
                <span className={styles.modalTitle}>게시물 삭제 안내</span>
                <p className={styles.modalHeading}>게시물을 삭제하시겠습니까?</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setDeleteTargetId(null)}>
                <img src={CloseButton} alt="닫기" className={styles.closeBtnImg} />
              </button>
            </div>
            <p className={styles.modalDesc}>
              삭제한 게시물은 되돌릴 수 없습니다. <br />
              삭제를 원하지 않는 경우 '취소' 버튼을 눌러주세요.
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.modalBtn} onClick={() => setDeleteTargetId(null)}>
                <img src={CancelButton} alt="취소" className={styles.modalBtnImg} />
              </button>
              <button className={styles.modalBtn} onClick={handleDelete}>
                <img src={DeleteConfirmButton} alt="삭제" className={styles.modalBtnImg} />
              </button>
            </div>
          </div>
        </div>
      )}


      {showLoginModal && (
        <div className={styles.overlay} onClick={() => setShowLoginModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTop}>
              <div className={styles.modalTextGroup}>
                <p className={styles.modalHeading}>로그인이 필요한 서비스예요</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setShowLoginModal(false)}>
                <img src={CloseButton} alt="닫기" className={styles.closeBtnImg} />
              </button>
            </div>
            <p className={styles.modalDesc}>
              좋아요 기능은 로그인 후 이용할 수 있어요.
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.modalBtn} onClick={() => setShowLoginModal(false)}>
                <img src={ModalBack} alt="돌아가기" className={styles.modalBtnImg} />
              </button>
              <button className={styles.modalBtn} onClick={() => navigate("/login")}>
                <img src={ModalLogin} alt="로그인" className={styles.modalBtnImg} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
