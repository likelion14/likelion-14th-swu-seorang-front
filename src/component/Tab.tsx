import { NavLink } from "react-router-dom";
import "./Tab.css";

export default function Tab() {
  return (
    <div className="tab-container">
      <NavLink to="/" className="tab">
        부스안내
      </NavLink>

      <NavLink to="/performance" className="tab">
        공연안내
      </NavLink>

      <NavLink to="/certificate" className="tab">
        인증샷
      </NavLink>

      <NavLink to="/frame" className="tab">
        네컷프레임
      </NavLink>
    </div>
  );
}