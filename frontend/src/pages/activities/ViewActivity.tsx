import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import Button from "../../components/buttons/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";
import { Activity } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";

const ViewActivity: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    activitiesAPI
      .deleteActivity(parseInt(id!))
      .then(() => navigate("/activities"));
  };
  return activity ? (
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
          {activity.name}
        </h2>
        <p>{activity.description}</p>
        <p>{activity.type}</p>
        <p>by {activity.organisation.name}</p>

        {activity.activityDates.map((activityDate) => {
          console.log(activityDate);
          return (
            <>
              <p>start: {new Date(activityDate.start).toISOString()}</p>
              <p>end: {new Date(activityDate.end).toISOString()}</p>{" "}
            </>
          );
        })}

        <div>
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <TrashIcon className="stroke-2 w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
        <div>
          <Link to={`/activities/${id}/edit`}>
            <Button>
              <PencilIcon className="stroke-2 w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>

        {dialogOpen && (
          <ConfirmationDialog
            message="Are you sure you want to delete this activity? This action cannot be undone."
            onDelete={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewActivity;
