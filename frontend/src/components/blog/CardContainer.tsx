import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props extends PropsWithChildren {
  id?: number;
  title: string;
  subtitle: string;
  profileImageUrl?: string;
  blogPreview: string;
  blogImageUrl?: string;
  dashboard?: boolean;
}
const CardContainer: React.FC<Props> = ({
  id,
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
        " bg-primary-200 rounded-2xl py-4 h-88 flex flex-col justify-start items-start" +
        (dashboard ? " bg-white min-w-[18rem] overflow-hidden" : "")
      }
    >
      <div className="flex gap-3 px-4">
        <img
          className="bg-white rounded-full w-14 h-14"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + profileImageUrl}
          alt={"blog"}
        />

        <div className="mt-2">
          <Link
            to={"/blogs/" + id}
            className={"hover:text-primary-800 hover:underline"}
          >
            <h2
              className={
                "font-semibold leading-5" +
                (dashboard ? " line-clamp-2 text-ellipsis overflow-hidden" : "")
              }
            >
              {title}
            </h2>
          </Link>
          <h3 className="text-xs">{subtitle}</h3>
        </div>
      </div>

      <div
        className={
          "flex items-center justify-center w-full my-2 overflow-hidden" +
          (dashboard ? "" : "h-36")
        }
      >
        <img
          className={
            dashboard
              ? "h-full w-full object-cover"
              : "h-52 w-full object-cover"
          }
          src={process.env.REACT_APP_BACKEND_URL! + "/" + blogImageUrl}
        />
      </div>

      <p className={"px-3 text-xs text-gray-600 inline-block "}>
        <span
          className={
            dashboard ? "line-clamp-3 overflow-hidden text-ellipsis" : ""
          }
        >
          {blogPreview}
        </span>
      </p>
    </div>
  );
};

export default CardContainer;
