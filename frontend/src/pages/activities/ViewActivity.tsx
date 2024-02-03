import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import Button from "../../components/buttons/Button";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import { EyeIcon, PlusIcon } from "@heroicons/react/20/solid";
import EnrollmentFormTable from "./EnrollmentFormTable";
import ViewActivityActionButtons from "./ViewActivityActionButtons";
import ActivityInfoCard from "./ActivityInfoCard";

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
      <ActivityInfoCard activity={activity} />

        {activity.sessions.map((session) => {
          return (
            <>
              <p>start: {new Date(session.start).toISOString()}</p>
              <p>end: {new Date(session.end).toISOString()}</p>{" "}
            </>
          );
        })}

        <EnrollmentFormTable activity={activity} />
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewActivity;
