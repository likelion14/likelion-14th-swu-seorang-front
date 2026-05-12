import { Routes, Route } from "react-router-dom";
import HomeBooth from "../src/pages/home/HomeBooth"; 
import SignUp from "../src/pages/apply/SignUp"; 
import Login from "../src/pages/apply/Login"; 
import Frame from "../src/pages/frame/Frame"; 

const App = () => {
  return (
    <>

      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomeBooth />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        <Route path="frame" element={<Frame />} />

      </Routes>
    </>
  );
};

export default App;