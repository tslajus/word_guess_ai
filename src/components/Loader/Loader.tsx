import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.text}>Writing</span>
    </div>
  );
}

export default Loader;
