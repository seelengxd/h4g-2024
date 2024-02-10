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

export interface Option {
  value: number | string;
  label: number | string;
}

type GenericEnum = { [k: number | string]: number | string };

export const generateEnumFormOptions = (
  formEnum: GenericEnum,
  enumLabels: Record<number | string, string>
): Option[] => {
  return Object.values(formEnum).map((enumVal) => ({
    value: enumVal,
    label: enumLabels[enumVal],
  }));
};

export interface NamedObject {
  id: number;
  name: string | number;
}

export const generateOptionsFromObject = (objs: NamedObject[]): Option[] => {
  return objs.map((obj) => ({ value: obj.id, label: obj.name }));
};
