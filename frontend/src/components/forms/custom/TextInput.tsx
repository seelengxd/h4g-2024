import { TextInputData } from "../../../types/forms/forms";
import Input from "../Input";
import Label from "../Label";

interface Props {
  component: TextInputData;
  value: string;
  onChange: (newValue: string) => void;
}

const TextInput: React.FC<Props> = ({ component, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={component.id.toString()}>
        <p className="text-base">{component.title}</p>
      </Label>
      <Input
        name={component.id.toString()}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default TextInput;
