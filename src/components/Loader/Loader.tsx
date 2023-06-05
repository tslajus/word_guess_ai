import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.text}>WRITING</span>
    </div>
  );
}

export default Loader;
