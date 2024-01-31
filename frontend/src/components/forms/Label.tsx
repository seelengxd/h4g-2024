interface Props extends React.PropsWithChildren {
  htmlFor: string;
}

const Label: React.FC<Props> = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-900 leading-6"
    >
      {children}
    </label>
  );
};

export default Label;
