import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import EnrollmentFormTable from "./EnrollmentFormTable";
import ViewActivityActionButtons from "./ViewActivityActionButtons";
import ActivityInfoCard from "./ActivityInfoCard";
import ActivitySessionsCard from "./ActivitySessionsCard";
import Tabs, { Tab } from "../../components/dataDisplay/Tabs";

const ViewActivity: React.FC = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState<ActivityData | null>(null);

  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);

  if (!activity) return <Spinner />

  const sessionTab: Tab = {
    id: "sessions",
    tabTitle: "Activity Sessions",
    page: <ActivitySessionsCard sessions={activity.sessions} capacity={activity.capacity} />,
  }

  const enrollmentFormTab: Tab = {
    id: "enrollments",
    tabTitle: "Enrollment Submissions",
    page: <EnrollmentFormTable activity={activity} />,
  }

  return (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <ViewActivityActionButtons />
      <ActivityInfoCard activity={activity} />
      <Tabs mt={8} tabs={[sessionTab, enrollmentFormTab]} defaultTabId="sessions"/>
    </div>
  );
};

export default ViewActivity;
