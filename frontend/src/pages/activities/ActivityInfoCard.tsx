import { ArrowTopRightOnSquareIcon, EyeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../../components/dataDisplay/ImageGallery";
import { ActivityData } from "../../types/activities/activities";
import Tag from "../../components/dataDisplay/Tag";
import Button from "../../components/buttons/Button";
import { PlusIcon } from "@heroicons/react/20/solid";

interface ActivityInfoCardProps {
  activity: ActivityData;
}

const ActivityInfoCard: React.FC<ActivityInfoCardProps> = ({ activity }: ActivityInfoCardProps) => {
  const { id } = useParams();
  const sessionCount = activity.sessions.length;
  const hasEnrollmentForm = activity.enrollmentForm !== undefined;

  return (
    <div className="grid grid-cols-3 bg-white p-8 rounded-md shadow">
      {/* Activity Images */}
      <div className="flex flex-col justify-center min-h-36 col-span-1 pr-8">
        <ImageGallery imageUrls={activity.images.map((image) => `${process.env.REACT_APP_BACKEND_URL}/${image.imageUrl}`)}/>
      </div>

      {/* Activity Info */}
      <div className="flex flex-col justify-center col-span-2 gap-2">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
          {activity.name}
        </h2>
        
        <div className="text-sky-700">
          <Link to={`/organisations/${activity.organisationId}`} target="_blank">
            <div className="flex items-center underline">
              {activity.organisationName}
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2 stroke-2 ml-2" />
            </div>
          </Link>
        </div>

        <div className="flex items-center text-md text-gray-700 mb-2">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {activity.location}
        </div>
        
        <div className="flex text-gray-500">{activity.description}</div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4">
            <Tag text={activity.type} textSize="text-sm" />
            <Tag text={`${sessionCount} session${sessionCount !== 1 ? "s" : ""}`} textSize="text-sm" />
          </div>

          <div>
            <Link to={`/activities/${id}/enrollment-forms/${activity.enrollmentForm?.id ?? "new"}`}>
              <Button>
                {hasEnrollmentForm && <EyeIcon className="w-4 h-4 mr-2 stroke-2" />}
                {!hasEnrollmentForm && <PlusIcon className="w-4 h-4 mr-2 stroke-2" />}
                {hasEnrollmentForm ? "View" : "Create"} Enrollment Form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityInfoCard;
