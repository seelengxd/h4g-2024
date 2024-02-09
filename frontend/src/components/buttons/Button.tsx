import { PropsWithChildren } from "react";
import Spinner from "../loading/Spinner";

interface Props extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  bgColor?: string;
  textColor?: string;
  roundness?: string;
  px?: number;
  py?: number;
  outlined?: boolean;
  outlineColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({
  type = "button",
  children,
  fullWidth = false,
  bgColor = "primary",
  textColor = "text-white",
  roundness = "full",
  px = 3,
  py = 3,
  outlined = false,
  outlineColor = "border-black",
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      className={
        `flex justify-center items-center rounded-${roundness} bg-${bgColor}-600 px-${px} py-${py} text-sm font-semibold leading-6 ${textColor} shadow-sm hover:bg-${bgColor}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${bgColor}-600` +
        (fullWidth ? " w-full" : "") +
        (outlined ? ` border-2 ${outlineColor}` : "") +
        (disabled ? ` opacity-60` : "")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
export default Button;
