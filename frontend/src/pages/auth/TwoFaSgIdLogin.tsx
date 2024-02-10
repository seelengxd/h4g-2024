import twoFaApi from "../../api/twoFa/twoFa";
import authApi from "../../api/users/auth";
import Button from "../../components/buttons/Button";
import TwoFaSgIdButton from "../../components/buttons/TwoFaSgIdButton";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { logOut } from "../../reducers/authSlice";
import { resetTwoFa } from "../../reducers/twoFa";
import { useAppDispatch } from "../../reducers/hooks";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const TwoFaSgIdLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    authApi.logOut().then(() => dispatch(logOut()));
    twoFaApi.deleteTwoFaSession().then(() => dispatch(resetTwoFa()));
  };

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="flex items-center justify-center p-6 h-screen mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center text-center justify-center px-8 pb-12 pt-6 bg-white rounded-md shadow min-w-96 max-w-2xl gap-4">
          <div className="flex justify-between min-w-full">
            <Button bgColor="white" textColor="text-black" onClick={handleBack}>
              <ArrowLeftIcon className="w-6 h-6 mr-2 stroke-2" />
              Back to Login
            </Button>
            <Link
              to="https://github.com/seelengxd/h4g-2024/issues/new"
              className="p-4 flex flex-row"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 mr-2 stroke-2" />
              Get help
            </Link>
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
