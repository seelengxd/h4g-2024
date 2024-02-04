import Tag from "../../../components/dataDisplay/Tag";
import { RegistrationMiniData } from "../../../types/registrations/registrations";

interface SessionMiniCardRegistrationDisplayProps {
  registrations: RegistrationMiniData[];
  sessionCapacity: number;
}

const SessionMiniCardRegistrationDisplay: React.FC<SessionMiniCardRegistrationDisplayProps> = ({
  registrations,
  sessionCapacity
}: SessionMiniCardRegistrationDisplayProps) => {
  const sessionIsFull = registrations.length >= sessionCapacity;
  return (
    <div className="grid grid-cols-2">
        <div className="flex flex-row gap-4 items-center col-span-1">
          <h5 className="text-gray-500 font-medium text-md">Total Registrations</h5>
          <div className="flex flex-row gap-4">
            <h2 className="text-medium font-semi tracking-tight text-gray-00">
              {registrations.length}
            </h2>
            {sessionIsFull && <Tag text="full" bgColor="bg-orange-200" textColor="text-orange-600"/>}
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center col-span-1">
          <h5 className="text-gray-500 font-medium text-md">Session Capacity</h5>
          <h2 className="text-medium font-semi tracking-tight text-gray-00">
            {sessionCapacity}
          </h2>
        </div>
      </div>
  );
};

export default SessionMiniCardRegistrationDisplay;
