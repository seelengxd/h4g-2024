import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import { UserRegistration } from "../../types/registrations/registrations";
import { displayAttendance } from "../../utils/registrations";
import UserAttendanceDialogUserDetails from "./UserAttendanceDialogUserDetails";

interface UserAttendanceDialogProps {
  registration?: UserRegistration;
  errorMessage?: string;
  handleClose: () => void;
  handleMarkAttendance: () => void;
}

const UserAttendanceDialog: React.FC<UserAttendanceDialogProps> = ({
  registration,
  errorMessage = "Hm, no such user was found in the database",
  handleClose,
  handleMarkAttendance,
}: UserAttendanceDialogProps) => {
  if (!registration) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 confirm-dialog">
        <div className="flex flex-col p-8 bg-white rounded-md shadow w-6/12">
          <h2 className="text-3xl text-gray-700 font-bold mb-4">
            No registration found
          </h2>
          <h2 className="text-lg text-gray-700 mb-4">{errorMessage}</h2>
          <div className="flex flex-row gap-8 justify-end">
            <div />
            <Button roundness="md" onClick={handleClose}>
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { user, attendance } = registration;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 confirm-dialog">
      <div className="flex flex-col p-8 bg-white rounded-md shadow w-7/12">
        {/* Header */}
        <h2 className="text-3xl text-gray-700 font-bold">
          Hello, {user.preferredName}
        </h2>

        {attendance && (
          <div className="flex flex-row gap-2 p-4 mt-4 bg-green-200 bg-opacity-50 text-green-700 font-medium">
            <CheckCircleIcon className="w-6 h-6" />
            <span>User has already been marked as attended</span>
          </div>
        )}

        <div className="flex flex-col gap-8 mt-4">
          {/* Registrant Details */}
          <UserAttendanceDialogUserDetails user={user} />

          {/* Attendance Details */}
          <div className="grid grid-cols-2 gap-2 max-w-lg">
            <h5 className="font-medium text-md text-gray-600 col-span-2">
              Attendance Details
            </h5>

            {/* Full Name */}
            <span className="col-span-1 font-medium text-md text-gray-500">
              Attendance
            </span>
            <span className="col-span-1 text-md">
              {displayAttendance(attendance)}
            </span>
          </div>

          {/* Entrollment Details */}
          <div className="grid grid-cols-2 gap-2 max-w-lg">
            <h5 className="font-medium text-md text-gray-600 col-span-2">
              Enrollment Form
            </h5>

            <h5 className="font-medium text-md text-gray-400 col-span-2">
              No Enrollment Form Submission Found
            </h5>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-8 justify-end">
          <div />
          <Button
            roundness="md"
            bgColor="white"
            textColor="text-primary-700"
            outlined
            outlineColor="border-primary-700"
            onClick={handleClose}
          >
            {!attendance ? "Cancel" : "OK"}
          </Button>
          {!attendance && (
            <Button roundness="md" onClick={handleMarkAttendance}>
              Mark {user.preferredName} as Attended
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAttendanceDialog;
