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
  changeScreen: (screen: string) => void;
  secretWord: string;
  setSecretWord: (word: string) => void;
  theme: string[];
  setTheme: (theme: string[]) => void;
  allThemes: Themes;
  generalTheme: string[];
  movesCount: number;
  setMovesCount: (count: number) => void;
  levels: Levels;
  guessedWord: string;
  setGuessedWord: (word: string) => void;
  isGameOn: boolean;
  setIsGameOn: Dispatch<SetStateAction<boolean>>;
};

type GameContextProviderProps = {
  children: ReactNode;
};
