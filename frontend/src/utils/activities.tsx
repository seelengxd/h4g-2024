import {
  type SortingFn,
  type ColumnDef,
  type ColumnHelper,
  type Row,
} from "@tanstack/react-table";

import React, { ReactNode } from "react";
import { ActivityData, ActivityMiniData } from "../types/activities/activities";
import { Link } from "react-router-dom";
import IconButton from "../components/buttons/IconButton";
import { EyeIcon } from "@heroicons/react/24/outline";
import { UserMiniData } from "../types/users/users";

export interface ActivityRowData extends ActivityMiniData {
  action?: undefined;
}

export const ActivityTableColumns = (
  columnHelper: ColumnHelper<ActivityRowData>
): Array<ColumnDef<ActivityRowData>> => {
  return [
    columnHelper.accessor("id", {
      cell: (id): number => id.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: ({ row }) => {
        const activity = row.original;
        return (
          <div className="flex space-x-2 hover:text-primary-800 hover:underline">
            <Link to={"/activities/" + activity.id}>{activity.name}</Link>
          </div>
        );
      },
      header: "Name",
    }),
    columnHelper.accessor("type", {
      cell: (type): ReactNode => {
        // TODO: replace with tag
        return <div>{type.getValue()}</div>;
      },
      header: "type",
    }),
    columnHelper.accessor("organisationId", {
      cell: (cell): ReactNode => {
        const organisationInfo = cell.row.original as unknown as {
          organisationName?: string;
          organisation?: { name: string };
        };
        return (
          <Link to={"/organisations/" + cell.row.original.organisationId}>
            <p className="hover:underline hover:text-primary-800">
              {organisationInfo.organisation
                ? organisationInfo.organisation.name
                : organisationInfo.organisationName}
            </p>
          </Link>
        );
      },
      header: "Organisation",
    }),
  ] as Array<ColumnDef<ActivityMiniData>>;
};

export const isUserEnrolled = (user: UserMiniData, activity: ActivityData) => {
  return activity.sessions.some(
    (sessions) =>
      sessions.registrations.filter(
        (registration) => registration.userId === user!.id
      ).length > 0
  );
};
