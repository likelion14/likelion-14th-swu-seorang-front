import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/icon/Lion-Logo.svg";
import userIcon from "../assets/icon/User-icon.svg";
import "../component/header.css";
import CancelButton from "../assets/icon/Btn/Modal-Back.svg";
import LogoutButton from "../assets/icon/Btn/Modal-Login.svg";
import "../component/header.css";
import ConfirmModal from "./Modal";

export default function Header() {
    const navigate = useNavigate();

    const [showModal, setShowModal] =
        useState(false);

    const accessToken =
        localStorage.getItem("accessToken");

    const handleUserClick = () => {
        if (!accessToken) {
            navigate("/login");
            return;
        }
        setShowModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        setShowModal(false);

        navigate("/login");
    };

    return (
        <>
            <header className="header">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <img
                    src={userIcon}
                    alt="user"
                    className="user"
                    onClick={handleUserClick}
                    style={{ cursor: "pointer" }}
                />

            </header>
            {showModal && (
                <ConfirmModal
                    title="로그아웃 하시겠습니까?"
                    description="로그아웃 시 다시 로그인해야 서비스를 이용할 수 있습니다."

                    cancelButtonImage={CancelButton}
                    confirmButtonImage={LogoutButton}

                    onCancel={() =>
                        setShowModal(false)
                    }

                    onConfirm={handleLogout}
                />
            )}
        </>


    );
}