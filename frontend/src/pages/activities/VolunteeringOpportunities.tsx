import { useEffect, useState } from "react";
import activitiesAPI from "../../api/activities/activities";
import { ActivityRowData } from "../../utils/activities";
import VolunteeringOpportunityCard from "./VolunteertingOpportunityCard";

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
            className="block p-2 text-sm rounded-xl w-72 bg-gray-50 border-primary-300 ps-4 focus:ring-primary-500 focus:border-primary-500 "
            placeholder="Search for an event"
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
      <div className="grid grid-cols-3 mt-16 mb-4 gap-x-8 gap-y-16">
        {filteredActivities.map((activity) => (
          <VolunteeringOpportunityCard activity={activity} showButton={false} />
        ))}
      </div>
    </div>
  );
};

export default VolunteeringOpportunities;
