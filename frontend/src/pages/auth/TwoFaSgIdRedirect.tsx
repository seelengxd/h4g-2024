import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import twoFaApi from "../../api/twoFa/twoFa";

export interface UserInfo {
  sub: string;
  data: {
    "myinfo.name": string;
    iceCream: string;
  };
}

const TwoFaSgIdRedirect: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    twoFaApi
      .hasTwoFaSession()
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="flex items-center justify-center p-6 h-screen mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center text-center justify-center px-10 py-12 bg-white rounded-md shadow min-w-96 max-w-2xl gap-4">
          {isLoading && <Spinner />}

          {!isLoading && !user && (
            <>
              <XCircleIcon className="w-16 h-16 stroke-red-500" />
              <h2 className="text-2xl">Uh oh... Something went wrong</h2>
              <h3 className="text-md text-gray-700">
                Could not validate your identity! Redirecting you in a moment...
              </h3>
            </>
          )}

          {!isLoading && user && (
            <>
              <CheckCircleIcon className="w-16 h-16 stroke-green-500" />
              <h2 className="text-2xl">
                Success! Redirecting you in a moment...
              </h2>
            </>
          )}

          {!isLoading && (
            <div className="flex w-full justify-end">
              <div
                className="flex flex-row items-center gap-4 mt-4 text-blue-800"
                onClick={() => navigate("/")}
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
