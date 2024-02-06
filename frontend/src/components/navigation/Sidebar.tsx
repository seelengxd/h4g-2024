import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  DocumentArrowDownIcon,
  FireIcon,
  HeartIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../reducers/hooks";
import { logOut, selectIsAdmin } from "../../reducers/authSlice";
import authApi from "../../api/users/auth";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { ChartBarIcon } from "@heroicons/react/24/solid";

const volunteerContent = [
  {
    label: "My Profile",
    icon: <UserIcon className="w-8 h-8 fill-white" />,
    linkTo: "/profile",
  },
  {
    label: "Dashboard",
    icon: <RectangleGroupIcon className="w-8 h-8 fill-white" />,
    linkTo: "/",
  },
  {
    label: "Events",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/activities",
  },
  {
    label: "Your Activity",
    icon: <HeartIcon className="w-8 h-8 fill-white" />,
    linkTo: "/your-activities",
  },
  {
    label: "Blog",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/blog",
  },
  {
    label: "Certificates",
    icon: <DocumentArrowDownIcon className="w-8 h-8 fill-white" />,
    linkTo: "/certificates",
  },
  {
    label: "Log out",
    icon: <ArrowLeftStartOnRectangleIcon className="w-8 h-8 fill-white" />,
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
    icon: <FireIcon className="w-8 h-8 fill-white" />,
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
    label: "Log out",
    icon: <ArrowLeftStartOnRectangleIcon className="w-8 h-8 fill-white" />,
    linkTo: "/dummy",
  },
];

const SideBar: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const isAdmin = useSelector(selectIsAdmin);
  const [active, setActive] = useState(false);

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
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 z-20">
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
                      onClick={handleLogout}
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
                "flex items-center w-full gap-8 p-4 text-white rounded-3xl cursor-pointer hover:bg-primary-500"
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
                      onClick={handleLogout}
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
