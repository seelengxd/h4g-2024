import { UserMiniData } from "../../types/users/users";

interface UserAttendanceDialogUserDetailsProps {
  user: UserMiniData;
}

const UserAttendanceDialogUserDetails: React.FC<
  UserAttendanceDialogUserDetailsProps
> = ({ user }: UserAttendanceDialogUserDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 max-w-lg">
      <h5 className="font-medium text-md text-gray-600 col-span-2">
        Registrant Details
      </h5>

      {/* Full Name */}
      <span className="col-span-1 font-medium text-md text-gray-500">
        Full Name
      </span>
      <span className="col-span-1 text-md">{user.fullName}</span>

      {/* Preferred Name */}
      <span className="col-span-1 font-medium text-md text-gray-500">
        Preferred Name
      </span>
      <span className="col-span-1 text-md">{user.preferredName}</span>

      {/* Email */}
      <span className="col-span-1 font-medium text-md text-gray-500">
        Email
      </span>
      <span className="col-span-1 text-md">{user.email}</span>
    </div>
  );
};

export default UserAttendanceDialogUserDetails;
