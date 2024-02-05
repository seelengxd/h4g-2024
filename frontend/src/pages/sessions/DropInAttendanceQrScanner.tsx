import { QrScanner } from "@yudiel/react-qr-scanner";
import { ActivityMiniData } from "../../types/activities/activities";
import {
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Tag from "../../components/dataDisplay/Tag";
import SessionMiniCardDateDisplay from "./minicard/SessionMiniCardDateDisplay";
import SessionMiniCardHeader from "./minicard/SessionMiniCardHeader";
import { SessionData } from "../../types/sessions/sessions";
import UserAttendanceDialog from "./UserAttendanceDialog";
import { useState } from "react";
import { UserRegistration } from "../../types/registrations/registrations";
import _ from "lodash";
import { isNumeric } from "../../utils/miscellaneous";

interface DropInAttendanceQrScannerProps {
  session: SessionData;
  activity: ActivityMiniData;
  registrations: UserRegistration[];
  selectedUserId: number | null;
  setSelectedUserId: (userId: number | null) => void;
  handleMarkAttendance: (registration: UserRegistration) => void;
}

const DropInAttendanceQrScanner: React.FC<DropInAttendanceQrScannerProps> = ({
  session,
  activity,
  registrations,
  selectedUserId,
  setSelectedUserId,
  handleMarkAttendance,
}: DropInAttendanceQrScannerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDecodingPaused, setIsDecodingPaused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDecode = (result: string): void => {
    const noRegErrorMessage = "No registration";
    setIsDecodingPaused(true);
    try {
      if (!isNumeric(result)) throw Error("Invalid user id");
      const userId = Number.parseInt(result);
      const registration = registrations.find(
        (registration) => registration.user.id === userId
      );
      if (!registration) throw new Error(noRegErrorMessage);
      setSelectedUserId(userId);
      setErrorMessage(null);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      if (err instanceof Error && err.message === noRegErrorMessage) {
        setErrorMessage("This user is not registered for the activity");
      } else {
        setErrorMessage(null);
      }
      setSelectedUserId(null);
    }
    setIsDialogOpen(true);
    setIsDecodingPaused(false);
  };

  const onMarkAttended = (): void => {
    const registration = registrations.find(
      (registration) => registration.user.id === selectedUserId
    );
    setSelectedUserId(null);
    if (registration) handleMarkAttendance(registration);
  };

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col p-8 bg-white rounded-md shadow max-w-fit col-span-1">
          <div>
            <QrScanner
              onDecode={onDecode}
              onError={(error) => console.log(error?.message)}
              stopDecoding={isDecodingPaused}
              containerStyle={{ width: 500, height: 500, paddingTop: 0 }}
              videoStyle={{
                width: "100%",
                height: "100%",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col col-span-1 gap-2">
          <div className="flex flex-col p-8 bg-white rounded-md shadow w-full">
            {/* Activity Name */}
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-800">
              {activity.name}
            </h2>

            {/* Activity Organisation */}
            <div className="text-sky-700">
              <Link
                to={`/organisations/${activity.organisationId}`}
                target="_blank"
              >
                <div className="flex items-center underline">
                  {activity.organisationName}
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2 stroke-2 ml-2" />
                </div>
              </Link>
            </div>

            {/* Activity Location */}
            <div className="flex items-center text-md text-gray-700 mb-2">
              <MapPinIcon className="w-5 h-5 mr-2" />
              {activity.location}
            </div>

            {/* Activity Description */}
            <div className="flex text-gray-500">{activity.description}</div>

            <div className="flex mt-4">
              <Tag text={activity.type} textSize="text-sm" />
            </div>
          </div>

          <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4">
            <SessionMiniCardHeader session={session} />
            <SessionMiniCardDateDisplay
              sessionStart={session.start}
              sessionEnd={session.end}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        {isDialogOpen && (
          <UserAttendanceDialog
            registration={registrations.find(
              (registration) => registration.user.id === selectedUserId
            )}
            handleClose={() => setIsDialogOpen(false)}
            handleMarkAttendance={onMarkAttended}
            errorMessage={errorMessage === null ? undefined : errorMessage}
          />
        )}
      </div>
    </div>
  );
};

export default DropInAttendanceQrScanner;
