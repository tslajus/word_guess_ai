export const extractRandomString = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};
