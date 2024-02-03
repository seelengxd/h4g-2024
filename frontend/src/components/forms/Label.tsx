interface Props extends React.PropsWithChildren {
  htmlFor: string;
  textSize?: string;
  mb?: number;
}

const Label: React.FC<Props> = ({ htmlFor, textSize = 'text-sm', mb = 0, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block ${textSize} font-medium text-gray-900 leading-6 mb-${mb}`}
    >
      {children}
    </label>
  );
};

export default Label;
