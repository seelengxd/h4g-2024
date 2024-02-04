import _ from "lodash";
import { SessionMiniData } from "../../types/activities/activities";
import ActivitySessionsCardSessionRow from "./ActivitySessionsCardSessionRow";

interface ActivitySessionGroupProps {
  sessionGroupTitle: string;
  sessionGroup: SessionMiniData[];
  tagBgColor: string;
  tagTextColor: string;
  capacity: number;
}

const ActivitySessionGroup: React.FC<ActivitySessionGroupProps> = ({
  sessionGroupTitle,
  sessionGroup,
  tagBgColor,
  tagTextColor,
  capacity,
}: ActivitySessionGroupProps) => {
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
            status={sessionGroupTitle.split(" ")[0]}
            tagBgColor={tagBgColor}
            tagTextColor={tagTextColor}
            capacity={capacity}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitySessionGroup;
