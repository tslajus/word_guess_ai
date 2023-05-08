import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { NewGame, Game, EndGame } from "../";

function CurrentScreen() {
  const { currentScreen } = useContext(GameContext);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "New Game":
        return <NewGame />;
      case "Game":
        return <Game />;
      case "End Game":
        return <EndGame />;
      default:
        return <NewGame />;
    }
  };

  return <>{renderCurrentScreen()}</>;
}

export default CurrentScreen;
