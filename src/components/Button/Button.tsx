import styles from "./Button.module.scss";

type Button = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLight?: boolean;
  disabled?: boolean;
  className?: string;
};

function Button({
  text,
  onClick,
  type = "button",
  className = "",
  isLight = false,
  disabled = false,
  ...rest
}: Button) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${isLight && styles.btnLight} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;
