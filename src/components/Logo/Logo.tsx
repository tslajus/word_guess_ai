import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.logo}>
      <span>WORD</span>
      <span>GUESSING</span>
      <span>HAIKU</span>
    </div>
  );
}

export default Logo;
