import haikus from "../../data/haikus.json";
import { useContext } from "react";
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

  const handleNewGame = () => {
    setCurrentHaiku(extractRandomString(haikus.newGame));
    setGameResult("none");
    setCurrentScreen("New Game");
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
