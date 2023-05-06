import { useState, useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { extractRandomString, handleInputChange } from "../../helpers";

function NewGame() {
  const {
    setCurrentScreen,
    setSecretWord,
    setTheme,
    allThemes,
    generalTheme,
    isGameOn,
    setIsGameOn,
    levels,
    setMovesCount,
  } = useContext(GameContext);
  const [selectedTheme, setSelectedTheme] = useState("general");
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const handleStart = () => {
    let selectedWordList =
      selectedTheme === "general" ? generalTheme : allThemes[selectedTheme];
    setTheme(selectedWordList);
    setSecretWord(extractRandomString(selectedWordList));
    setMovesCount(levels[selectedLevel]);
    setIsGameOn(true);
    setCurrentScreen("Game");
  };

  const handleCancel = () => {
    setCurrentScreen("Game");
  };

  return (
    <div>
      <h1>New Game</h1>

      <select
        id="level-select"
        value={selectedLevel}
        onChange={(e) => handleInputChange(e, setSelectedLevel)}
      >
        {Object.keys(levels).map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select
        id="theme-select"
        value={selectedTheme}
        onChange={(event) => handleInputChange(event, setSelectedTheme)}
      >
        <option value="general">general</option>
        {Object.keys(allThemes).map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>

      <button onClick={handleStart}>Start</button>
      {isGameOn && <button onClick={handleCancel}>Cancel</button>}
    </div>
  );
}

export default NewGame;
