import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import EnrollmentFormTable from "./EnrollmentFormTable";
import ViewActivityActionButtons from "./ViewActivityActionButtons";
import ActivityInfoCard from "./ActivityInfoCard";
import ActivitySessionsCard from "./ActivitySessionsCard";

const ViewActivity: React.FC = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityData | null>(null);

  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);

  if (!activity) return <Spinner />

  return (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <ViewActivityActionButtons />
      <div className="flex flex-col gap-8">
        <ActivityInfoCard activity={activity} />
        <ActivitySessionsCard sessions={activity.sessions} />
      </div>
      <EnrollmentFormTable activity={activity} />
    </div>
  );
};

export default ViewActivity;
