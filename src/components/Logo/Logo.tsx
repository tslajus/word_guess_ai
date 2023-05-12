import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.logo}>
      <span>word</span>
      <span>guessing</span>
      <span>haiku</span>
    </div>
  );
}

export default Logo;
