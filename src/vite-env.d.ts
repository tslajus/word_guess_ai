/// <reference types="vite/client" />

type Themes = {
  [key: string]: string[];
};

type Levels = {
  [key: string]: number;
  easy: number;
  normal: number;
  hard: number;
  expert: number;
};

type GameResult = "win" | "lose" | "none" | "error";

type GameContextType = {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  secretWord: string;
  setSecretWord: (word: string) => void;
  wordList: string[];
  setWordList: (theme: string[]) => void;
  allWordLists: Themes;
  movesCount: number;
  setMovesCount: (count: number) => void;
  levels: Levels;
  isGameOn: boolean;
  setIsGameOn: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  currentHaiku: string;
  setCurrentHaiku: (haiku: string) => void;
  gameResult: GameResult;
  setGameResult: (result: GameResult) => void;
};

type GameContextProviderProps = {
  children: ReactNode;
};
