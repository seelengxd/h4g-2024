import { isPast, isFuture } from "date-fns";
import { SessionData } from "../../../types/sessions/sessions";
import OngoingSessionTag from "../tags/OngoingSessionTag";
import PastSessionTag from "../tags/PastSessionTag";
import UpcomingSessionTag from "../tags/UpcomingSessionTag";

interface SessionMiniCardHeaderProps {
  session: SessionData;
}

const SessionMiniCardHeader: React.FC<SessionMiniCardHeaderProps> = ({session}: SessionMiniCardHeaderProps) => {
  const statusTag = isPast(session.end)
  ? <PastSessionTag textSize="text-md" px="px-4" textCasing="" />
  : isFuture(session.start)
    ? <UpcomingSessionTag textSize="text-md" px="px-4" textCasing="" />
    : <OngoingSessionTag textSize="text-md" px="px-4" textCasing="" />;
  return (
    <span className="flex items-center justify-between">
    <h2 className="mb-1 text-lg font-medium tracking-tight text-gray-600">
      Activity Session
    </h2>
    {statusTag}
  </span>
  )
};

export default SessionMiniCardHeader;
