import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/icon/Lion-Logo.svg";
import userIcon from "../assets/icon/User-icon.svg";
import "../component/header.css";
import CancelButton from "../assets/icon/Btn/Modal-Back.png";
import LogoutButton from "../assets/icon/Btn/Modal-Logout.png";
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
                    type="로그아웃"
                    title="로그아웃 할까요?"
                    description="로그아웃을 원하지 않는 경우 '돌아가기' 버튼을 눌러주세요."

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