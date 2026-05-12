import Header from "../../component/header";
import Tab from "../../component/Tab";
import styles from "../frame/Frame.module.css";

export default function Frame() {
  return (
    <div className={styles.container}>
      <Header />
      <Tab />
    </div>
  );
}