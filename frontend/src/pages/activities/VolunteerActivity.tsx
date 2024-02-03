import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

import { format } from "date-fns";

const VolunteerActivity: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const [activity, setActivity] = useState<ActivityData | null>(null);
  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);

  console.log(location);

  return activity ? (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col p-4 leading-normal">
          {location.state?.prevRoute === "/events" && (
            <Link
              to="/events"
              className="flex items-center mb-12 text-xl font-bold text-primary-800"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Events
            </Link>
          )}
          {location.state?.prevRoute === "/activities" && (
            <Link
              to="/events"
              className="flex items-center mb-12 text-xl font-bold text-primary-800"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Your Activity
            </Link>
          )}
          <h2 className="mb-4 text-6xl font-semibold tracking-tight text-gray-900 ">
            {activity.name}
          </h2>
          <p>
            by{" "}
            <Link
              to={"/organisations" + activity.organisationId.toString()}
              className="hover:underline"
            >
              {activity.organisation.name}
            </Link>
          </p>
          <p className="flex items-center mt-2 text-md">
            <MapPinIcon className="w-4 h-4 mr-2" />
            {activity.location}
          </p>
          {!!activity.sessions.length && (
            <p className="flex items-center mt-2 text-md">
              <ClockIcon className="w-4 h-4 mr-2" />
              <p>
                {format(
                  new Date(activity.sessions[0]!.start),
                  "EEEE d MMMM, hh:mma-"
                )}
                {new Date(activity.sessions[0]!.start).getDay() ===
                new Date(activity.sessions[0]!.end).getDay()
                  ? format(new Date(activity.sessions[0]!.end), "hh:mma")
                  : format(
                      new Date(activity.sessions[0]!.end),
                      " d MMM, hh:mma"
                    )}
              </p>
            </p>
          )}
          <p className="mt-4">{activity.description}</p>

          <Link
            to={"/activities/" + activity.id.toString()}
            className={
              "flex justify-center mt-8 items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            }
          >
            Enroll in Event
          </Link>
        </div>
        <div className="flex flex-col h-[calc(100vh-80px)] max-h-full gap-8 overflow-y-scroll">
          {activity.images.map((image) => (
            <img
              src={process.env.REACT_APP_BACKEND_URL! + "/" + image.imageUrl}
              alt="activity"
              className="w-full h-auto"
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default VolunteerActivity;
