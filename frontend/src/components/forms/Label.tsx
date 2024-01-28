interface Props extends React.PropsWithChildren {
  htmlFor: string;
}

const Label: React.FC<Props> = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {children}
    </label>
  );
};

export default Label;
