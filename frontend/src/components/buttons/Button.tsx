import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({
  type = "button",
  children,
  fullWidth = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={
        "flex justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" +
        (fullWidth ? " w-full" : "")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
