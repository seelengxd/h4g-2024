import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

import { format, isFuture } from "date-fns";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/authSlice";
import { isUserEnrolled } from "../../utils/activities";
import { ClockTwoIcon, LocationPinIcon } from "../../components/icons/icons";

const VolunteerActivity: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const user = useAppSelector(selectUser);

  const [activity, setActivity] = useState<ActivityData | null>(null);
  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);

  return activity ? (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col p-4 leading-normal">
          {location.state?.prevRoute === "/your-activities" && (
            <Link
              to="/your-activities"
              className="flex items-center mb-12 text-xl font-bold"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Your Activity
            </Link>
          )}
          {location.state?.prevRoute === "/activities" && (
            <Link
              to="/activities"
              className="flex items-center mb-12 text-xl font-bold"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Events
            </Link>
          )}
          {location.state?.prevRoute === "/" && (
            <Link to="/" className="flex items-center mb-12 text-xl font-bold">
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Dashboard
            </Link>
          )}
          <h2 className="mb-4 text-6xl font-semibold tracking-tight text-primary-800 ">
            {activity.name}
          </h2>
          <p>
            by
            <span className="ml-1">{activity.organisation.name}</span>
          </p>
          <p className="flex items-center mt-2 text-md">
            <LocationPinIcon className="w-4 h-4 mr-2" />
            {activity.location}
          </p>
          {!!activity.sessions.length && (
            <p className="flex items-center mt-2 text-md">
              <ClockTwoIcon className="w-4 h-4 mr-2" />
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

          {isUserEnrolled(user!, activity) ? (
            isFuture(new Date(activity.sessions[0].start)) ? (
              <>
                <button
                  disabled
                  className={
                    "opacity-60 flex justify-center mt-8 items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  }
                >
                  Enrolled
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/your-activities/"}
                  className={
                    "flex justify-center mt-8 items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  }
                  state={{ prevRoute: "/activities/" + activity.id.toString() }}
                >
                  Leave / View Feedback
                </Link>
              </>
            )
          ) : isFuture(new Date(activity.sessions[0].start)) ? (
            <Link
              to={"/activities/" + activity.id.toString() + "/enroll"}
              className={
                "flex justify-center mt-8 items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              }
              state={{ prevRoute: "/activities/" + activity.id.toString() }}
            >
              Enroll in Event
            </Link>
          ) : (
            <>
              <div
                className="p-4 mt-4 text-orange-700 bg-orange-100 border-l-4 border-orange-500"
                role="alert"
              >
                <p className="font-bold">Oh no!</p>
                <p>
                  This event is in the past. Sign up next time they host another
                  similar activity!
                </p>
              </div>
              <button
                disabled
                className={
                  "opacity-60 flex justify-center mt-8 items-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                }
              >
                Enroll in Event
              </button>
            </>
          )}
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
