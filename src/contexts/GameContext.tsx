import listOfWords from "../data/secretWords.json";
import difficulties from "../data/difficulties.json";
import haikus from "../data/haikus.json";
import { useState, createContext } from "react";
import { extractRandomString } from "../helpers";

const initialValues: GameContextType = {
  currentScreen: "Error",
  setCurrentScreen: () => {},
  secretWord: "",
  setSecretWord: () => {},
  movesCount: 0,
  setMovesCount: () => {},
  wordList: [],
  setWordList: () => {},
  allWordLists: listOfWords,
  generalWordList: Object.values(listOfWords).flat(),
  currentHaiku: "",
  setCurrentHaiku: () => {},
  isGameOn: false,
  setIsGameOn: () => {},
  levels: difficulties,
  selectedTheme: "",
  setSelectedTheme: () => {},
  gameResult: "none",
  setGameResult: () => {},
};

const GameContext = createContext<GameContextType>(initialValues);

const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState("New Game");
  const [secretWord, setSecretWord] = useState("cat");
  const [wordList, setWordList] = useState(initialValues.generalWordList);
  const [movesCount, setMovesCount] = useState(initialValues.levels.easy);
  const [selectedTheme, setSelectedTheme] = useState("general");
  const [gameResult, setGameResult] = useState("none");
  const [currentHaiku, setCurrentHaiku] = useState(
    extractRandomString(haikus.newGame)
  );
  const [isGameOn, setIsGameOn] = useState(false);

  const handleSetIsGameOn = (value: boolean) => {
    setIsGameOn(value);
    if (!value) {
      setWordList(initialValues.generalWordList);
      setSecretWord("");
      setGameResult("none");
    }
  };

  const sharedValues: GameContextType = {
    ...initialValues,
    secretWord,
    setSecretWord,
    movesCount,
    setMovesCount,
    wordList,
    setWordList,
    currentScreen,
    setCurrentScreen,
    isGameOn,
    setIsGameOn: handleSetIsGameOn,
    selectedTheme,
    setSelectedTheme,
    currentHaiku,
    setCurrentHaiku,
    gameResult: gameResult as "win" | "lose" | "none" | "error",
    setGameResult,
  };

  return (
    <GameContext.Provider value={sharedValues}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
