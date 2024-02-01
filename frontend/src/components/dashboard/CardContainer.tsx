import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props extends PropsWithChildren {
  label: string;
  seeMoreUrl?: string;
  vertical?: boolean;
}
const CardContainer: React.FC<Props> = ({
  label,
  seeMoreUrl,
  vertical = false,
  children,
}) => {
  return (
    <div className="h-full p-4 pl-6 bg-gray-300 rounded-2xl scrollbar-track-gray-300 scrollbar scrollbar-thumb-gray-300">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold uppercase">{label}</h2>

        {seeMoreUrl && (
          <Link to={seeMoreUrl}>
            <span className="flex items-center mr-4 text-base">
              See All <ArrowRightIcon className="w-4 h-4 ml-2 stroke-2" />
            </span>
          </Link>
        )}
      </div>
      {!vertical && (
        <div className="flex gap-8 pb-4 mt-6 overflow-x-auto snap-x">
          {children}
        </div>
      )}
      {vertical && (
        <div className="flex flex-col gap-8 pb-4 mt-6 overflow-y-auto snap-y">
          {children}
        </div>
      )}
    </div>
  );
};

export default CardContainer;
