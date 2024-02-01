import { CalendarDaysIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const content = [
  {
    label: "Dashboard",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/",
  },
  {
    label: "Events",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/events",
  },
  {
    label: "Your Activity",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/activities",
  },
  {
    label: "Blog",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/blog",
  },
  {
    label: "Certificates",
    icon: <CalendarDaysIcon className="w-8 h-8 fill-white" />,
    linkTo: "/certificates",
  },
];

const profile = {
  label: "My Profile",
  icon: <UserIcon className="w-8 h-8 fill-white" />,
  linkTo: "/profile",
};

const SideBar: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  console.log({ pathName });
  return (
    <div className="relative w-24 h-screen group bg-primary-600 hover:w-96">
      <div className="flex flex-col items-center pt-40 space-y-24 group-hover:hidden ">
        <div className="py-4">{profile.icon}</div>
        <div className="flex flex-col items-center space-y-6">
          {content.map(({ icon, linkTo }) => (
            <div
              className={
                "p-4 rounded-xl" +
                (pathName === linkTo ? " bg-primary-500" : "")
              }
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-col hidden px-8 pt-40 space-y-24 text-white transition group-hover:flex">
        <Link
          to={profile.linkTo}
          className={
            "flex items-center w-full gap-4 p-4 text-white rounded-3xl" +
            (pathName === profile.linkTo ? " bg-primary-500" : "")
          }
        >
          {profile.icon} {profile.label}
        </Link>

        <div className="flex flex-col space-y-6">
          {content.map(({ label, icon, linkTo }) => {
            const isPage = pathName === linkTo;
            return (
              <Link
                to={linkTo}
                className={
                  "p-4 rounded-xl flex items-center gap-8" +
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
  );
};

export default SideBar;
