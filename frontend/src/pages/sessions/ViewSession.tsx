import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sessionApi from "../../api/sessions/sessions";
import { SessionData } from "../../types/sessions/sessions";
import { Error404 } from "../routing/VolunteerApp";
import Spinner from "../../components/loading/Spinner";
import { isSameDay, format } from "date-fns";

const ViewSession: React.FC = () => {
  const { id } = useParams();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      sessionApi
        .getSession(parseInt(id))
        .then((session) => setSession(session))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (!id) return Error404;
  if (isLoading) return <Spinner />;
  if (!session) return Error404;

  const isOneDaySession = isSameDay(session.start, session.end);
  const dateDisplay = isOneDaySession
    ? `${format(new Date(session.start), "d MMM yyyy")} (${format(new Date(session.start), "hh:mm:aa")} - ${format(new Date(session.start), "hh:mm:aa")})`
    : `${format(new Date(session.start), "d MMM yyyy (hh:mm:aa)")} - ${format(new Date(session.end), "d MMM yyyy (hh:mm:aa)")}`;
  
  return (
    <div>
      <h1>{session.id}</h1>
      <h1>{dateDisplay}</h1>
    </div>
  );
}

export default ViewSession;
