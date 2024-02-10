import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Spinner from "../../../components/loading/Spinner";
import { Profile } from "../../../types/users/profiles";
import { UserMiniData } from "../../../types/users/users";
import QRCode from "react-qr-code";

interface ProfileUserQrTabProps {
  user: UserMiniData | null;
  profile?: Profile;
}

const ProfileUserQrTab: React.FC<ProfileUserQrTabProps> = ({
  user,
  profile,
}: ProfileUserQrTabProps) => {
  if (!user) return <Spinner />;
  return (
    <div className="flex h-screen col-span-3 py-20 m1">
      <div className="flex flex-col flex-1 pr-20">
        <div className="flex gap-4">
          <h1 className="text-2xl form-medium">My QR Code</h1>
          <div className="relative group w-max">
            <InformationCircleIcon
              data-tooltip-target="tooltip-default"
              className="w-8 h-8"
            />
            <span className="absolute p-2 text-white transition-opacity rounded-md opacity-0 pointer-events-none w-max group-hover:opacity-100 group-hover:bg-gray-500/90">
              Scan your QR code for attendance taking and sharing your profile!
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center p-8">
          <div className="flex flex-col col-span-1 p-12 pt-8 rounded-md shadow max-w-fit bg-primary-600">
            <div className="flex flex-col items-center gap-4 mb-8 text-center">
              <div className="flex items-center justify-center w-24 h-24 overflow-hidden rounded-full">
                <img
                  className="object-contain"
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                      "/" +
                      profile?.imageUrl || ""
                  }
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

export default ProfileUserQrTab;
