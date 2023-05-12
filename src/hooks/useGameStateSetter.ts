import haikus from "@/data/haikus.json";
import { extractRandomString } from "@/helpers";

const useGameStateSetter = (
  haikuHandler: (haiku: string) => void,
  resultHandler: (result: GameResult) => void,
  screenHandler: (screen: string) => void
) => {
  const gameStateSetter = (
    haiku: string,
    result: GameResult,
    screen: string
  ) => {
    haikuHandler(haiku);
    resultHandler(result);
    screenHandler(screen);
  };

  const errorStateSetter = () => {
    gameStateSetter(extractRandomString(haikus.error), "error", "End Game");
  };

  return { gameStateSetter, errorStateSetter };
};

export default useGameStateSetter;
