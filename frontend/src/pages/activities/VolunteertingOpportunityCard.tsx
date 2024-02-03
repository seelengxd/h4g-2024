import { MapPinIcon, ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ActivityMiniData } from "../../types/activities/activities";

interface VolunteeringOpportunityCardProps {
  activity: ActivityMiniData;
}

const VolunteeringOpportunityCard: React.FC<VolunteeringOpportunityCardProps> = ( { activity }: VolunteeringOpportunityCardProps ) => {
  return (
    <div className="relative flex flex-col bg-primary-200 rounded-2xl overflow-clip">
      <img
        src={
          activity.images
            ? process.env.REACT_APP_BACKEND_URL! +
              "/" +
              activity.images[0].imageUrl
            : "/bigatheart.png"
        }
        alt="activity"
        className="object-cover w-full h-36"
      />
      <div className="flex flex-col h-full p-3 px-4">
        <p className="text-xl font-bold">{activity.name}</p>
        <p className="text-sm">{activity.organisationName}</p>
        <p className="flex items-center text-md">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {activity.location}
        </p>
        {!!activity.sessions.length && (
          <p className="flex items-center text-md">
            <ClockIcon className="w-4 h-4 mr-2" />
            <p>
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
          </p>
        )}
      </div>
      <div className="p-4 justify-self-end">
        <Link
          to={"/activities/" + activity.id.toString()}
          className={
            "flex justify-center items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          }
        >
          Enroll in Event
        </Link>
      </div>
      <Link
        to={"/activities/" + activity.id.toString()}
        className="absolute right-4 top-4"
        state={{ prevRoute: "/events" }}
      >
        <ArrowTopRightOnSquareIcon className="w-10 h-10 p-2 border rounded-full text-primary-800 bg-primary-200 border-primary-800 hover:text-primary-200 hover:bg-primary-800 hover:border-primary-200" />
      </Link>
    </div>
  );
}

export default VolunteeringOpportunityCard;
