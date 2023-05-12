import difficulties from "@/data/difficulties.json";
import haikus from "@/data/haikus.json";
import listOfWords from "@/data/secretWords.json";
import { useState, createContext } from "react";
import { extractRandomString } from "@/helpers";

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
  currentHaiku: "",
  setCurrentHaiku: () => {},
  isGameOn: false,
  setIsGameOn: () => {},
  levels: difficulties,
  selectedTheme: "",
  setSelectedTheme: () => {},
  gameResult: "none",
  setGameResult: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

const GameContext = createContext<GameContextType>(initialValues);

const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState("New Game");
  const [secretWord, setSecretWord] = useState("cat");
  const [wordList, setWordList] = useState<string[]>([]);
  const [movesCount, setMovesCount] = useState(initialValues.levels.easy);
  const [selectedTheme, setSelectedTheme] = useState("Random");
  const [gameResult, setGameResult] = useState("none");
  const [currentHaiku, setCurrentHaiku] = useState(
    extractRandomString(haikus.newGame)
  );
  const [isGameOn, setIsGameOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetIsGameOn = (value: boolean) => {
    setIsGameOn(value);
    if (!value) {
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
    isLoading,
    setIsLoading,
  };

  return (
    <GameContext.Provider value={sharedValues}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
