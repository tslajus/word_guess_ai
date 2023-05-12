import haikus from "../../data/haikus.json";
import { fetchHaiku } from "../../api";
import { useContext, useState } from "react";
import { useGameStateSetter } from "../../hooks";
import { GameContext } from "../../contexts/GameContext";
import { stringCleaner, extractRandomString } from "../../helpers";
import { Header, HaikuCard, Form, Button, Loader } from "../../components";

import styles from "./Game.module.scss";

function Game() {
  const {
    setCurrentScreen,
    secretWord,
    movesCount,
    setMovesCount,
    selectedTheme,
    setCurrentHaiku,
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
        console.log(answer);
        console.log(secretWord);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header>
        <p>Theme: {selectedTheme.toUpperCase()}</p>
        <p>Moves left: {movesCount}</p>
      </Header>

      <HaikuCard />

      <div className={styles.backdrop} />
      <div className={styles.form}>
        <Form
          onSubmit={handleAsk}
          inputValue={questionInputValue}
          onInputChange={setQuestionInputValue}
          submitText="ask"
          placeholder="Ask for a revealing clue"
        />

        <Form
          onSubmit={handleGuess}
          inputValue={guessInputValue}
          onInputChange={setGuessInputValue}
          submitText="guess"
          placeholder="Guess the secret word"
        />

        <div className={styles.buttons}>
          <Button text="new game" onClick={handleNewGame} />
          <Button text="surrender" onClick={handleSurrender} />
        </div>
      </div>
    </>
  );
}

export default Game;
