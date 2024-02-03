import { TextareaInputData } from "../../../types/forms/forms";
import Label from "../Label";

interface Props {
  component: TextareaInputData;
  value: string;
  onChange: (newValue: string) => void;
}

const TextAreaInput: React.FC<Props> = ({ component, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={component.id.toString()}>
        <p className="text-base">{component.title}</p>
      </Label>
      <textarea
        name={component.id.toString()}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
        rows={4}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-primary-200 rounded-2xl border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer"
      />
    </div>
  );
};

export default TextAreaInput;
