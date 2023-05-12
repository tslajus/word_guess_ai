import haikus from "@/data/haikus.json";
import { useContext } from "react";
import { useGameStateSetter } from "@/hooks";
import { GameContext } from "@/contexts/GameContext";
import { extractRandomString } from "@/helpers";
import { Header, HaikuCard, Button } from "@/components";

import styles from "./EndGame.module.scss";

function EndGame() {
  const {
    setCurrentScreen,
    setIsGameOn,
    setCurrentHaiku,
    gameResult,
    setGameResult,
    secretWord,
  } = useContext(GameContext);

  const { gameStateSetter } = useGameStateSetter(
    setCurrentHaiku,
    setGameResult,
    setCurrentScreen
  );

  const handleNewGame = () => {
    gameStateSetter(extractRandomString(haikus.newGame), "none", "NewGame");
    setIsGameOn(false);
  };

  return (
    <>
      <Header>
        <p>
          {gameResult === "win"
            ? "Congratulations!"
            : gameResult === "lose"
            ? `The secret word was ${secretWord.toLocaleUpperCase()}`
            : "An error occured, try again"}
        </p>
      </Header>

      <HaikuCard />
      <Button
        className={styles.button}
        text="new game"
        onClick={handleNewGame}
      />
    </>
  );
}

export default EndGame;
