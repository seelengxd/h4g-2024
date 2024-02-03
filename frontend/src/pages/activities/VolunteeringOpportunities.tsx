import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";

import { ActivityRowData } from "../../utils/activities";
import {
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { format } from "date-fns";

const VolunteeringOpportunities: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityRowData[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    activitiesAPI
      .getAllActivities()
      .then((activities) => setActivities(activities))
      .finally(() => setLoading(false));
  }, []);

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="items-center justify-between h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="flex justify-between">
        <h1 className="text-4xl">Browse Volunteering Opportunities</h1>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block p-2 text-sm rounded-xl w-72 bg-primary-300 border-primary-300 ps-4 focus:ring-primary-500 focus:border-primary-500 "
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.currentTarget.value);
            }}
          />
          <div className="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-4 opacity-80">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-16 mb-4 gap-x-8 gap-y-16">
        {filteredActivities.map((activity) => (
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
              <p className="text-sm">{activity.organisation.name}</p>
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
        ))}
      </div>
    </div>
  );
};

export default VolunteeringOpportunities;
