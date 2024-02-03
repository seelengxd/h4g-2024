import isWithinInterval from "date-fns/isWithinInterval";
import { Session } from "../../types/activities/activities";
import { isFuture, isPast } from "date-fns";
import ActivitySessionGroup from "./ActivitySessionGroup";

interface ActivitySessionsCardProps {
  sessions: Session[];
}

const ActivitySessionsCard: React.FC<ActivitySessionsCardProps> = ({ sessions }: ActivitySessionsCardProps) => {
  const pastSessions = sessions.filter((session) => isPast(session.end));
  const futureSessions = sessions.filter((session) => isFuture(session.start));
  const ongoingSessions = sessions.filter((session) =>
    isWithinInterval(new Date(), { start: session.start, end: session.end })
  );

  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow">
      <h1 className="text-2xl font-semibold">Sessions</h1>

      <ActivitySessionGroup sessionGroupTitle="Ongoing Sessions" sessionGroup={ongoingSessions} />
      <ActivitySessionGroup sessionGroupTitle="Future Sessions" sessionGroup={futureSessions} />
      <ActivitySessionGroup sessionGroupTitle="Past Sessions" sessionGroup={pastSessions} />
    </div>
  );
};

export default ActivitySessionsCard;
