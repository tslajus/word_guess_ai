import haikus from "../../data/haikus.json";
import { fetchHaiku } from "../../api";
import { useContext, useState } from "react";
import { useGameStateSetter } from "../../hooks";
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
    isLoading,
    setIsLoading,
  } = useContext(GameContext);

  const { gameStateSetter, errorStateSetter } = useGameStateSetter(
    setCurrentHaiku,
    setGameResult,
    setCurrentScreen
  );

  const [questionInputValue, setQuestionInputValue] = useState("");
  const [guessInputValue, setGuessInputValue] = useState("");

  const handleAsk = async () => {
    if (movesCount <= 0) {
      setCurrentHaiku(extractRandomString(haikus.noMoves));
    } else {
      setMovesCount(movesCount - 1);

      const answer = await fetchHaiku(
        "question",
        secretWord,
        setIsLoading,
        undefined,
        questionInputValue
      );

      if (answer === "Error") {
        errorStateSetter();
      } else {
        setCurrentHaiku(answer);
      }
    }
  };

  const handleGuess = async () => {
    const result = await fetchHaiku(
      "result",
      secretWord,
      setIsLoading,
      guessInputValue
    );

    if (result === "Error") {
      errorStateSetter();
    } else {
      if (stringCleaner(result) === "yes") {
        const winHaiku = await fetchHaiku("win", secretWord, setIsLoading);

        if (winHaiku === "Error") {
          errorStateSetter();
        } else {
          gameStateSetter(winHaiku, "win", "End Game");
        }
      } else {
        const loseHaiku = await fetchHaiku(
          "lose",
          secretWord,
          setIsLoading,
          guessInputValue
        );

        if (loseHaiku === "Error") {
          errorStateSetter();
        } else {
          gameStateSetter(loseHaiku, "lose", "End Game");
        }
      }
    }
  };

  const handleNewGame = () => {
    setCurrentScreen("New Game");
  };

  const handleSurrender = async () => {
    const surrenderHaiku = await fetchHaiku(
      "surrender",
      secretWord,
      setIsLoading
    );

    if (surrenderHaiku === "Error") {
      errorStateSetter();
    } else {
      gameStateSetter(surrenderHaiku, "lose", "End Game");
    }
  };

  return (
    <div>
      <p>{gameResult}</p>
      <p>Theme: {selectedTheme.toLocaleUpperCase()}</p>
      <p>Moves left: {movesCount}</p>
      <HaikuCard />
      {isLoading && <p>Writing</p>}

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
