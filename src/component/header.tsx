import logo from "../assets/icon/Lion-Logo.svg";
import userIcon from "../assets/icon/User-icon.svg";
import "../component/header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <img src={userIcon} alt="user" className="user" />
    </header>
  );
}