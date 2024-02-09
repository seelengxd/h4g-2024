import Spinner from "../../components/loading/Spinner";
import { UserMiniData } from "../../types/users/users";
import QRCode from "react-qr-code";

interface UserQrTabProps {
  user: UserMiniData | null;
}

const UserQrTab: React.FC<UserQrTabProps> = ({ user }: UserQrTabProps) => {
  if (!user) return <Spinner />;
  return (
    <div className="flex h-screen col-span-3 py-20 m1">
      <div className="flex flex-col flex-1 pr-20">
        <h1 className="pb-2 text-2xl form-medium">My Profile</h1>
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: "30vw",
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
  );
};

export default UserQrTab;
