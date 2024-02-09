import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props extends PropsWithChildren {
  label?: string;
  vertical?: boolean;
  description?: string;
  feedback?: boolean;
  hideLocation?: boolean;
}
const CardContainer: React.FC<Props> = ({
  label,
  vertical = false,
  children,
  description,
  feedback = false,
}) => {
  return (
    <div className="relative h-full px-6 py-3 shadow-md overflow-clip bg-primary-200 rounded-3xl scrollbar-track-gray-300 scrollbar scrollbar-thumb-gray-300">
      {label && (
        <div className="absolute flex flex-col justify-between top-4 left-6">
          <h2 className="pr-2 text-lg font-semibold capitalize">{label}</h2>
          {description && <p className="pr-2 mt-2 text-sm">{description}</p>}
        </div>
      )}
      {!vertical && (
        <div className="flex h-full gap-8 pb-4 my-3 overflow-x-auto snap-x basis-2/5">
          {children}
        </div>
      )}
      {vertical && (
        <div
          className={
            "flex flex-col gap-2 pb-4 overflow-scroll snap-y " +
            (label
              ? feedback
                ? "h-[calc(100%-7rem)] mt-28"
                : "h-[calc(100%-2.5rem)] mt-10"
              : " h-full")
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CardContainer;
