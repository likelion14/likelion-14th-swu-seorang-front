import { useState } from "react";
import Header from "../../component/header";
import Tab from "../../component/Tab";
import ChevronLeft from "../../assets/icon/Btn/Chevron-Left.svg";
import ChevronRight from "../../assets/icon/Btn/Chevron-Right.svg";
import ChoiYuriBadge from "../../assets/icon/performance/Artist-1.png";
import KiirasBadge from "../../assets/icon/performance/Artist-2.png";
import OhmygirlBadge from "../../assets/icon/performance/Artist-3.png";
import StarSticker from "../../assets/icon/Sticker/Star-yellow-medium.png";
import ChoiYuriImg from "../../assets/icon/performance/Artist1.svg";
import KiirasImg from "../../assets/icon/performance/Artist2.svg";
import OhmygirlImg from "../../assets/icon/performance/Artist3.svg";
import sorimadang from "../../assets/icon/performance/sorimadang.svg";
import sel from "../../assets/icon/performance/SEL.svg";
import hyeyumies from "../../assets/icon/performance/hyeyumies.svg";
import boltfromtheblue from "../../assets/icon/performance/boltfromtheblue.svg";
import SAKE from "../../assets/icon/performance/SAKE.svg";
import tipssy from "../../assets/icon/performance/tipssy.svg";
import PreviewBtn from "../../assets/icon/Btn/Artist-song.png";
import DetailBadge from "../../assets/icon/Btn/Artist-Info.png";

import styles from "./performance.module.css";

const performancePages = [
    {
        date: "5/22",
        label: "5/22 (목)",

        artists: [
            {
                id: 1,
                name: "최유리",
                image: ChoiYuriImg,
                badge: ChoiYuriBadge,
                musicUrl:
                    "https://embed.music.apple.com/kr/album/1641252974",
            },
            {
                id: 2,
                name: "키라스",
                image: KiirasImg,
                badge: KiirasBadge,
                musicUrl:
                    "https://embed.music.apple.com/kr/album/1895919268",
            },
        ],

        performances: [
            {
                id: 1,
                team: "소리마당",
        
                image: sorimadang,
            },
            {
                id: 2,
                team: "S.E.L",
  
                image: sel,
            },
            {
                id: 3,
                team: "한혜윰",

                image: hyeyumies,
            },
        ],
    },

    {
        date: "5/23",
        label: "5/23 (금)",

        artists: [
            {
                id: 1,
                name: "오마이걸",
                image: OhmygirlImg,
                badge: OhmygirlBadge,
                musicUrl:
                    "https://embed.music.apple.com/kr/album/1738879486",
            },
        ],

        performances: [
            {
                id: 4,
                team: "TIPSSY",
         
                image: tipssy,
            },
            {
                id: 5,
                team: "청천벽력",
           
                image: boltfromtheblue,
            },
            {
                id: 6,
                team: "S.A.K.E.",
      
                image: SAKE,
            },
        ],
    },
];

export default function HomeBooth() {
    const today = new Date();

    // 접속 날짜 기준 기본값 설정
    const defaultPage =
        today.getDate() === 23 ? 1 : 0;

    // 현재 날짜 페이지
    const [currentPage, setCurrentPage] =
        useState(defaultPage);

    // 현재 아티스트 페이지
    const [currentArtistIndex, setCurrentArtistIndex] =
        useState(0);

    const [showMusic, setShowMusic] = useState(false);

    // 현재 날짜 데이터
    const currentData =
        performancePages[currentPage];

    // 현재 아티스트 데이터
    const currentArtist =
        currentData.artists[currentArtistIndex];

    const handlePrev = () => {
        // 현재 날짜 안에서 이전 아티스트 이동
        if (currentArtistIndex > 0) {
            setCurrentArtistIndex((prev) => prev - 1);
        } else {
            // 이전 날짜로 이동
            const prevPage =
                currentPage === 0
                    ? performancePages.length - 1
                    : currentPage - 1;

            setCurrentPage(prevPage);

            // 이전 날짜의 마지막 아티스트로 이동
            setCurrentArtistIndex(
                performancePages[prevPage].artists.length - 1
            );
        }

        setShowMusic(false);
    };

    const handleNext = () => {
        // 현재 날짜 안에서 다음 아티스트 이동
        if (
            currentArtistIndex <
            currentData.artists.length - 1
        ) {
            setCurrentArtistIndex((prev) => prev + 1);
        } else {
            // 다음 날짜로 이동
            const nextPage =
                currentPage === performancePages.length - 1
                    ? 0
                    : currentPage + 1;

            setCurrentPage(nextPage);

            // 다음 날짜 첫 번째 아티스트
            setCurrentArtistIndex(0);
        }

        setShowMusic(false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <Header />

                <Tab />

                {/* 날짜 선택 */}
                <section className={styles.dateSection}>
                    <button
                        className={styles.arrowButton}
                        onClick={handlePrev}
                    >
                        <img
                            src={ChevronLeft}
                            alt="이전 날짜"
                            className={styles.arrowIcon}
                        />
                    </button>

                    <h1 className={styles.dateText}>
                        {currentData.label}
                    </h1>

                    <button
                        className={styles.arrowButton}
                        onClick={handleNext}
                    >
                        <img
                            src={ChevronRight}
                            alt="다음 날짜"
                            className={styles.arrowIcon}
                        />
                    </button>
                </section>

                {/* 아티스트 카드 */}
                <section className={styles.artistCard}>
                    <div
                        className={styles.artistBadge}
                        onClick={() => {
                            if (showMusic) {
                                setShowMusic(false);
                            }
                        }}
                    >
                        <img
                            src={
                                showMusic
                                    ? DetailBadge
                                    : currentArtist.badge
                            }
                            alt="badge"
                            className={
                                showMusic
                                    ? styles.detailBadgeSvg
                                    : styles.defaultBadgeSvg
                            }
                        />
                    </div>

                    <img
                        src={StarSticker}
                        alt="star"
                        className={
                            showMusic
                                ? styles.starIconMusic
                                : styles.starIcon
                        }
                    />

                    {showMusic ? (
                        <div className={styles.musicWrapper}>
                            <iframe
                                allow="autoplay *; encrypted-media *;"
                                style={{
                                    width: "100%",
                                    height: "450px",
                                    border: "none",
                                    borderRadius: "12px",
                                }}
                                src={currentArtist.musicUrl}
                                className={styles.appleMusic}
                            />
                        </div>
                    ) : (
                        <img
                            src={currentArtist.image}
                            alt={currentArtist.name}
                            className={styles.artistBg}
                        />
                    )}

                    {!showMusic && (
                        <button
                            className={styles.previewBtn}
                            onClick={() => setShowMusic(true)}
                        >
                            <img src={PreviewBtn} alt="대표곡 미리듣기" className={styles.previewBtnImg} />
                        </button>
                    )}
                </section>

                {/* 동아리 공연 */}
                <div className={styles.sectionLabel}>
                    동아리 공연
                </div>

                {/* 공연 리스트 */}
                <section className={styles.performanceList}>
                    {currentData.performances.map((p) => (
                        <article key={p.id} className={styles.card}>
                            <img
                                src={p.image}
                                alt={p.team}
                                className={styles.artistImage}
                            />

                            <div className={styles.textWrapper}>
                                <h2 className={styles.teamName}>
                                    {p.team}
                                </h2>

    
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    );
}
