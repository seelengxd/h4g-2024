export const pluraliseWord = (
  singularWord: string,
  count: number,
  pluralWord?: string
): string => {
  if (count === 1) return singularWord;
  return pluralWord === undefined ? singularWord + "s" : pluralWord;
};

export const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};
