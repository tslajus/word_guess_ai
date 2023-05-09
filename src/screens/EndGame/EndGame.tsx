import haikus from "../../data/haikus.json";
import { useContext } from "react";
import { useGameStateSetter } from "../../hooks";
import { GameContext } from "../../contexts/GameContext";
import { extractRandomString } from "../../helpers";
import { HaikuCard } from "../../components";

function EndGame() {
  const {
    setCurrentScreen,
    setIsGameOn,
    setCurrentHaiku,
    gameResult,
    setGameResult,
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
    <div>
      <p>{gameResult}</p>

      <HaikuCard />

      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}

export default EndGame;
