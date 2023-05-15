import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";
import { CurrentScreen } from "./screens";
import { Logo } from "./components";

import styles from "./App.module.scss";

function App() {
  const { gameResult } = useContext(GameContext);

  return (
    <div className={`${styles.background} ${styles[gameResult]}`}>
      <Logo />
      <CurrentScreen />
    </div>
  );
}

export default App;
