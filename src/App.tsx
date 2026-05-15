import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { saveRecentPage } from "./api/saveRecentPage";
import HomeBooth from "../src/pages/home/HomeBooth";
import SignUp from "../src/pages/apply/SignUp";
import Login from "../src/pages/apply/Login";
import Frame from "../src/pages/frame/Frame";
import Certificate from "../src/pages/certificate/Certificate";
import CertificateUpload from "../src/pages/certificate/CertificateUpload";
import CertificateEdit from "./pages/certificate/CertificateEdit";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    saveRecentPage(location.pathname);
  }, [location.pathname]);

  return (
    <>

      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomeBooth />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        <Route path="frame" element={<Frame />} />

        <Route path="certificate" element={<Certificate />} />
        <Route path="certificate/upload" element={<CertificateUpload />} />
        <Route path="certificate/edit/:id" element={<CertificateEdit />} />

      </Routes>
    </>
  );
};

export default App;