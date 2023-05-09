import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { renderHaiku } from "../../helpers";

function HaikuCard() {
  const { currentHaiku } = useContext(GameContext);

  return (
    <div>
      {renderHaiku(currentHaiku).map((line, index) => (
        <h5 key={index}>{line}</h5>
      ))}
    </div>
  );
}

export default HaikuCard;
