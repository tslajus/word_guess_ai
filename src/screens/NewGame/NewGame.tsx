import haikus from "@/data/haikus.json";
import { useState, useContext } from "react";
import { GameContext } from "@/contexts/GameContext";
import { extractRandomString } from "@/helpers";
import { Header, Button, Selection } from "@/components";

import styles from "./NewGame.module.scss";

function NewGame() {
  const {
    setCurrentScreen,
    setSecretWord,
    setWordList,
    allWordLists,
    setCurrentHaiku,
    isGameOn,
    setIsGameOn,
    levels,
    setMovesCount,
    selectedTheme,
    setSelectedTheme,
  } = useContext(GameContext);
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [newSelectedTheme, setNewSelectedTheme] = useState(selectedTheme);

  const handleStart = () => {
    let selectedThemeName =
      newSelectedTheme === "Random"
        ? extractRandomString(Object.keys(allWordLists))
        : newSelectedTheme;
    let selectedWordList = allWordLists[selectedThemeName];
    setWordList(selectedWordList);
    setSecretWord(extractRandomString(selectedWordList));
    setCurrentHaiku(extractRandomString(haikus.newGame));
    setMovesCount(levels[selectedLevel]);
    setIsGameOn(true);
    setCurrentScreen("Game");
    setSelectedTheme(selectedThemeName);
  };

  const handleCancel = () => {
    setCurrentScreen("Game");
  };

  const themeOptions = [
    { value: "Random", label: "Random" },
    ...Object.keys(allWordLists).map((theme) => ({
      value: theme,
      label: theme,
    })),
  ];

  const handleThemeChange = (value: string) => {
    setNewSelectedTheme(value);
  };

  return (
    <>
      <div className={styles.backdrop} />
      <Header isCentered>Guess The Secret Word Through Haiku Riddles</Header>

      <div className={styles.title}>NEW GAME</div>

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

      <div className={styles.themeLabel}>THEME:</div>

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
