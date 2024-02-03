import _ from "lodash";
import { Session } from "../../types/activities/activities"
import ActivitySessionsCardSessionRow from "./ActivitySessionsCardSessionRow";

interface ActivitySessionGroupProps {
  sessionGroupTitle: string;
  sessionGroup: Session[];
}

const ActivitySessionGroup: React.FC<ActivitySessionGroupProps> = ({ sessionGroupTitle, sessionGroup }: ActivitySessionGroupProps) => {
  if (_.isEmpty(sessionGroup)) return <></>;

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-lg mb-2 text-gray-600">{sessionGroupTitle}</h4>
      <div className="flex flex-col">
        {sessionGroup.map((session) => <ActivitySessionsCardSessionRow session={session} />)}
      </div>
    </div>
  );
};

export default ActivitySessionGroup;
