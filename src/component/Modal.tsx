import styles from "./Modal.module.css";
import CloseIcon from "../assets/icon/Btn/CloseButton.svg";

interface ConfirmModalProps {
    title: string;
    description: string;

    cancelButtonImage: string;
    confirmButtonImage: string;

    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmModal({
    title,
    description,
    cancelButtonImage,
    confirmButtonImage,
    onCancel,
    onConfirm,
}: ConfirmModalProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <button
                    className={styles.closeButton}
                    onClick={onCancel}
                >
                    <img
                        src={CloseIcon}
                        alt="닫기"
                    />
                </button>

                <p className={styles.title}>
                    {title}
                </p>

                <p className={styles.description}>
                    {description}
                </p>

                <div className={styles.buttonWrapper}>
                    <img
                        src={cancelButtonImage}
                        alt="취소"
                        className={styles.buttonImage}
                        onClick={onCancel}
                    />

                    <img
                        src={confirmButtonImage}
                        alt="확인"
                        className={styles.buttonImage}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    );
}