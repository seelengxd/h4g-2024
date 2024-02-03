import Navbar from "../navigation/Navbar";

interface Props {
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  value?: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  multiple?: boolean;
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
    label,
    multiple = false,
    ...otherProps
  } = props;
  return (
    <div className="relative">
      <input
        {...otherProps}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || " "}
        {...(name.includes("image") ? { accept: "image/*", multiple } : {})}
        {...(autoComplete ? { autoComplete } : {})}
        {...(required ? { required: true } : {})}
        {...(value ? { value } : {})}
        onChange={onChange}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-primary-200 rounded-2xl border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer"
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:bg-white px-2 peer-focus:px-2 peer-placeholder-shown:bg-primary-200 peer-focus:text-primary-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
