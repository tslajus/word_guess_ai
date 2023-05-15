import { FormEvent, ChangeEvent, useState } from "react";
import { Button } from "@/components";

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
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setInputError(true);
    } else {
      setInputError(false);
      onSubmit();
      onInputChange("");
    }
  };

  return (
    <form
      className={`${styles.form} ${inputError ? styles.error : ""}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        maxLength={30}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputError(false);
          onInputChange(e.target.value);
        }}
      />
      <Button type="submit" text={submitText} />
    </form>
  );
}

export default Form;
