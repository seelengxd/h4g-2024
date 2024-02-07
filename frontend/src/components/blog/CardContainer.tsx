import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props extends PropsWithChildren {
  title: string;
  subtitle: string;
  profileImageUrl?: string;
  blogPreview: string;
  blogImageUrl?: string;
}
const CardContainer: React.FC<Props> = ({
  title,
  subtitle,
  profileImageUrl,
  blogPreview,
  blogImageUrl,
}) => {
  return (
    <div className="mb-3 bg-primary-300 rounded-2xl w-72 py-4 h-80 flex flex-col justify-start items-start">
      <div className="px-4 flex gap-3">
        <img
          className="rounded-full w-14 h-14 bg-white"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + profileImageUrl}
        />

        <div className="mt-2">
          <h2 className=" font-semibold text-gray-700">{title}</h2>
          <h3 className="text-xs text-gray-400">{subtitle}</h3>
        </div>
      </div>

      <div className="my-2 flex justify-center items-center h-1/2 w-full overflow-hidden">
        <img
          className=""
          src={process.env.REACT_APP_BACKEND_URL! + "/" + blogImageUrl}
        ></img>
      </div>

      <div className="">
        <p className="text-xs px-3 text-gray-600">{blogPreview}</p>
      </div>
    </div>
  );
};

export default CardContainer;
