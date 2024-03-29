import {
  Bars3Icon,
  BuildingOffice2Icon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../reducers/hooks";
import { logOut, selectIsAdmin } from "../../reducers/authSlice";
import authApi from "../../api/users/auth";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/24/solid";
import {
  BlogWritingIcon,
  CertificateIcon,
  DashboardIcon,
  EventsCalendarIcon,
  LogoutIcon,
  ProfileIcon,
  VolunteerKindnessCareHeartLoveIcon,
} from "../icons/icons";
import ConfirmationDialog from "../feedback/ConfirmationDialog";
import twoFaApi from "../../api/twoFa/twoFa";
import { resetTwoFa } from "../../reducers/twoFa";

const volunteerContent = [
  {
    label: "My Profile",
    icon: <ProfileIcon className="w-8 h-8 stroke-white fill-white" />,
    linkTo: "/profile",
  },
  {
    label: "Dashboard",
    icon: <DashboardIcon className="w-8 h-8 stroke-2 stroke-white" />,
    linkTo: "/",
  },
  {
    label: "Events",
    icon: <EventsCalendarIcon className="w-8 h-8 fill-white" />,
    linkTo: "/activities",
  },
  {
    label: "Your Activity",
    icon: <VolunteerKindnessCareHeartLoveIcon className="w-8 h-8 fill-white" />,
    linkTo: "/your-activities",
  },
  {
    label: "Blog",
    icon: <BlogWritingIcon className="w-8 h-8 fill-white" />,
    linkTo: "/blogs",
  },
  // {
  //   label: "Certificates",
  //   icon: <CertificateIcon className="w-8 h-8 fill-white" />,
  //   linkTo: "/certificates",
  // },
  {
    label: "Log out",
    icon: <LogoutIcon className="w-8 h-8 stroke-white" />,
    linkTo: "/dummy",
  },
];

const adminContent = [
  {
    label: "Volunteers",
    icon: <UserGroupIcon className="w-8 h-8 fill-white" />,
    linkTo: "/volunteers",
  },
  {
    label: "Activities",
    icon: <VolunteerKindnessCareHeartLoveIcon className="w-8 h-8 fill-white" />,
    linkTo: "/activities",
  },
  {
    label: "Organisations",
    icon: <BuildingOffice2Icon className="w-8 h-8 fill-white" />,
    linkTo: "/organisations",
  },
  {
    label: "Volunteer Activity Report",
    icon: <ChartBarIcon className="w-8 h-8 fill-white" />,
    linkTo: "/volunteer-activity-report",
  },
  {
    label: "Volunteer Demographic Report",
    icon: <ChartPieIcon className="w-8 h-8 fill-white" />,
    linkTo: "/volunteer-demographic-report",
  },
  {
    label: "Log out",
    icon: <LogoutIcon className="w-8 h-8 stroke-white" />,
    linkTo: "/dummy",
  },
];

const SideBar: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const isAdmin = useSelector(selectIsAdmin);
  const [active, setActive] = useState(false);
  const [openLogOutDialog, setOpenLogOutDialog] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      event.target !== buttonRef.current
    ) {
      setActive(false);
    }
  };

  const content = isAdmin ? adminContent : volunteerContent;

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    authApi.logOut().then(() => dispatch(logOut()));
    twoFaApi.deleteTwoFaSession().then(() => dispatch(resetTwoFa()));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 z-20">
      {openLogOutDialog && (
        <ConfirmationDialog
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setOpenLogOutDialog(false)}
          confirmationLabel="Yes, log me out"
        />
      )}
      <div
        className={
          "relative h-screen group bg-primary-600 " +
          (active ? " w-96" : "w-24")
        }
        ref={menuRef}
      >
        {/* Display when inactive */}
        <div className="flex flex-col justify-center h-screen">
          <div
            className={
              "flex-col items-center space-y-12" +
              (active ? " hidden" : " flex")
            }
          >
            <div
              className={"p-4 rounded-xl cursor-pointer hover:bg-primary-500"}
              onClick={() => setActive(true)}
            >
              {<Bars3Icon className="w-8 h-8 fill-white" />}
            </div>
            <div className="flex flex-col items-center space-y-6">
              {content.map(({ label, icon, linkTo }) => {
                if (label === "Log out") {
                  return (
                    <div
                      className={
                        "p-4 rounded-xl flex items-center gap-8 hover:cursor-pointer hover:bg-primary-500"
                      }
                      onClick={() => setOpenLogOutDialog(true)}
                    >
                      {icon}
                    </div>
                  );
                }
                return (
                  <Link
                    to={linkTo}
                    className={
                      "p-4 rounded-xl hover:bg-primary-500" +
                      ((
                        linkTo !== "/"
                          ? pathName.startsWith(linkTo)
                          : linkTo === pathName
                      )
                        ? " bg-primary-500"
                        : "")
                    }
                  >
                    {icon}
                  </Link>
                );
              })}
            </div>
          </div>
          <div
            className={
              "flex-col px-8 space-y-12 text-white transition " +
              (active ? "flex" : "hidden")
            }
          >
            <div
              className={
                "flex items-center w-full gap-8 p-4 text-white rounded-3xl cursor-pointer"
              }
              ref={buttonRef}
              onClick={() => setActive(false)}
            >
              {<Bars3Icon className="w-8 h-8" />}{" "}
              <img
                src="/bigatheart.png"
                className="w-auto h-8"
                alt="bigatheart"
              />
              <span className="text-2xl font-bold">Big At Heart</span>
            </div>

            <div className="flex flex-col space-y-6">
              {content.map(({ label, icon, linkTo }) => {
                const isPage =
                  linkTo !== "/"
                    ? pathName.startsWith(linkTo)
                    : linkTo === pathName;
                if (label === "Log out") {
                  return (
                    <div
                      className={
                        "p-4 rounded-xl flex items-center gap-8 hover:cursor-pointer hover:bg-primary-500"
                      }
                      onClick={() => setOpenLogOutDialog(true)}
                    >
                      {icon} {label}
                    </div>
                  );
                }
                return (
                  <Link
                    to={linkTo}
                    className={
                      "p-4 rounded-xl flex items-center gap-8 hover:bg-primary-500" +
                      (isPage ? " bg-primary-500" : "")
                    }
                  >
                    {icon} {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
