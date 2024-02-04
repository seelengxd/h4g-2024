import { format, isSameDay } from "date-fns";
import { Session } from "../../types/activities/activities"
import Tag from "../../components/dataDisplay/Tag";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

interface ActivitySessionsCardSessionRowProps {
  session: Session;
  status: string;
  tagBgColor: string;
  tagTextColor: string;
  capacity: number;
}

const ActivitySessionsCardSessionRow: React.FC<ActivitySessionsCardSessionRowProps> = ({ session, status, tagBgColor, tagTextColor, capacity }: ActivitySessionsCardSessionRowProps) => {
  const isOneDaySession = isSameDay(session.start, session.end);
  const dateDisplay = isOneDaySession
    ? `${format(new Date(session.start), "d MMM yyyy")} (${format(new Date(session.start), "hh:mm:aa")} - ${format(new Date(session.start), "hh:mm:aa")})`
    : `${format(new Date(session.start), "d MMM yyyy (hh:mm:aa)")} - ${format(new Date(session.end), "d MMM yyyy (hh:mm:aa)")}`;
  return (
    <div className="grid grid-cols-12 bg-white p-4 rounded-md shadow">
      <div className="col-span-5">{dateDisplay}</div>
      <div className="flex col-span-2 items-center">{<Tag text={status} bgColor={tagBgColor} textColor={tagTextColor} />}</div>
      <div className="flex col-span-3 items-center">{<Tag text={`0 / ${capacity} registrations`} />}</div>
      <div className="col-span-1">
        {/* TODO: feedback/ reflections? */}
      </div>
      <div className="col-span-1"><ArrowRightIcon className="w-6 h-7 mr-4 fill-gray-600 stroke-gray-500 stroke-" /></div>
    </div>
  );
};

export default ActivitySessionsCardSessionRow;
