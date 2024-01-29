interface Props {
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  value?: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props & React.HTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const {
    name,
    type = "text",
    autoComplete,
    required = false,
    value,
    onChange,
    placeholder,
    ...otherProps
  } = props;
  return (
    <div className="mt-2">
      <input
        {...otherProps}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...(name === "image" ? { accept: "image/*" } : {})}
        {...(autoComplete ? { autoComplete } : {})}
        required={required}
        {...(value ? { value } : {})}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default Input;
