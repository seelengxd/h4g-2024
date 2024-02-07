import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  subtitle: string;
  profileImageUrl?: string;
  blogPreview: string;
  blogImageUrl?: string;
  dashboard?: boolean;
}
const CardContainer: React.FC<Props> = ({
  title,
  subtitle,
  profileImageUrl,
  blogPreview,
  blogImageUrl,
  dashboard,
}) => {
  return (
    <div
      className={
        " bg-primary-300 rounded-2xl py-4 h-80 flex flex-col justify-start items-start" +
        (dashboard ? " bg-white min-w-[18rem]" : " w-72 bg-primary-200")
      }
    >
      <div className="flex gap-3 px-4">
        <img
          className="bg-white rounded-full w-14 h-14"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + profileImageUrl}
        />

        <div className="mt-2">
          <h2 className="font-semibold text-gray-700 ">{title}</h2>
          <h3 className="text-xs text-gray-400">{subtitle}</h3>
        </div>
      </div>

      <div
        className={
          "flex items-center justify-center w-full my-2 overflow-hidden" +
          " h-1/2"
        }
      >
        <img
          className=""
          src={process.env.REACT_APP_BACKEND_URL! + "/" + blogImageUrl}
        ></img>
      </div>

      <div className="">
        <p
          className={
            "px-3 text-xs text-gray-600 text-ellipsis overflow-hidden" +
            (dashboard ? " h-3/4" : "")
          }
        >
          {blogPreview}
        </p>
      </div>
    </div>
  );
};

export default CardContainer;
