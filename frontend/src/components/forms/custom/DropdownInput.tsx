import ReactSelect from "react-select";
import { SelectInputData } from "../../../types/forms/forms";
import Label from "../Label";

interface Props {
  component: SelectInputData;
  value: number;
  onChange: (newValue: number) => void;
}

const DropdownInput: React.FC<Props> = ({ component, value, onChange }) => {
  const transformedOptions = component.options.map((option) => ({
    label: option.value,
    value: option.id,
  }));
  return (
    <div>
      <Label htmlFor={component.id.toString()}>
        <p className="text-base">{component.title}</p>
      </Label>
      <ReactSelect
        options={transformedOptions}
        value={transformedOptions.filter((option) => option.value === value)[0]}
        onChange={(option) => onChange(option!.value)}
      ></ReactSelect>
    </div>
  );
};

export default DropdownInput;
