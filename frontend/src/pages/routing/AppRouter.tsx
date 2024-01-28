import AuthAPI from "../../api/users/auth";
import Spinner from "../../components/loading/Spinner";
import { selectIsLoggedIn, setUser } from "../../reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import React, { useState } from "react";

const AppRouter: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const authApi = new AuthAPI();
  const [loading, setLoading] = useState(true);
  if (!isLoggedIn) {
    authApi
      .getCurrentUser()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((err: Error) => {
        // Possibly due to no token (not logged in yet) / expired access token

        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  return loading ? (
    <div className="h-screen mx-auto">
      <Spinner />
    </div>
  ) : isLoggedIn ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  );
};

export default AppRouter;
