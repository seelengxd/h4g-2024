import { ReactNode } from "react";

interface Props extends React.PropsWithChildren {
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  icon: ReactNode;
  marginLeft?: number;
  mr?: number;
}

const IconButton: React.FC<Props> = ({
  ariaLabel,
  onClick,
  isDisabled = false,
  icon,
  marginLeft,
  mr,
  children,
}) => {
  const marginClass =
    " " + (marginLeft ? "ml-" + marginLeft : "") + (mr ? " mr-" + mr : "");

  return (
    <button
      aria-label={ariaLabel}
      className={
        "flex justify-center items-center rounded-md bg-primary-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer" +
        marginClass
      }
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon}
      {children}
    </button>
  );
};

export default IconButton;
