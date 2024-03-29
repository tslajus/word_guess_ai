import haikus from "@/data/haikus.json";
import { useState, useContext } from "react";
import { GameContext } from "@/contexts/GameContext";
import { extractRandomString } from "@/helpers";
import { Header, Levels, Button, Selection } from "@/components";

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

      <div className={styles.title}>
        <span>New</span>
        <span>Game</span>
      </div>

      <Levels
        levels={levels}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />

      <div className={styles["theme-label"]}>THEME:</div>

      <Selection
        className={styles.themes}
        options={themeOptions}
        value={newSelectedTheme}
        onChange={handleThemeChange}
      />

      <Button
        className={styles["start-btn"]}
        text="start"
        onClick={handleStart}
      />
      {isGameOn && (
        <Button
          className={styles["cancel-btn"]}
          text="cancel"
          isLight
          onClick={handleCancel}
        />
      )}
    </>
  );
}

export default NewGame;
