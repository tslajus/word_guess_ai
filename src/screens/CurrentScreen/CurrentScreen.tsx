import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { NewGame, Game, EndGame, Error } from "../";

function CurrentScreen() {
  const { currentScreen } = useContext(GameContext);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "New Game":
        return <NewGame />;
      case "Game":
        return <Game />;
      case "Win Game":
        return <EndGame win={true} />;
      case "Lose Game":
        return <EndGame />;
      case "Error":
        return <Error />;
      default:
        return <Error />;
    }
  };

  return <>{renderCurrentScreen()}</>;
}

export default CurrentScreen;
