import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

type EndGameProps = {
  win?: boolean;
};

function EndGame({ win = false }: EndGameProps) {
  const { setCurrentScreen, secretWord, setIsGameOn } = useContext(GameContext);

  const handleNewGame = () => {
    setCurrentScreen("New Game");
    setIsGameOn(false);
  };

  const renderedMsg = (
    <h1>
      {win
        ? `You have won! The secret word was ${secretWord.toLocaleUpperCase()}`
        : `You Have lost... The secret word was ${secretWord.toLocaleUpperCase()}`}
    </h1>
  );

  return (
    <div>
      {renderedMsg}

      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}

export default EndGame;
