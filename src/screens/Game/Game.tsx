import { useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { handleInputChange, handleSubmit } from "../../helpers";

function Game() {
  const {
    setCurrentScreen,
    secretWord,
    movesCount,
    setMovesCount,
    setGuessedWord,
  } = useContext(GameContext);

  const [renderedMessage, setRenderedMessage] = useState("Game");
  const [questionInputValue, setQuestionInputValue] = useState("");
  const [guessInputValue, setGuessInputValue] = useState("");

  const handleNewGame = () => {
    setCurrentScreen("New Game");
  };

  const handleSurrender = () => {
    setCurrentScreen("Lose Game");
  };

  const handleAsk = () => {
    if (movesCount <= 0) {
      setRenderedMessage("You have no more moves left, time to guess");
    } else {
      setMovesCount(movesCount - 1);
      setRenderedMessage(questionInputValue);
    }
  };

  const handleGuess = () => {
    setGuessedWord(guessInputValue);
    if (guessInputValue === secretWord) {
      setCurrentScreen("Win Game");
    } else {
      setCurrentScreen("Lose Game");
    }
  };

  return (
    <div>
      <p>Moves left: {movesCount}</p>
      <h1>{renderedMessage}</h1>
      <h2>Secret word is: {secretWord}</h2>

      <form onSubmit={(e) => handleSubmit(e, handleAsk)}>
        <input
          type="text"
          value={questionInputValue}
          onChange={(e) => handleInputChange(e, setQuestionInputValue)}
        />
        <button type="submit">Ask</button>
      </form>
      <br />

      <form onSubmit={(e) => handleSubmit(e, handleGuess)}>
        <input
          type="text"
          value={guessInputValue}
          onChange={(e) => handleInputChange(e, setGuessInputValue)}
        />
        <button type="submit">Guess</button>
      </form>
      <br />

      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleSurrender}>Surrender</button>
    </div>
  );
}

export default Game;
