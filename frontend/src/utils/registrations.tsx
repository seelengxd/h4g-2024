import {
  type SortingFn,
  type ColumnDef,
  type ColumnHelper,
  type Row,
} from "@tanstack/react-table";

import React, { ReactNode } from "react";
import { ActivityMiniData } from "../types/activities/activities";
import { Link } from "react-router-dom";
import IconButton from "../components/buttons/IconButton";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Registration, UserRegistration } from "../types/registrations/registrations";
import { format } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

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
      cell: (cell) => (
        <div className="flex justify-center space-x-2">
          <Link to={"/activities/" + cell.row.original.id + "/feedback/new"}>
            <PencilSquareIcon className="w-6 h-6 fill-black" />
          </Link>
        </div>
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
  handleUnmark?: (registration: UserRegistration) => void,
): Array<ColumnDef<AdminRegistrationRowData>> => {
  const baseCols = [
    columnHelper.accessor(
      (registration) => registration.user.fullName,
      {
        cell: (locationCellContext) => locationCellContext.getValue(),
        header: "Full Name",
      }
    ),
    columnHelper.accessor(
      (registration) => registration.user.preferredName,
      {
        cell: (locationCellContext) => locationCellContext.getValue(),
        header: "Preferred Name",
      }
    ),
    columnHelper.accessor(
      (registration) => registration.user.email,
      {
        cell: (locationCellContext) => locationCellContext.getValue(),
        header: "Email",
      }
    ),
    columnHelper.accessor(
      (registration) => registration.attendance,
      {
        cell: (locationCellContext) => {
          const attendance = locationCellContext.getValue();
          return attendance === null ? 'Not Marked' : attendance ? "Attendend" : "Absent";
        },
        header: "Attendance",
      }
    ),
  ] as Array<ColumnDef<AdminRegistrationRowData>>;

  if (showActions && handleMarkAttended && handleMarkAbsent && handleUnmark) {
    baseCols.push(
      columnHelper.accessor(
        "action",
        {
          cell: (cell) => {
            const attendance = cell.row.original.attendance;
            const buttonClassName = "border-2 border-orange-700 text-orange-700 px-4 bg-orange-200 rounded-md hover:bg-orange-300";
            return (
              <div className="flex gap-4 justify-center">
                {attendance !== true && (
                  <button
                    className={buttonClassName}
                    onClick={() => handleMarkAttended(cell.row.original)}>
                    Mark as Attended
                  </button>
                )}
                {attendance !== false && (
                  <button
                    className={buttonClassName}
                    onClick={() => handleMarkAbsent(cell.row.original)}>
                    Mark as Absent
                  </button>
                )}
                {attendance !== null && (
                  <button
                    className={buttonClassName}
                    onClick={() => handleUnmark(cell.row.original)}>
                    Unmark
                  </button>
                )}
              </div>
            )
          },
          header: "",
        }
      ) as ColumnDef<AdminRegistrationRowData>
    );
  }
  
  return baseCols;
};
