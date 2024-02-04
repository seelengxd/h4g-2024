import { SessionData } from "../../../types/sessions/sessions";
import SessionMiniCardDateDisplay from "./SessionMiniCardDateDisplay";
import SessionMiniCardRegistrationDisplay from "./SessionMiniCardRegistrationDisplay";
import SessionMiniCardHeader from "./SessionMiniCardHeader";

interface SessionMiniViewCardProps {
  session: SessionData;
}

const SessionMiniViewCard: React.FC<SessionMiniViewCardProps> = ({ session }: SessionMiniViewCardProps) => {  
  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4 h-full">
      <SessionMiniCardHeader session={session} />
      <SessionMiniCardDateDisplay sessionStart={session.start} sessionEnd={session.end} />
      <SessionMiniCardRegistrationDisplay registrations={session.registrations} sessionCapacity={session.activity.capacity}/>
    </div>
  );
}

export default SessionMiniViewCard;
