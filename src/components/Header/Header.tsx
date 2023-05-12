import { ReactNode } from "react";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

import styles from "./Header.module.scss";

function Header({ children }: { children: ReactNode }) {
  const { gameResult } = useContext(GameContext);

  return (
    <header className={`${styles.header} ${styles[gameResult]}`}>
      {children}
    </header>
  );
}

export default Header;
