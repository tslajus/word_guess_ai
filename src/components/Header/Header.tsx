import { ReactNode } from "react";
import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";

import styles from "./Header.module.scss";

type HeaderProps = {
  children: ReactNode;
  isCentered?: boolean;
};

function Header({ children, isCentered = false }: HeaderProps) {
  const { gameResult } = useContext(GameContext);

  return (
    <header
      className={`${styles.header} ${isCentered && styles.centered} ${
        styles[gameResult]
      }`}
    >
      {children}
    </header>
  );
}

export default Header;
