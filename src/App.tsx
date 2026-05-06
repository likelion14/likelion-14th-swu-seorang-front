import { Routes, Route } from "react-router-dom";
import HomeBooth from "../src/pages/home/HomeBooth"; 


const App = () => {
  return (
    <>

      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomeBooth />} />

      </Routes>
    </>
  );
};

export default App;