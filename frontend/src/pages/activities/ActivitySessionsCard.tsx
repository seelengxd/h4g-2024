import isWithinInterval from "date-fns/isWithinInterval";
import { isFuture, isPast } from "date-fns";
import ActivitySessionGroup from "./ActivitySessionGroup";
import Tag from "../../components/dataDisplay/Tag";
import { SessionMiniData } from "../../types/sessions/sessions";
import OngoingSessionTag from "../sessions/tags/OngoingSessionTag";
import UpcomingSessionTag from "../sessions/tags/UpcomingSessionTag";
import PastSessionTag from "../sessions/tags/PastSessionTag";

interface ActivitySessionsCardProps {
  sessions: SessionMiniData[];
  capacity: number;
}

const ActivitySessionsCard: React.FC<ActivitySessionsCardProps> = ({ sessions, capacity }: ActivitySessionsCardProps) => {
  const pastSessions = sessions.filter((session) => isPast(session.end));
  const futureSessions = sessions.filter((session) => isFuture(session.start));
  const ongoingSessions = sessions.filter((session) =>
    isWithinInterval(new Date(), { start: session.start, end: session.end })
  );

  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow">
      <div className="flex gap-6 items-center">
        <h1 className="text-2xl font-semibold">Activity Sessions</h1>
        <Tag text={`Session Capacity: ${capacity}`} textSize="text-sm" textCasing="" px="px-4" />
      </div>

      { sessions.length === 0 && "No sessions found" }

      <ActivitySessionGroup sessionGroupTitle="Ongoing Session" sessionGroup={ongoingSessions} statusTag={<OngoingSessionTag />} capacity={capacity} />
      <ActivitySessionGroup sessionGroupTitle="Upcoming Session" sessionGroup={futureSessions} statusTag={<UpcomingSessionTag />} capacity={capacity}/>
      <ActivitySessionGroup sessionGroupTitle="Past Session" sessionGroup={pastSessions} statusTag={<PastSessionTag />} capacity={capacity} />
    </div>
  );
};

export default ActivitySessionsCard;
