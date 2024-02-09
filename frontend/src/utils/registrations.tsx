import { type ColumnDef, type ColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import {
  Attendance,
  Registration,
  UserRegistration,
} from "../types/registrations/registrations";
import { format, isFuture } from "date-fns";
import FeedbackDisplay from "../pages/feedback/FeedbackDisplay";
import UpcomingSessionTag from "../pages/sessions/tags/UpcomingSessionTag";
import BaseSessionTag from "../pages/sessions/tags/BaseSessionTag";
import { FeedbackIcon } from "../components/icons/icons";

export const displayAttendance = (attendance: Attendance) => {
  return attendance === null
    ? "Not Marked"
    : attendance
    ? "Attended"
    : "Absent";
};

export interface RegistrationRowData extends Registration {
  action?: undefined;
}

export const RegistrationTableColumns = (
  columnHelper: ColumnHelper<RegistrationRowData>
): Array<ColumnDef<RegistrationRowData>> => {
  return [
    // organisation, event name, date & time, location, feedback
    columnHelper.accessor(
      (registration) => registration.session.activity.organisation.name,
      {
        cell: (organisationName) => organisationName.getValue(),
        header: "Organisation",
      }
    ),
    columnHelper.accessor(
      (registration) => registration.session.activity.name,
      {
        cell: (activityName) => activityName.getValue(),
        header: "Event Name",
      }
    ),
    columnHelper.accessor((registration) => registration.session, {
      cell: (sessionCellContext) => {
        const session = sessionCellContext.getValue();
        const date =
          format(new Date(session.start), "d MMM, h:mma-") +
          (new Date(session.start).getDay() === new Date(session.end).getDay()
            ? format(new Date(session.end), "h:mma")
            : format(new Date(session.end), "d MMM, h:mma"));
        return date;
      },
      header: "Date & Time",
    }),
    columnHelper.accessor(
      (registration) => registration.session.activity.location,
      {
        cell: (locationCellContext) => locationCellContext.getValue(),
        header: "Location",
      }
    ),

    columnHelper.accessor("action", {
      header: "feedback",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) =>
        cell.row.original.feedback ? (
          <FeedbackDisplay feedback={cell.row.original.feedback} />
        ) : (
          <div className="flex justify-center space-x-2">
            <Link to={"/sessions/" + cell.row.original.id + "/feedback/new"}>
              <FeedbackIcon className="w-6 h-6 fill-black" />
            </Link>
          </div>
        ),
    }),
  ] as Array<ColumnDef<RegistrationRowData>>;
};

// This is for registration
export interface VolunteerRegistrationRowData extends Registration {
  action?: undefined;
}

export const VolunteerRegistrationTableColumns = (
  columnHelper: ColumnHelper<RegistrationRowData>
): Array<ColumnDef<RegistrationRowData>> => {
  return [
    // organisation, event name, date & time, location, feedback
    columnHelper.accessor(
      (registration) => registration.session.activity.organisation.name,
      {
        cell: ({ getValue, row }) => {
          return (
            <Link
              to={
                "/organisations/" +
                row.original.session.activity.organisation.id
              }
              className="hover:underline"
            >
              {getValue()}
            </Link>
          );
        },
        header: "Organisation",
      }
    ),
    columnHelper.accessor(
      (registration) => registration.session.activity.name,
      {
        cell: ({ getValue, row }) => {
          return (
            <Link
              to={"/activities/" + row.original.session.activity.id}
              className="hover:underline"
            >
              {getValue()}
            </Link>
          );
        },
        header: "Event Name",
      }
    ),
    columnHelper.accessor((registration) => registration.session, {
      cell: (sessionCellContext) => {
        const session = sessionCellContext.getValue();
        const date =
          format(new Date(session.start), "d MMM yyyy, h:mma-") +
          (new Date(session.start).getDay() === new Date(session.end).getDay()
            ? format(new Date(session.end), "h:mma")
            : format(new Date(session.end), "d MMM, h:mma"));
        return date;
      },

      header: "Date & Time",
    }),
    columnHelper.accessor(
      (registration) => registration.session.activity.location,
      {
        cell: (locationCellContext) => locationCellContext.getValue(),
        header: "Location",
      }
    ),
    columnHelper.accessor((registration) => registration, {
      cell: (registrationCellContext) => {
        const registration = registrationCellContext.getValue();
        const attendance = registration.attendance;
        if (isFuture(registration.session.start)) {
          return <UpcomingSessionTag />;
        } else if (attendance) {
          return (
            <BaseSessionTag
              tagBgColor="bg-green-100"
              tagTextColor="text-green-700"
              status="Attended"
            />
          );
        } else {
          return (
            <BaseSessionTag
              tagBgColor="bg-red-100"
              tagTextColor="text-red-700"
              status="Did Not Attend"
            />
          );
        }
      },
      header: "Status",
    }),

    columnHelper.accessor("action", {
      header: "Feedback",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) =>
        cell.row.original.feedback ? (
          <FeedbackDisplay feedback={cell.row.original.feedback} isAdmin />
        ) : (
          <BaseSessionTag
            tagBgColor="bg-red-100"
            tagTextColor="text-red-700"
            status="No Feedback"
          />
        ),
    }),
  ] as Array<ColumnDef<RegistrationRowData>>;
};

export interface AdminRegistrationRowData extends UserRegistration {
  action?: undefined;
}

export const AdminRegistrationTableColumns = (
  columnHelper: ColumnHelper<AdminRegistrationRowData>,
  showActions?: boolean,
  handleMarkAttended?: (registration: UserRegistration) => void,
  handleMarkAbsent?: (registration: UserRegistration) => void,
  handleUnmark?: (registration: UserRegistration) => void
): Array<ColumnDef<AdminRegistrationRowData>> => {
  const baseCols = [
    columnHelper.accessor((registration) => registration.user.fullName, {
      cell: (locationCellContext) => locationCellContext.getValue(),
      header: "Full Name",
    }),
    columnHelper.accessor((registration) => registration.user.preferredName, {
      cell: (locationCellContext) => locationCellContext.getValue(),
      header: "Preferred Name",
    }),
    columnHelper.accessor((registration) => registration.user.email, {
      cell: (locationCellContext) => locationCellContext.getValue(),
      header: "Email",
    }),
    columnHelper.accessor((registration) => registration.attendance, {
      cell: (locationCellContext) => {
        const attendance = locationCellContext.getValue();
        return displayAttendance(attendance);
      },
      header: "Attendance",
    }),
  ] as Array<ColumnDef<AdminRegistrationRowData>>;

  if (showActions && handleMarkAttended && handleMarkAbsent && handleUnmark) {
    baseCols.push(
      columnHelper.accessor("action", {
        cell: (cell) => {
          const attendance = cell.row.original.attendance;
          const buttonClassName =
            "border-2 border-orange-600 text-orange-600 px-4 bg-orange-200 rounded-md hover:bg-orange-300";
          return (
            <div className="flex justify-center gap-4">
              {attendance !== true && (
                <button
                  className={buttonClassName}
                  onClick={() => handleMarkAttended(cell.row.original)}
                >
                  Mark as Attended
                </button>
              )}
              {attendance !== false && (
                <button
                  className={buttonClassName}
                  onClick={() => handleMarkAbsent(cell.row.original)}
                >
                  Mark as Absent
                </button>
              )}
              {attendance !== null && (
                <button
                  className={buttonClassName}
                  onClick={() => handleUnmark(cell.row.original)}
                >
                  Unmark
                </button>
              )}
            </div>
          );
        },
        header: "",
      }) as ColumnDef<AdminRegistrationRowData>
    );
  }

  return baseCols;
};
