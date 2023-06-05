import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";
import { renderHaiku } from "@/helpers";

import styles from "./HaikuCard.module.scss";

function HaikuCard() {
  const { currentHaiku, gameResult } = useContext(GameContext);

  return (
    <div className={styles.container}>
      {renderHaiku(currentHaiku).map((line, index) => (
        <h5
          className={`${styles.row} ${styles[`row--${gameResult}`]}`}
          key={index}
        >
          {line}
        </h5>
      ))}
    </div>
  );
}

export default HaikuCard;
