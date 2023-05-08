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

type GameContextType = {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  secretWord: string;
  setSecretWord: (word: string) => void;
  wordList: string[];
  setWordList: (theme: string[]) => void;
  allWordLists: Themes;
  generalWordList: string[];
  movesCount: number;
  setMovesCount: (count: number) => void;
  levels: Levels;
  isGameOn: boolean;
  setIsGameOn: Dispatch<SetStateAction<boolean>>;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  currentHaiku: string;
  setCurrentHaiku: (haiku: string) => void;
  gameResult: "win" | "lose" | "none" | "error";
  setGameResult: (result: "win" | "lose" | "none" | "error") => void;
};

type GameContextProviderProps = {
  children: ReactNode;
};
