import { useNavigate, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { Activity, ActivityPostData } from "../../types/activities/activities";

import ActivityForm from "../activities/ActivityForm";
import { useEffect, useState } from "react";

const UpdateActivity: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    activitiesAPI
      .getActivity(Number(id))
      .then((activity) => setActivity(activity))
      .catch(() => navigate("/activities"));
  }, [id, navigate]);

  return (
    activity && (
      <ActivityForm
        label="Update Activity"
        initialData={activity}
        handleValues={(values) =>
          activitiesAPI.updateActivity(
            parseInt(id!),
            values as ActivityPostData
          ) as unknown as Promise<void>
        }
      />
    )
  );
};

export default UpdateActivity;
