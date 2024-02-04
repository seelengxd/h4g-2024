interface Props extends React.PropsWithChildren {
  onBlur?: (e: React.FocusEvent) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const FormControl: React.FC<Props> = ({
  onBlur,
  isInvalid = false,
  children,
  errorMessage,
}) => {
  console.log({ isInvalid, errorMessage });
  return (
    <div onBlur={onBlur}>
      {children}
      {isInvalid && (
        <span className="mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormControl;
