import haikus from "../../data/haikus.json";
import { fetchHaiku } from "../../api";
import { useContext, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import {
  handleInputChange,
  handleSubmit,
  stringCleaner,
  extractRandomString,
} from "../../helpers";
import { HaikuCard } from "../../components";

function Game() {
  const {
    setCurrentScreen,
    secretWord,
    movesCount,
    setMovesCount,
    selectedTheme,
    setCurrentHaiku,
    gameResult,
    setGameResult,
  } = useContext(GameContext);

  const [questionInputValue, setQuestionInputValue] = useState("");
  const [guessInputValue, setGuessInputValue] = useState("");

  const handleNewGame = () => {
    setCurrentScreen("New Game");
  };

  const handleSurrender = async () => {
    const surrenderHaiku = await fetchHaiku("surrender", secretWord);

    if (surrenderHaiku === "Error") {
      setCurrentHaiku(extractRandomString(haikus.error));
      setGameResult("error");
      setCurrentScreen("End Game");
    } else {
      setCurrentHaiku(surrenderHaiku);
      setGameResult("lose");
      setCurrentScreen("End Game");
    }
  };

  const handleAsk = async () => {
    if (movesCount <= 0) {
      setCurrentHaiku(extractRandomString(haikus.noMoves));
    } else {
      setMovesCount(movesCount - 1);

      const answer = await fetchHaiku(
        "question",
        secretWord,
        undefined,
        questionInputValue
      );

      if (answer === "Error") {
        setCurrentHaiku(extractRandomString(haikus.error));
        setGameResult("error");
        setCurrentScreen("End Game");
      } else {
        setCurrentHaiku(answer);
      }
    }
  };

  const handleGuess = async () => {
    const result = await fetchHaiku("result", secretWord, guessInputValue);

    if (stringCleaner(result) === "yes") {
      const winHaiku = await fetchHaiku("win", secretWord);

      if (winHaiku === "Error") {
        setCurrentHaiku(extractRandomString(haikus.error));
        setGameResult("error");
        setCurrentScreen("End Game");
      } else {
        setCurrentHaiku(winHaiku);
        setGameResult("win");
        setCurrentScreen("End Game");
      }
    } else if (result === "Error") {
      setCurrentHaiku(extractRandomString(haikus.error));
      setGameResult("error");
      setCurrentScreen("End Game");
    } else {
      const loseHaiku = await fetchHaiku("lose", secretWord, guessInputValue);

      if (loseHaiku === "Error") {
        setCurrentHaiku(extractRandomString(haikus.error));
        setGameResult("error");
        setCurrentScreen("End Game");
      } else {
        setCurrentHaiku(loseHaiku);
        setGameResult("lose");
        setCurrentScreen("End Game");
      }
    }
  };

  return (
    <div>
      <p>{gameResult}</p>
      <p>Theme: {selectedTheme.toLocaleUpperCase()}</p>
      <p>Moves left: {movesCount}</p>
      <HaikuCard />

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
