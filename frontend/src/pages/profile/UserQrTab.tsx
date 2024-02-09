import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Spinner from "../../components/loading/Spinner";
import { Profile } from "../../types/users/profiles";
import { UserMiniData } from "../../types/users/users";
import QRCode from "react-qr-code";
import Tooltip from "../../components/feedback/Tooltip";

interface UserQrTabProps {
  user: UserMiniData | null;
  profile?: Profile;
}

const UserQrTab: React.FC<UserQrTabProps> = ({
  user,
  profile,
}: UserQrTabProps) => {
  if (!user) return <Spinner />;
  return (
    <div className="flex h-screen col-span-3 py-20 m1">
      <div className="flex flex-col flex-1 pr-20">
        <div className="flex gap-4">
          <h1 className="text-2xl form-medium">My QR Code</h1>
          <InformationCircleIcon
            data-tooltip-target="tooltip-default"
            className="w-8 h-8"
          />
          <Tooltip label="For attendance taking" />
        </div>
        <div className="flex flex-col p-8 items-center">
          <div className="flex flex-col col-span-1 p-12 pt-8 rounded-md shadow max-w-fit bg-primary-600">
            <div className="flex flex-col items-center text-center mb-8 gap-4">
              <div className="flex items-center justify-center w-24 h-24 overflow-hidden rounded-full">
                <img
                  className="object-contain"
                  src={profile?.imageUrl}
                  alt="uploaded"
                />
              </div>
              <h3 className="w-full text-2xl font-semibold text-white">
                {user.fullName}
              </h3>
            </div>
            <div className="flex flex-col col-span-1 p-8 bg-white rounded-md shadow max-w-fit">
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  minWidth: "20vw",
                  maxWidth: "40vw",
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={user.id.toString()}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserQrTab;
