import Button from "../../components/buttons/Button";
import TwoFaSgIdButton from "../../components/buttons/TwoFaSgIdButton";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const TwoFaSgIdLogin: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="flex items-center justify-center p-6 h-screen mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center text-center justify-center px-8 pb-12 pt-6 bg-white rounded-md shadow min-w-96 max-w-2xl gap-4">
          <div className="flex items-left min-w-full">
            <Button bgColor="white" textColor="text-black">
              <ArrowLeftIcon className="w-6 h-6 mr-2 stroke-2" />
              Back to Login
            </Button>
          </div>
          <LockClosedIcon className="w-16 h-16" />
          <h2 className="text-2xl font-medium">
            Two-factor authentication enabled
          </h2>
          <p className="text-gray-600 mb-4">
            Two-factor authentication (2FA) has been enabled on your account.
            Please click on the button below and login to your Singpass app to
            proceed.
          </p>
          <TwoFaSgIdButton />
        </div>
      </div>
    </div>
  );
};

export default TwoFaSgIdLogin;
