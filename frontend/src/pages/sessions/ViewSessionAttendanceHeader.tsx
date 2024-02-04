import { isSameDay, format } from "date-fns";
import { SessionData } from "../../types/sessions/sessions"
import Tag from "../../components/dataDisplay/Tag";
import Button from "../../components/buttons/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface ViewSessionAttendanceHeaderProps {
  session: SessionData;
}

const ViewSessionAttendanceHeader: React.FC<ViewSessionAttendanceHeaderProps> = ({session}: ViewSessionAttendanceHeaderProps) => {
  const isOneDaySession = isSameDay(session.start, session.end);
  const dateDisplay = isOneDaySession
    ? `${format(new Date(session.start), "d MMM yyyy")} (${format(new Date(session.start), "hh:mm:aa")} - ${format(new Date(session.start), "hh:mm:aa")})`
    : `${format(new Date(session.start), "d MMM yyyy (hh:mm:aa)")} - ${format(new Date(session.end), "d MMM yyyy (hh:mm:aa)")}`;
  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4">
      <div className="grid grid-cols-12 items-center">
        <div className="flex col-span-3 max-h-12">
          <Button>
            <Link to={`../sessions/${session.id}`}>
              <Button px={4}>
                <ArrowLeftIcon className="w-4 h-4 mr-2 stroke-2" />
                Back to Session
              </Button>
            </Link>
          </Button>
        </div>
        <div className="flex flex-col col-span-9">
          <span className="text-sm text-gray-600 font-semibold mb-2">Viewing attendance data for</span>
          <div className="flex gap-2 mb-2">
            <Tag text={session.activity.name} />
            <Tag text={dateDisplay} />
          </div>
          <h3 className="text-sm text-gray-600">{session.activity.organisationName}</h3>
        </div>
      </div>
    </div>
  );
};

export default ViewSessionAttendanceHeader;
