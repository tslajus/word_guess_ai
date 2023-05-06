import listOfWords from "../data/secretWords.json";
import difficulties from "../data/difficulties.json";
import { useState, createContext } from "react";

const initialValues: GameContextType = {
  currentScreen: "Error",
  setCurrentScreen: () => {},
  changeScreen: () => {},
  secretWord: "",
  setSecretWord: () => {},
  movesCount: 0,
  setMovesCount: () => {},
  theme: [],
  setTheme: () => {},
  allThemes: listOfWords,
  generalTheme: Object.values(listOfWords).flat(),
  isGameOn: false,
  setIsGameOn: () => {},
  guessedWord: "",
  setGuessedWord: () => {},
  levels: difficulties,
};

const GameContext = createContext<GameContextType>(initialValues);

const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState("New Game");
  const [secretWord, setSecretWord] = useState("cat");
  const [theme, setTheme] = useState(initialValues.generalTheme);
  const [movesCount, setMovesCount] = useState(initialValues.levels.easy);
  const [guessedWord, setGuessedWord] = useState("");
  const [isGameOn, setIsGameOn] = useState(false);

  const changeScreen = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleSetIsGameOn = (value: boolean) => {
    setIsGameOn(value);
    if (!value) {
      setTheme(initialValues.generalTheme);
      setSecretWord("");
      setGuessedWord("");
    }
  };

  const sharedValues: GameContextType = {
    ...initialValues,
    secretWord,
    setSecretWord,
    movesCount,
    setMovesCount,
    theme,
    setTheme,
    currentScreen,
    setCurrentScreen,
    changeScreen,
    guessedWord,
    setGuessedWord,
    isGameOn,
    setIsGameOn: handleSetIsGameOn,
  };

  return (
    <GameContext.Provider value={sharedValues}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
