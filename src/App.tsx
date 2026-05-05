import { Routes, Route } from "react-router-dom";
import Tab from "../src/component/Tab";
import HomeBooth from "../src/pages/home/HomeBooth"; 


const App = () => {
  return (
    <>
    <Tab />

      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomeBooth />} />

      </Routes>
    </>
  );
};

export default App;