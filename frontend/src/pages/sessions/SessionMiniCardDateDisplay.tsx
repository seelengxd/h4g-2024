import { isSameDay, format, differenceInHours, differenceInMinutes, differenceInDays } from "date-fns";

interface SessionMiniCardDateDisplayProps {
  sessionStart: Date;
  sessionEnd: Date;
}

const SessionMiniCardDateDisplay: React.FC<SessionMiniCardDateDisplayProps> = ({ sessionStart, sessionEnd }: SessionMiniCardDateDisplayProps) => {
  const isOneDaySession = isSameDay(sessionStart, sessionEnd);
  const numMinutes = differenceInMinutes(sessionEnd, sessionStart);
  const numHours = differenceInHours(sessionEnd, sessionStart);
  const numDays = differenceInDays(sessionEnd, sessionStart);

  if (isOneDaySession) {
    const sessionDurationDisplay = `${numHours} Hours ${numMinutes - 60 * numHours} Minutes`;
    return (
      <div className="flex flex-col gap-4">
        {/* Start date */}
        <div className="flex flex-col gap-2">
          <h5 className="text-gray-500 font-medium text-md">Session Date</h5>
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
            {format(new Date(sessionStart), "d MMM yyyy, iiii")}
          </h2>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            {/* Start time */}
            <div className="flex flex-col gap-2">
              <h5 className="text-gray-500 font-medium text-md">Start Time</h5>
              <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
                {format(new Date(sessionStart), "hh:mm:aa")}
              </h2>
            </div>
          </div>

          <div className="col-span-1">
            {/* End time */}
            <div className="flex flex-col gap-2">
              <h5 className="text-gray-500 font-medium text-md">End Time</h5>
              <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
                {format(new Date(sessionEnd), "hh:mm:aa")}
              </h2>
            </div>
          </div>
        </div>
      
        {/* Duration */}
        <div className="flex flex-row gap-4 items-center">
          <h5 className="text-gray-500 font-medium text-md">Total Duration</h5>
          <h2 className="text-medium font-semi tracking-tight text-gray-00">
            {sessionDurationDisplay}
          </h2>
        </div>
      </div>
    );
  }

  const sessionDurationDisplay = numHours > 24
    ? `${numDays} Days ${numHours - 24 * numDays} Hours`
    : `${numHours} Hours ${numMinutes - 60 * numHours} Minutes`;

  return (
    <div className="flex flex-col gap-4">
      {/* Start datetime */}
      <div className="flex flex-col gap-2">
        <h5 className="text-gray-500 font-medium text-md">Start Date</h5>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
          {format(new Date(sessionStart), "d MMM yyyy, iiii (hh:mm:aa)")}
        </h2>
      </div>

      {/* End datetime */}
      <div className="flex flex-col gap-2">
        <h5 className="text-gray-500 font-medium text-md">End Date</h5>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
          {format(new Date(sessionEnd), "d MMM yyyy, iiii (hh:mm:aa)")}
        </h2>
      </div>

      {/* Duration */}
      <div className="flex flex-row gap-4 items-center">
        <h5 className="text-gray-500 font-medium text-md">Total Duration</h5>
        <h2 className="text-medium font-semi tracking-tight text-gray-00">
          {sessionDurationDisplay}
        </h2>
      </div>
    </div>
  );
}

export default SessionMiniCardDateDisplay;
