import { OptionData } from "../../types/forms/forms";
import Label from "./Label";

interface FormMultiSelectInputProps {
  name: string;
  value: number[];
  options: OptionData[];
  onChange: (newValue: number[]) => void;
  label?: string;
}

const FormMultiSelectInput: React.FC<FormMultiSelectInputProps> = ({
  name,
  label,
  value,
  options,
  onChange,
}: FormMultiSelectInputProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={name}>
          <p className="text-base">{label}</p>
        </Label>
      )}

      {options.map((option) => (
        <div className="flex items-center mb-4">
          <input
            id={option.value + option.id}
            type="checkbox"
            checked={value.includes(option.id)}
            className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
            onClick={() => {
              if (value.includes(option.id)) {
                onChange(value.filter((num) => num !== option.id));
              } else {
                onChange([...value, option.id]);
              }
            }}
          />

          <label
            htmlFor={option.value + option.id}
            className="text-sm font-medium text-gray-900 ms-2"
          >
            {option.value}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FormMultiSelectInput;
