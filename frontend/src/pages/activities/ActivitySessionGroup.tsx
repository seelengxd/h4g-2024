import _ from "lodash";
import { SessionMiniData } from "../../types/sessions/sessions"
import ActivitySessionsCardSessionRow from "./ActivitySessionsCardSessionRow";

interface ActivitySessionGroupProps {
  sessionGroupTitle: string;
  sessionGroup: SessionMiniData[];
  statusTag: JSX.Element;
  capacity: number;
}

const ActivitySessionGroup: React.FC<ActivitySessionGroupProps> = ({ sessionGroupTitle, sessionGroup, statusTag, capacity }: ActivitySessionGroupProps) => {
  if (_.isEmpty(sessionGroup)) return <></>;
  const sessionCount = sessionGroup.length;

  return (
    <div className="mt-8">
      <h4 className="mb-2 font-semibold text-gray-600 text-md">
        {sessionCount} {sessionGroupTitle}
        {sessionCount !== 1 ? "s" : ""}
      </h4>
      <div className="flex flex-col gap-2">
        {sessionGroup.map((session) => (
          <ActivitySessionsCardSessionRow
            session={session}
            capacity={capacity}
            statusTag={statusTag}
          />))}
      </div>
    </div>
  );
};

export default ActivitySessionGroup;
