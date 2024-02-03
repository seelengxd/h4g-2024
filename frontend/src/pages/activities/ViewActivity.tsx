import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import Button from "../../components/buttons/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import { EyeIcon, PlusIcon } from "@heroicons/react/20/solid";
import EnrollmentFormTable from "./EnrollmentFormTable";

const ViewActivity: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<ActivityData | null>(null);
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
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
          {activity.name}
        </h2>
        <p>{activity.description}</p>
        <p>{activity.type}</p>
        <p>by {activity.organisation.name}</p>

        {activity.sessions.map((session) => {
          return (
            <>
              <p>start: {new Date(session.start).toISOString()}</p>
              <p>end: {new Date(session.end).toISOString()}</p>{" "}
            </>
          );
        })}

        <div>
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <TrashIcon className="w-4 h-4 mr-2 stroke-2" />
            Delete
          </Button>
        </div>
        <div>
          <Link to={`/activities/${id}/edit`}>
            <Button>
              <PencilIcon className="w-4 h-4 mr-2 stroke-2" />
              Edit
            </Button>
          </Link>
        </div>

        {activity.enrollmentForm && (
          <div>
            <Link
              to={`/activities/${id}/enrollment-forms/${activity.enrollmentForm.id}`}
            >
              <Button>
                <EyeIcon className="w-4 h-4 mr-2 stroke-2" />
                View Enrollment Form
              </Button>
            </Link>
          </div>
        )}

        {!activity.enrollmentForm && (
          <div>
            <Link to={`/activities/${id}/enrollment-forms/new`}>
              <Button>
                <PlusIcon className="w-4 h-4 mr-2 stroke-2" />
                Create Enrollment Form
              </Button>
            </Link>
          </div>
        )}

        {dialogOpen && (
          <ConfirmationDialog
            message="Are you sure you want to delete this activity? This action cannot be undone."
            onDelete={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}

        <EnrollmentFormTable activity={activity} />
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewActivity;
