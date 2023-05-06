export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setInputValue(e.target.value);
};

export const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  action: () => void
) => {
  e.preventDefault();
  action();
};
