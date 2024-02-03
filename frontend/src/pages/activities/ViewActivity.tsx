import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import Button from "../../components/buttons/Button";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import { EyeIcon, PlusIcon } from "@heroicons/react/20/solid";
import EnrollmentFormTable from "./EnrollmentFormTable";
import ViewActivityActionButtons from "./ViewActivityActionButtons";

const ViewActivity: React.FC = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);

  return activity ? (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <ViewActivityActionButtons />

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
          {activity.name}
        </h2>
        <p>{activity.description}</p>
        <p>{activity.type}</p>
        <p>by {activity.organisationName}</p>

        {activity.sessions.map((session) => {
          return (
            <>
              <p>start: {new Date(session.start).toISOString()}</p>
              <p>end: {new Date(session.end).toISOString()}</p>{" "}
            </>
          );
        })}

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

        <EnrollmentFormTable activity={activity} />
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewActivity;
