import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";
import { NewGame, Game, EndGame } from "@/screens";

import styles from "./CurrentScreen.module.scss";

function CurrentScreen() {
  const { currentScreen, gameResult } = useContext(GameContext);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "New Game":
        return <NewGame />;
      case "Game":
        return <Game />;
      case "End Game":
        return <EndGame />;
      default:
        return <NewGame />;
    }
  };

  return (
    <div className={`${styles.container} ${styles[gameResult]}`}>
      {renderCurrentScreen()}
    </div>
  );
}

export default CurrentScreen;
