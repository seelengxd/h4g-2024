import { Answer } from "../types/enrollmentForms/submissions";
import {
  MultiselectInputData,
  SelectInputData,
  TextInputData,
  TextareaInputData,
  FormData,
  InputData,
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

export const createOptionData = (nextId: number) => {
  return {
    id: nextId,
    value: "",
  };
};

export const generateDefaultAnswer = (component: InputData): Answer => {
  switch (component.type) {
    case "text":
    case "multiline":
      return {
        questionId: component.id,
        value: "",
      };
    case "select":
      return { questionId: component.id, value: component.options[0]!.id };
    case "multiselect":
      return { questionId: component.id, value: [] };
  }
};
