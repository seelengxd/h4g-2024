import { format } from "date-fns";
import { Session } from "../../types/activities/activities"

interface ActivitySessionsCardSessionRowProps {
  session: Session;
}

const ActivitySessionsCardSessionRow: React.FC<ActivitySessionsCardSessionRowProps> = ({ session }: ActivitySessionsCardSessionRowProps) => {
  return (
    <div className="flex">
      {format(new Date(session.start), "d MMM yyyy (hh:mm:aa)")} - {format(new Date(session.end), "d MMM yyyy (hh:mm:aa)")}
    </div>
  );
};

export default ActivitySessionsCardSessionRow;
