import authApi from "../../api/users/auth";
import Spinner from "../../components/loading/Spinner";
import Navbar from "../../components/navigation/Navbar";
import SideBar from "../../components/navigation/Sidebar";
import {
  selectIsAdmin,
  selectIsLoggedIn,
  setUser,
} from "../../reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../reducers/hooks";
import AdminApp from "./AdminApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import React, { useState } from "react";
import VolunteerApp from "./VolunteerApp";

const AppRouter: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
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
  return (
    <div>
      {loading ? (
        <div className="h-screen mx-auto">
          <Spinner />
        </div>
      ) : isLoggedIn ? (
        isAdmin ? (
          <div className="relative flex">
            <SideBar />
            {/* to not go into the sidebar */}
            <div className="w-full ml-24">
              <AdminApp />
            </div>
          </div>
        ) : (
          <div className="relative flex">
            <SideBar />
            {/* to not go into the sidebar */}
            <div className="w-full ml-24">
              <VolunteerApp />
            </div>
          </div>
        )
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
};

export default AppRouter;
