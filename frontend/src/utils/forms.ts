import {
  MultiselectInputData,
  SelectInputData,
  TextInputData,
  TextareaInputData,
  FormData,
} from "../types/forms/forms";

export const createFormData = (): FormData => {
  return {
    title: "",
    description: "",
    components: [],
    meta: {
      nextId: 1,
    },
  };
};

export const createTextInputData = (nextId: number): TextInputData => {
  return {
    id: nextId,
    type: "text",
    title: "",
  };
};

export const createTextareaInputData = (nextId: number): TextareaInputData => {
  return {
    id: nextId,
    type: "multiline",
    title: "",
  };
};

export const createSelectInputData = (nextId: number): SelectInputData => {
  return {
    id: nextId,
    type: "select",
    title: "",
    options: [],
  };
};

export const createMultiselectInputData = (
  nextId: number
): MultiselectInputData => {
  return {
    id: nextId,
    type: "multiselect",
    title: "",
    options: [],
  };
};

// export const createDateInputData = (nextId: number): DateInputData => {
//   return {
//     id: nextId,
//     type: "date",
//     title: "",
//   };
// };

export const createOptionData = (nextId: number) => {
  return {
    id: nextId,
    value: "",
  };
};
