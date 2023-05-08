import haikus from "../../data/haikus.json";
import { useState, useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { extractRandomString, handleInputChange } from "../../helpers";

function NewGame() {
  const {
    setCurrentScreen,
    setSecretWord,
    setWordList,
    allWordLists,
    generalWordList,
    setCurrentHaiku,
    isGameOn,
    setIsGameOn,
    levels,
    setMovesCount,
    selectedTheme,
    setSelectedTheme,
    gameResult,
  } = useContext(GameContext);
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const handleStart = () => {
    let selectedWordList =
      selectedTheme === "general"
        ? generalWordList
        : allWordLists[selectedTheme];
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

  return (
    <div>
      <p>{gameResult}</p>
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
        {Object.keys(allWordLists).map((theme) => (
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
