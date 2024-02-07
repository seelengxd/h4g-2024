import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ActivityMiniData } from "../../types/activities/activities";
import Tag from "../../components/dataDisplay/Tag";
import { LocationPinIcon } from "../../components/icons/icons";

interface ActivityMiniViewCardProps {
  activity: ActivityMiniData;
}

const ActivityMiniViewCard: React.FC<ActivityMiniViewCardProps> = ({
  activity,
}: ActivityMiniViewCardProps) => {
  return (
    <div className="flex flex-col h-full gap-4 p-8 bg-white rounded-md shadow">
      {/* Activity Name */}
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
        {activity.name}
      </h2>

      {/* Activity Organisation */}
      <div className="text-sky-700">
        <Link to={`/organisations/${activity.organisationId}`} target="_blank">
          <div className="flex items-center underline">
            {activity.organisationName}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 mr-2 stroke-2" />
          </div>
        </Link>
      </div>

      {/* Activity Location */}
      <div className="flex items-center mb-2 text-gray-700 text-md">
        <LocationPinIcon className="w-5 h-5 mr-2" />
        {activity.location}
      </div>

      {/* Activity Description */}
      <div className="flex text-gray-500">{activity.description}</div>

      <div className="flex">
        <Tag text={activity.type} textSize="text-sm" />
      </div>
    </div>
  );
};

export default ActivityMiniViewCard;
