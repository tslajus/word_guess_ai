import { Button } from "@/components";
import styles from "./Levels.module.scss";

type LevelsProps = {
  levels: { [key: string]: number };
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
};

function Levels({ levels, selectedLevel, setSelectedLevel }: LevelsProps) {
  return (
    <div className={styles.levels}>
      {Object.keys(levels).map((level) => (
        <Button
          key={level}
          className={level === selectedLevel ? styles.active : ""}
          text={level}
          onClick={() => setSelectedLevel(level)}
        />
      ))}
    </div>
  );
}

export default Levels;
