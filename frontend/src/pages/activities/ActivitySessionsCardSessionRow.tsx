import { format, isSameDay } from "date-fns";
import { SessionData, SessionMiniData } from "../../types/sessions/sessions";
import Tag from "../../components/dataDisplay/Tag";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface ActivitySessionsCardSessionRowProps {
  session: SessionData;
  statusTag: JSX.Element;
  capacity: number;
}

const ActivitySessionsCardSessionRow: React.FC<
  ActivitySessionsCardSessionRowProps
> = ({ session, statusTag, capacity }: ActivitySessionsCardSessionRowProps) => {
  const navigate = useNavigate();
  const isOneDaySession = isSameDay(session.start, session.end);
  const dateDisplay = isOneDaySession
    ? `${format(new Date(session.start), "d MMM yyyy")} (${format(
        new Date(session.start),
        "hh:mm:aa"
      )} - ${format(new Date(session.end), "hh:mm:aa")})`
    : `${format(new Date(session.start), "d MMM yyyy (hh:mm:aa)")} - ${format(
        new Date(session.end),
        "d MMM yyyy (hh:mm:aa)"
      )}`;

  return (
    <div className="grid grid-cols-12 p-4 bg-white rounded-md shadow">
      <div className="col-span-5">{dateDisplay}</div>
      <div className="flex items-center col-span-2">{statusTag}</div>
      <div className="flex items-center col-span-3">
        {
          <Tag
            text={`${session.registrations.length} / ${capacity} registrations`}
          />
        }
      </div>
      <div className="col-span-1">{/* TODO: feedback/ reflections? */}</div>
      <div className="col-span-1 cursor-pointer">
        <ArrowRightIcon
          className="w-6 mr-4 h-7 fill-gray-600 stroke-gray-500"
          onClick={() => navigate(`/sessions/${session.id}`)}
        />
      </div>
    </div>
  );
};

export default ActivitySessionsCardSessionRow;
