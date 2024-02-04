import { TextareaInputData } from "../../../types/forms/forms";
import FormTextAreaInput from "../FormTextAreaInput";

interface Props {
  component: TextareaInputData;
  value: string;
  onChange: (newValue: string) => void;
}

const TextAreaInput: React.FC<Props> = ({ component, value, onChange }) => {
  return <FormTextAreaInput name={component.id.toString()} value={value} onChange={onChange} label={component.title} />;
};

export default TextAreaInput;
