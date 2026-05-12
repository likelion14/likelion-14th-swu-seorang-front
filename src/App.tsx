import { Routes, Route } from "react-router-dom";
import HomeBooth from "../src/pages/home/HomeBooth"; 
import SignUp from "../src/pages/apply/SignUp"; 

const App = () => {
  return (
    <>

      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomeBooth />} />

        <Route path="signup" element={<SignUp />} />

      </Routes>
    </>
  );
};

export default App;