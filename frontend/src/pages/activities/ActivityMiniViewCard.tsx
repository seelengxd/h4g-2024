import { ArrowTopRightOnSquareIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ActivityMiniData } from "../../types/activities/activities"
import Tag from "../../components/dataDisplay/Tag";

interface ActivityMiniViewCardProps {
  activity: ActivityMiniData;
}

const ActivityMiniViewCard: React.FC<ActivityMiniViewCardProps> = ({ activity }: ActivityMiniViewCardProps) => {
  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4 h-full">
      {/* Activity Name */}
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
        {activity.name}
      </h2>

      {/* Activity Organisation */}
      <div className="text-sky-700">
        <Link to={`/organisations/${activity.organisationId}`} target="_blank">
          <div className="flex items-center underline">
            {activity.organisationName}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2 stroke-2 ml-2" />
          </div>
        </Link>
      </div>

      {/* Activity Location */}
      <div className="flex items-center text-md text-gray-700 mb-2">
        <MapPinIcon className="w-5 h-5 mr-2" />
        {activity.location}
      </div>

      {/* Activity Description */}
      <div className="flex text-gray-500">{activity.description}</div>

      <div className="flex">
        <Tag text={activity.type} textSize="text-sm" />
      </div>
    </div>
  );
}

export default ActivityMiniViewCard;
