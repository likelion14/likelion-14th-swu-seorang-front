import { useState } from "react";
import Header from "../../component/header";
import Tab from "../../component/Tab";
import BoothTab from "../../component/BoothTab";

export default function HomeBooth() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderContent = () => {
    switch (currentIndex) {
      case 0:
        return <div>학과부스 컨텐츠</div>;
      case 1:
        return <div>푸드트럭 컨텐츠</div>;
      case 2:
        return <div>플리마켓 컨텐츠</div>;
      case 3:
        return <div>슈니네컷 컨텐츠</div>;
      default:
        return <div>학과부스 컨텐츠</div>;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header />

      <Tab />

      <BoothTab 
        currentIndex={currentIndex} 
        onIndexChange={setCurrentIndex} 
      />

      {renderContent()}
    </div>
  );
}