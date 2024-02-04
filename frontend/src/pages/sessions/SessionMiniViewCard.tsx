import { SessionData } from "../../types/sessions/sessions";
import { isFuture, isPast } from "date-fns";
import OngoingSessionTag from "./tags/OngoingSessionTag";
import PastSessionTag from "./tags/PastSessionTag";
import UpcomingSessionTag from "./tags/UpcomingSessionTag";
import SessionMiniCardDateDisplay from "./SessionMiniCardDateDisplay";
import SessionMiniCardRegistrationDisplay from "./SessionMiniCardRegistrationDisplay";

interface SessionMiniViewCardProps {
  session: SessionData;
}

const SessionMiniViewCard: React.FC<SessionMiniViewCardProps> = ({ session }: SessionMiniViewCardProps) => {
  const statusTag = isPast(session.end)
    ? <PastSessionTag textSize="text-md" px="px-4" textCasing="" />
    : isFuture(session.start)
      ? <UpcomingSessionTag textSize="text-md" px="px-4" textCasing="" />
      : <OngoingSessionTag textSize="text-md" px="px-4" textCasing="" />;
  
  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4 h-full">
      {/* Card Title */}
      <span className="flex items-center justify-between">
        <h2 className="mb-1 text-lg font-medium tracking-tight text-gray-500">
          Activity Session
        </h2>
        {statusTag}
      </span>
      <SessionMiniCardDateDisplay sessionStart={session.start} sessionEnd={session.end} />
      <SessionMiniCardRegistrationDisplay registrations={session.registrations} sessionCapacity={session.activity.capacity}/>
    </div>
  );
}

export default SessionMiniViewCard;
