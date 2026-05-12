import { useState } from "react";
import Chevron from "../../assets/icon/Chevron-Left-Blue.svg";
import styles from "./SignUp.module.css";
import CheckOn from "../../assets/icon/Btn/CheckBox-Active.svg";
import CheckOff from "../../assets/icon/Btn/CheckBox.svg";
import DisabledButton from "../../assets/icon/Btn/DisabledButton.svg";
import ActiveButton from "../../assets/icon/Btn/ActiveButton.svg";
import ErrorIcon from "../../assets/icon/Error-icon.svg";

const majors = [
    "개인정보보호전공",
    "경영학과",
    "경제학과",
    "공예_컬렉터블디자인전공",
    "국어국문학과",
    "과학기술융합자유전공",
    "기독교학과",
    "데이터사이언스학과",
    "독일문화콘텐츠전공",
    "디지털미디어학과",
    "디지털영상전공",
    "메타버스융합콘텐츠전공",
    "문헌정보학과",
    "미래산업융합자유전공",
    "바이오헬스융합학과",
    "비즈니스커뮤니케이션전공",
    "사이버보안전공",
    "사학과",
    "사회과학자유전공",
    "사회복지학과",
    "산업디자인학과",
    "생명환경공학과",
    "소프트웨어학과",
    "수학과",
    "스포츠운동과학과",
    "시각디자인전공",
    "식품생명공학과",
    "식품영양학과",
    "아동학과",
    "영어영문학과",
    "원예생명조경학과",
    "인지학습과학전공",
    "응용심리전공",
    "일어일문학과",
    "자유전공학부",
    "저널리즘전공",
    "중어중문학과",
    "첨단미디어디자인전공",
    "패션산업학과",
    "프랑스문화콘텐츠전공",
    "행정학과",
    "화학과",
    "현대미술전공",
];

export default function SignUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const majorError = submitted && search.trim() === "";
    const studentIdEmptyError = submitted && studentId.trim() === "";
    const studentIdFormatError =
        submitted &&
        studentId.trim() !== "" &&
        !/^\d{10}$/.test(studentId);

    const nameError = submitted && name.trim() === "";
    const phoneEmptyError = submitted && phone.trim() === "";
    const phoneFormatError =
        submitted &&
        phone.trim() !== "" &&
        phone.includes("-");

    const isValid =
        search.trim() !== "" ||
        studentId.trim() !== "" ||
        name.trim() !== "" ||
        phone.trim() !== "";

    const filteredMajors = majors.filter((major) =>
        major.includes(search)
    );

    return (
        <div className={styles.container}>
            <img
                src={Chevron}
                alt="뒤로가기"
                className={styles.chevron}
            />

            <p className={styles.title}>회원가입</p>

            <p className={styles.label}>학과</p>

            <div
                className={`${styles.dropdownContainer} ${isOpen ? styles.dropdownContainerOpen : ""
                    } ${majorError ? styles.errorBorder : ""}`}
            >
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    onClick={() => setIsOpen(true)}
                    placeholder={isOpen ? "" : "학과를 선택하세요"}
                    className={`${styles.input} ${isOpen ? styles.inputOpen : ""
                        }`}
                />

                {isOpen && (
                    <div className={styles.dropdown}>
                        {filteredMajors.map((major) => (
                            <div
                                key={major}
                                onClick={() => {
                                    setSearch(major);
                                    setIsOpen(false);
                                }}
                                className={styles.majorItem}
                            >
                                {major}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {majorError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        학과선택은 필수항목입니다.
                    </p>
                </div>
            )}

            <p className={styles.label}>학번</p>

            <div
                className={`${styles.inputContainer} ${studentIdEmptyError || studentIdFormatError
                    ? styles.errorBorder
                    : ""
                    }`}
            >
                <input
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="학번을 입력하세요"
                    className={styles.basicInput}
                />
            </div>

            {studentIdEmptyError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        학번입력은 필수항목입니다.
                    </p>
                </div>
            )}

            {studentIdFormatError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        학번 형식에 맞지 않습니다.
                    </p>
                </div>
            )}

            <p className={styles.label}>이름</p>

            <div
                className={`${styles.inputContainer} ${nameError ? styles.errorBorder : ""
                    }`}
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className={styles.basicInput}
                />
            </div>

            {nameError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        이름입력은 필수항목입니다.
                    </p>
                </div>
            )}


            <p className={styles.label}>전화번호</p>

            <div
                className={`${styles.inputContainer} ${phoneEmptyError || phoneFormatError
                    ? styles.errorBorder
                    : ""
                    }`}
            >
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="전화번호를 입력하세요"
                    className={styles.basicInput}
                />
            </div>

            {phoneEmptyError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        전화번호입력은 필수항목입니다.
                    </p>
                </div>
            )}

            {phoneFormatError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        하이픈(-)을 제외하여 입력해 주세요.
                    </p>
                </div>
            )}


            <p className={styles.label}>개인정보 수집 동의</p>
            <div className={styles.agreementBox}>
                <ol className={styles.agreementList}>
                    <li>
                        이벤트 참여를 위해 [이름, 학번, 학과, 전화번호]를 수집합니다.
                        이벤트 참여 확인 및 당첨 안내를 위한 목적으로, 수집한 개인정보는
                        3개월 후 안전하게 삭제됩니다.
                    </li>

                    <li>
                        개인정보 수집에 동의하지 않을 시, 회원가입이 어렵습니다.
                    </li>

                    <li>
                        회원가입하지 않아도 사이트 이용은 가능하지만, 일부 기능 사용이
                        제한되고 이벤트에 참여하실 수 없습니다.
                    </li>
                </ol>
            </div>


            <div className={styles.bottomCheckWrapper}>
                <div className={styles.bottomCheck}>
                    <img
                        src={isChecked ? CheckOn : CheckOff}
                        alt="체크박스"
                        className={styles.checkIcon}
                        onClick={() => setIsChecked(!isChecked)}
                    />

                    <p className={styles.checkText}>
                        개인정보 수집 및 이용에 동의합니다.
                    </p>
                </div>
            </div>

            <button
                className={styles.submitButton}
                onClick={() => setSubmitted(true)}
                disabled={!isValid}
            >
                <img
                    src={isValid ? ActiveButton : DisabledButton}
                    alt="다음 버튼"
                />
            </button>


        </div>
    );
}