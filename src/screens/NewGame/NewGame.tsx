import haikus from "../../data/haikus.json";
import { useState, useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { extractRandomString } from "../../helpers";
import { Button, Selection } from "../../components";

import styles from "./NewGame.module.scss";

function NewGame() {
  const {
    setCurrentScreen,
    setSecretWord,
    setWordList,
    allWordLists,
    randomWordList,
    setCurrentHaiku,
    isGameOn,
    setIsGameOn,
    levels,
    setMovesCount,
    selectedTheme,
    setSelectedTheme,
  } = useContext(GameContext);
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const handleStart = () => {
    let selectedWordList =
      selectedTheme === "random" ? randomWordList : allWordLists[selectedTheme];
    setWordList(selectedWordList);
    setSecretWord(extractRandomString(selectedWordList));
    setCurrentHaiku(extractRandomString(haikus.newGame));
    setMovesCount(levels[selectedLevel]);
    setIsGameOn(true);
    setCurrentScreen("Game");
  };

  const handleCancel = () => {
    setCurrentScreen("Game");
  };

  const themeOptions = [
    { value: "random", label: "random" },
    ...Object.keys(allWordLists).map((theme) => ({
      value: theme,
      label: theme,
    })),
  ];

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
  };

  return (
    <>
      <div className={styles.backdrop} />
      <header className={styles.header}>New Game</header>

      <div className={styles.levels}>
        {Object.keys(levels).map((level) => (
          <Button
            key={level}
            className={level === selectedLevel ? styles.active : ""}
            text={level}
            onClick={() => setSelectedLevel(level)}
          />
        ))}
      </div>

      <div className={styles.themeLabel}>Theme:</div>

      <Selection
        className={styles.themes}
        options={themeOptions}
        value={selectedTheme}
        onChange={handleThemeChange}
      />

      <Button className={styles.startBtn} text="start" onClick={handleStart} />
      {isGameOn && (
        <Button
          className={styles.cancelBtn}
          text="cancel"
          isLight
          onClick={handleCancel}
        />
      )}
    </>
  );
}

export default NewGame;
