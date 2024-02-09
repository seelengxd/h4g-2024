import { isSameDay, format } from "date-fns";
import { SessionData } from "../../types/sessions/sessions";
import Tag from "../../components/dataDisplay/Tag";
import Button from "../../components/buttons/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface ViewSessionAttendanceHeaderProps {
  session: SessionData;
}

const ViewSessionAttendanceHeader: React.FC<
  ViewSessionAttendanceHeaderProps
> = ({ session }: ViewSessionAttendanceHeaderProps) => {
  const isOneDaySession = isSameDay(session.start, session.end);
  const dateDisplay = isOneDaySession
    ? `${format(new Date(session.start), "d MMM yyyy")} (${format(
        new Date(session.start),
        "hh:mm:aa"
      )} - ${format(new Date(session.start), "hh:mm:aa")})`
    : `${format(new Date(session.start), "d MMM yyyy (hh:mm:aa)")} - ${format(
        new Date(session.end),
        "d MMM yyyy (hh:mm:aa)"
      )}`;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow">
      <div className="grid items-center grid-cols-12">
        <div className="flex col-span-3 max-h-12">
          {/* Comment this out to revert back button change */}
          {/* <Button>
            <Link to={`../sessions/${session.id}`}>
              <Button px={4}>
                <ArrowLeftIcon className="w-4 h-4 mr-2 stroke-2" />
                Back to Session
              </Button>
            </Link>
          </Button> */}
          <Link
            to={"/sessions/" + session.id}
            className="flex items-center text-xl font-bold"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
            Back to Session
          </Link>
        </div>
        <div className="flex flex-col col-span-9">
          <span className="mb-2 text-sm text-gray-600">
            <span className="font-semibold">Viewing attendance data for </span>
            {session.activity.organisationName}
          </span>
          <div className="flex gap-2 mb-2">
            <Tag text={session.activity.name} />
            <Tag text={dateDisplay} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSessionAttendanceHeader;
