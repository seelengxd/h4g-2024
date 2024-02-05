//same as input except no transition

export interface InputPropStatic {
    name: string;
    type?: string;
    autoComplete?: string;
    required?: boolean;
    value?: string | number;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    multiple?: boolean;
    hidden?: boolean;
  }
  
  const Input2: React.FC<InputPropStatic & React.HTMLAttributes<HTMLInputElement>> = (
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
      hidden = false,
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
          className={"bg-primary-300 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 focus:bg-white rounded-2xl border-1 border-primary-600 appearance-none focus:outline-none focus:ring-0 focus:border-primary-800 peer" + (hidden ? " hidden" : "")}
        />
        <label
          className="rounded-xl absolute -translate-y-5 translate-x-1 scale-75 top-2 z-10 origin-[0] bg-white px-2 text-primary-800"
        >
          {label}
        </label>
      </div>
    );
  };
  
  export default Input2;
  