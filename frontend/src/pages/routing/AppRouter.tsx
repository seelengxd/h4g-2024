import authApi from "../../api/users/auth";
import Spinner from "../../components/loading/Spinner";
import Navbar from "../../components/navigation/Navbar";
import { selectIsLoggedIn, setUser } from "../../reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import React, { useState } from "react";

const AppRouter: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  if (!isLoggedIn) {
    authApi
      .getCurrentUser()
      .then((user) => {
        console.log({ user });
        dispatch(setUser(user));
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="h-screen mx-auto">
          <Spinner />
        </div>
      ) : isLoggedIn ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
};

export default AppRouter;
