import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";
import { ActivityMiniData } from "../../types/activities/activities";
import _ from "lodash";
import { ClockTwoIcon, LocationPinIcon } from "../../components/icons/icons";

interface VolunteeringOpportunityCardProps {
  activity: ActivityMiniData;
  showButton?: boolean;
  dashboard?: boolean;
}

const VolunteeringOpportunityCard: React.FC<
  VolunteeringOpportunityCardProps
> = ({
  activity,
  showButton = true,
  dashboard = false,
}: VolunteeringOpportunityCardProps) => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div
      className={
        "relative flex flex-col rounded-2xl overflow-clip" +
        (dashboard ? " bg-white min-w-[18rem]" : " bg-primary-200")
      }
    >
      <img
        src={
          activity.images && !_.isEmpty(activity.images)
            ? process.env.REACT_APP_BACKEND_URL! +
              "/" +
              activity.images[0].imageUrl
            : "/bigatheart.png"
        }
        alt="activity"
        className={"object-cover w-full" + (dashboard ? " h-24" : " h-36")}
      />
      <div
        className={
          "flex flex-col h-full px-4 pt-4" + (dashboard ? " " : " pb-10")
        }
      >
        <Link
          to={"/activities/" + activity.id}
          className="text-xl font-bold hover:text-primary-800 hover:underline"
          state={{ prevRoute: location.pathname }}
        >
          {activity.name}
        </Link>
        <p className="text-sm">{activity.organisationName}</p>
        <p className="flex items-center text-base">
          <LocationPinIcon className="w-4 h-4 mr-2 shrink-0" />
          {activity.location}
        </p>
        {!!activity.sessions.length && (
          <div className="flex items-center">
            <ClockTwoIcon className="w-4 h-4 mr-2 shrink-0" />
            <p className="text-base">
              {format(
                new Date(activity.sessions[0]!.start),
                "eee d MMM, hh:mma-"
              )}
              {new Date(activity.sessions[0]!.start).getDay() ===
              new Date(activity.sessions[0]!.end).getDay()
                ? format(new Date(activity.sessions[0]!.end), "h:mma")
                : format(
                    new Date(activity.sessions[0]!.end),
                    "eee d MMM, hh:mma"
                  )}
            </p>
          </div>
        )}
      </div>
      {showButton && (
        <div className="p-4 justify-self-end">
          <Link
            to={"/activities/" + activity.id.toString() + "/enroll"}
            className={
              "flex justify-center items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            }
          >
            Enroll in Event
          </Link>
        </div>
      )}
    </div>
  );
};

export default VolunteeringOpportunityCard;
