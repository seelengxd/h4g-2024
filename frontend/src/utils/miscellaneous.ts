export const pluraliseWord = (singularWord: string, count: number, pluralWord?: string): string => {
  if (count === 1) return singularWord;
  return pluralWord === undefined ? singularWord + 's' : pluralWord;
}