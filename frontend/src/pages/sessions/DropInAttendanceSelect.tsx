import Select from "react-select";
import { UserRegistration } from "../../types/registrations/registrations";

interface DropInAttendanceSelectProps {
  registrations: UserRegistration[];
  selectedUserId: number | null;
  onSelectedUserChange: (newId: number | null) => void;
}
const DropInAttendanceSelect: React.FC<DropInAttendanceSelectProps> = ({
  registrations,
  selectedUserId,
  onSelectedUserChange,
}: DropInAttendanceSelectProps) => {
  const notAttendedRegistrations = registrations?.filter((registration) => registration.attendance !== true);
  const notAttendedUserOptions = [
    {value: null, label: ''},
    ...notAttendedRegistrations.map((reg) => ({ value: reg.user.id, label: reg.user.email }))
  ];

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <div className="flex flex-col p-4 bg-white rounded-md shadow w-full">
          <div className="text-md font-medium text-gray-700">Add Attendee</div>
          <form>
            <Select
              name="attendeeId"
              options={notAttendedUserOptions}
              value={notAttendedUserOptions.find((option) => option.value === selectedUserId)}
              onChange={(option) => onSelectedUserChange(option?.value ?? null)}
              styles={{
                valueContainer: (base) => ({ ...base, fontSize: "0.875rem" }),
              }}
              required
            />
          </form>
        </div>
      </div>
    </div>
  )
};

export default DropInAttendanceSelect;
