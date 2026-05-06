import { Link } from "react-router-dom";
import logo from "../assets/icon/Lion-Logo.svg";
import userIcon from "../assets/icon/User-icon.svg";
import "../component/header.css";

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <img src={logo} alt="logo" className="logo" />
            </Link>
            <img src={userIcon} alt="user" className="user" />
        </header>
    );
}