import Label from "./Label";

interface FormTextAreaInputProps {
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  rows?: number;
  required?: boolean;
}

const FormTextAreaInput: React.FC<FormTextAreaInputProps> = ({
  name,
  value,
  label,
  rows = 4,
  required,
  onChange,
}: FormTextAreaInputProps) => {
  return (
    <div>
      {label && (
        <Label htmlFor={name}>
          <p className="text-base">{label}</p>
        </Label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        rows={rows}
        required={required}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-2xl border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer"
      />
    </div>
  );
};

export default FormTextAreaInput;
