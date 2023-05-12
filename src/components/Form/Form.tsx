import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Button } from "../";

import styles from "./Form.module.scss";

type Form = {
  onSubmit: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  submitText: string;
  placeholder?: string;
};

function Form({
  onSubmit,
  inputValue,
  onInputChange,
  submitText,
  placeholder = "",
}: Form) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

  useEffect(() => {
    setCurrentPlaceholder(placeholder);
  }, [placeholder]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
    onInputChange("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        placeholder={currentPlaceholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onInputChange(e.target.value)
        }
      />
      <Button type="submit" text={submitText} />
    </form>
  );
}

export default Form;
