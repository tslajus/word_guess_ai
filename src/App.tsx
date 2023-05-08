import { useContext } from "react";
import { GameContext } from "./contexts/GameContext";
import { CurrentScreen } from "./screens";

import "./App.scss";

function App() {
  const { gameResult } = useContext(GameContext);

  return (
    <div className={`background--${gameResult}`}>
      <CurrentScreen />
    </div>
  );
}

export default App;
