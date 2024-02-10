import { ChangeEvent, MouseEventHandler, useState } from "react";
import twoFaApi from "../../api/twoFa/twoFa";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";
import Spinner from "../../components/loading/Spinner";
import { UserMiniData } from "../../types/users/users";

interface TwoFaSettingsTabProps {
  user: UserMiniData | null;
}

const TwoFaSettingsTab: React.FC<TwoFaSettingsTabProps> = ({
  user,
}: TwoFaSettingsTabProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!user) return <Spinner />;

  const handleToggleTwoFa = () => {
    twoFaApi.configureTwoFaSession(!user.requiresTwoFa);
  };

  return (
    <>
      <div className="flex h-screen col-span-3 py-20 m1">
        <div className="flex flex-col flex-1 pr-20">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl form-medium">2FA Settings</h1>
            <div className="flex items-center my-4">
              <input
                name="isTwoFaEnabled"
                type="checkbox"
                checked={user.requiresTwoFa}
                className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                onChange={() => setIsDialogOpen(true)}
              />
              <label className="text-lg text-gray-900 ms-2">Enable 2FA</label>
            </div>
            <div
              className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              <p className="font-bold">Protect your data with 2FA</p>
              <p>
                For added security, we recommend you to turn on 2FA. We
                currently on support Singpass 2FA login method, please make sure
                that the full name indicated in your profile corresponds to the
                full name in your NRIC.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <ConfirmationDialog
          message="Are you sure you want to turn on/ off 2FA? You might have to log in again. Also make sure that your full name in the system is the same as your NRIC name."
          onConfirm={handleToggleTwoFa}
          onCancel={() => setIsDialogOpen(false)}
          confirmationLabel="Yes, proceed"
        />
      )}
    </>
  );
};

export default TwoFaSettingsTab;
