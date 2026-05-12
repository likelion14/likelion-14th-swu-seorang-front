import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chevron from "../../assets/icon/Chevron-Left-Blue.svg";
import styles from "./SignUp.module.css";
import LoginButton from "../../assets/icon/Btn/Login-Button.svg";
import SignupButton from "../../assets/icon/Btn/Signup-Button.svg";
import ErrorIcon from "../../assets/icon/Error-icon.svg";

export default function Login() {
    const [studentId, setStudentId] = useState("");
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const studentIdEmptyError =
        submitted && studentId.trim() === "";

    const studentIdFormatError =
        submitted &&
        studentId.trim() !== "" &&
        !/^\d{10}$/.test(studentId);

    const phoneEmptyError =
        submitted && phone.trim() === "";

    const phoneFormatError =
        submitted &&
        phone.trim() !== "" &&
        phone.includes("-");


    return (
        <div className={styles.container}>
            <button
                type="button"
                className={styles.backButton}
                onClick={() => navigate(-1)}
            >
                <img
                    src={Chevron}
                    alt="뒤로가기"
                    className={styles.chevron}
                />
            </button>

            <p className={styles.title}>로그인</p>

            <p className={styles.detail}>슈니만 사용할 수 있는 기능입니다. <br />
                아래에 학번과 전화번호를 입력하여 로그인 해주세요.</p>

            {/* 학번 */}
            <p className={styles.label}>학번</p>

            <div
                className={`${styles.inputContainer} ${studentIdEmptyError || studentIdFormatError || loginError
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

            {/* 전화번호 */}
            <p className={styles.label}>전화번호</p>

            <div
                className={`${styles.inputContainer} ${phoneEmptyError || phoneFormatError || loginError
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

            {loginError && (
                <div className={styles.errorRow}>
                    <img src={ErrorIcon} alt="에러" />

                    <p className={styles.errorText}>
                        등록되지 않은 학번이거나, 학번 또는 전화번호가 틀렸습니다.
                    </p>
                </div>
            )}

            <button
                className={styles.submitButton}
                onClick={() => {
                    setSubmitted(true);

                    const hasError =
                        studentId.trim() === "" ||
                        !/^\d{10}$/.test(studentId) ||
                        phone.trim() === "" ||
                        phone.includes("-");

                    if (!hasError) {
                        setLoginError(true);
                    } else {
                        setLoginError(false);
                    }
                }}
            >
                <img
                    src={LoginButton}
                    alt="로그인 버튼"
                />
            </button>

            <div className={styles.divider}>
                <span className={styles.dividerText}>처음 접속하시나요?</span>
            </div>

            <button
                className={styles.submitButton}
                onClick={() => { navigate("/signup"); }}
            >
                <img
                    src={SignupButton}
                    alt="회원가입 버튼"
                />
            </button>

        </div>
    );
}