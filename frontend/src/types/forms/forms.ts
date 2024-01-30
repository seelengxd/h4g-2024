interface InputBase {
  id: number;
  title: string;
}

export interface OptionData {
  id: number;
  value: string;
  deleted?: boolean;
}

export interface TextInputData extends InputBase {
  type: "text";
}

export interface TextareaInputData extends InputBase {
  type: "multiline";
}

export interface SelectInputData extends InputBase {
  type: "select";
  options: OptionData[];
}

export interface MultiselectInputData extends InputBase {
  type: "multiselect";
  options: OptionData[];
}
export interface DateInputData extends InputBase {
  type: "date";
}

export type InputType =
  | "text"
  | "multiline"
  | "select"
  | "multiselect"
  | "date";

export type InputData =
  | TextInputData
  | TextareaInputData
  | SelectInputData
  | MultiselectInputData
  | DateInputData;

export interface FormData {
  id?: number;
  title: string;
  description: string;

  meta: {
    nextId: number;
  };

  components: InputData[];
}
