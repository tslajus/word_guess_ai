import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

function Error() {
  const { setCurrentScreen, setIsGameOn } = useContext(GameContext);

  const handleRetry = () => {
    setIsGameOn(false);
    setCurrentScreen("New Game");
  };

  return (
    <div>
      <h1>Error</h1>
      <button onClick={handleRetry}>Try again</button>
    </div>
  );
}

export default Error;
