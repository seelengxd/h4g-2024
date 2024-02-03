import { MultiselectInputData } from "../../../types/forms/forms";
import FormMultiSelectInput from "../FormMultiSelectInput";

interface Props {
  component: MultiselectInputData;
  value: number[];
  onChange: (newValue: number[]) => void;
}

const MultiSelectInput: React.FC<Props> = ({ component, value, onChange }) => {
  return (
    <FormMultiSelectInput
      name={component.id.toString()}
      label={component.title}
      options={component.options}
      value={value}
      onChange={onChange}
    />
  );
};

export default MultiSelectInput;
