export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setInputValue: (value: string) => void
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
