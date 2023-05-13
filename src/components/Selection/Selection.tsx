import { useState, useRef, useEffect } from "react";

import styles from "./Selection.module.scss";

type SelectionOption = { value: string; label: string };

type CustomSelectionProps = {
  options: SelectionOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

function CustomSelection({
  options,
  value,
  className = "",
  onChange,
}: CustomSelectionProps) {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setShowOptions(false);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className={className} ref={containerRef}>
      <div
        className={`${styles.selector} ${showOptions && styles.selectorOpen}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <input
          className={styles.selectedValue}
          value={selectedLabel?.toLocaleUpperCase() || ""}
          readOnly
        />
        <div className={`${styles.arrow} ${showOptions && styles.arrowDown}`} />
      </div>

      {showOptions && (
        <div>
          {options
            .filter((option) => option.value !== value)
            .map((option) => (
              <div
                key={option.value}
                className={styles.option}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelection;
