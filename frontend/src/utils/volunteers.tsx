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
import { UserMiniData } from "../types/users/users";

export interface VolunteerRowData extends UserMiniData {
  action?: undefined;
}

export const VolunteerTableColumns = (
  columnHelper: ColumnHelper<VolunteerRowData>
): Array<ColumnDef<VolunteerRowData>> => {
  return [
    columnHelper.accessor("id", {
      cell: (id): number => id.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("fullName", {
      cell: ({ row }) => {
        const volunteer = row.original;
        return (
          <div className="flex space-x-2 hover:text-primary-800 hover:underline">
            <Link to={"/volunteers/" + volunteer.id}>{volunteer.fullName}</Link>
          </div>
        );
      },
      header: "Full Name",
    }),
    columnHelper.accessor("preferredName", {
      cell: (name): string => name.getValue(),
      header: "Preferred Name",
    }),
    columnHelper.accessor("email", {
      cell: (name): string => name.getValue(),
      header: "Email",
    }),
  ] as Array<ColumnDef<VolunteerRowData>>;
};
