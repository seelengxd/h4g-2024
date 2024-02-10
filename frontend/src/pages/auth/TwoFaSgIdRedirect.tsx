import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import twoFaApi from "../../api/twoFa/twoFa";
import authApi from "../../api/users/auth";
import { logOut } from "../../reducers/authSlice";
import { useAppDispatch } from "../../reducers/hooks";
import { resetTwoFa, setUserTwoFaData } from "../../reducers/twoFa";
import { UserTwoFaData } from "../../types/twoFa/twoFa";

export interface UserInfo extends UserTwoFaData {
  sub: string;
  data: {
    "myinfo.name": string;
  };
}

const TwoFaSgIdRedirect: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    twoFaApi
      .getUserInfo()
      .then((data) => {
        setUser(data);
        dispatch(setUserTwoFaData(data));
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => navigate("/"), 2500);
      });
  }, [navigate, dispatch]);

  const handleResetTwoFa = () => {
    authApi.logOut().then(() => dispatch(logOut()));
    twoFaApi.deleteTwoFaSession().then(() => dispatch(resetTwoFa()));
    navigate("/");
  };

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="flex items-center justify-center p-6 h-screen mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center text-center justify-center px-10 py-12 bg-white rounded-md shadow min-w-96 max-w-2xl gap-4">
          {isLoading && <Spinner />}

          {!isLoading && !user && (
            <>
              <div className="flex flex-row">
                <XCircleIcon className="w-16 h-16 stroke-red-500" />
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                </span>
              </div>
              <h2 className="text-2xl font-medium">
                Uh oh... Something went wrong
              </h2>
              <h3 className="text-md text-gray-700">
                Could not validate your identity! Redirecting you in a moment...
              </h3>
            </>
          )}

          {!isLoading && user && (
            <>
              <div className="flex flex-row">
                <CheckCircleIcon className="w-16 h-16 stroke-green-500" />
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                </span>
              </div>
              <h2 className="text-2xl font-medium">
                Hello, {user.data["myinfo.name"]}
              </h2>
              <h3 className="text-md text-gray-700">
                Success! Redirecting you in a moment...
              </h3>
            </>
          )}

          {!isLoading && (
            <div className="flex w-full justify-end">
              <div
                className="flex flex-row items-center gap-4 mt-4 text-blue-800"
                onClick={() => (!user ? handleResetTwoFa() : navigate("/"))}
              >
                <span className="pointer-cursor">Redirect me now</span>
                <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoFaSgIdRedirect;
