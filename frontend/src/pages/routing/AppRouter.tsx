import authApi from "../../api/users/auth";
import Spinner from "../../components/loading/Spinner";
import SideBar from "../../components/navigation/Sidebar";
import {
  selectIsAdmin,
  selectIsLoggedIn,
  setUser,
} from "../../reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import AdminApp from "./AdminApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import React, { useEffect, useState } from "react";
import VolunteerApp from "./VolunteerApp";
import TwoFaApp from "./TwoFaApp";
import { isTwoFaAuthenticated, setUserTwoFaData } from "../../reducers/twoFa";
import twoFaApi from "../../api/twoFa/twoFa";

const AppRouter: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const hasTwoFaAuthentication = useAppSelector(isTwoFaAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  if (!isLoggedIn) {
    authApi
      .getCurrentUser()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      twoFaApi
        .hasTwoFaSession()
        .then((data) => dispatch(setUserTwoFaData(data)))
        .catch((err: Error) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn, dispatch]);

  if (loading) {
    return (
      <div className="h-screen mx-auto">
        <Spinner />
      </div>
    );
  }

  if (!isLoggedIn) return <UnauthenticatedApp />;
  if (!hasTwoFaAuthentication) return <TwoFaApp />;

  return (
    <div>
      <div className="relative flex h-screen overflow-y-clip">
        {/* to not go into the sidebar */}
        <div className="w-full max-h-screen ml-24 overflow-y-auto">
          <SideBar />
          {isAdmin ? <AdminApp /> : <VolunteerApp />}
        </div>
      </div>
    </div>
  );
};

export default AppRouter;
