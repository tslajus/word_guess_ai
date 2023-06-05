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

  let headerStart;
  let headerEnd;

  switch (gameResult) {
    case "win":
      headerStart = "You won!";
      headerEnd = `The secret word was ${secretWord.toLocaleUpperCase()}`;
      break;

    case "lose":
      headerStart = "You Lost!";
      headerEnd = `The secret word was ${secretWord.toLocaleUpperCase()}`;
      break;

    case "error":
      headerStart = "Error...";
      headerEnd = `Please try again!`;
      break;
  }

  return (
    <>
      <Header>
        <p>{headerStart}</p>
        <p>{headerEnd}</p>
      </Header>

      <HaikuCard />
      <Button
        className={styles.button}
        text="new game"
        isLight
        onClick={handleNewGame}
      />
    </>
  );
}

export default EndGame;
