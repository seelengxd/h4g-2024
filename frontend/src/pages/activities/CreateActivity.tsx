import activitiesAPI from "../../api/activities/activities";
import { ActivityPostData } from "../../types/activities/activities";

import ActivityForm from "../activities/ActivityForm";

const CreateActivity: React.FC = () => {
  return (
    <ActivityForm
      label="Create Activity"
      handleValues={(values) =>
        activitiesAPI.createActivity(
          values as ActivityPostData
        ) as unknown as Promise<void>
      }
    />
  );
};

export default CreateActivity;
