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
      cell: (name): string => name.getValue(),
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
    columnHelper.accessor("action", {
      header: "",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) => (
        <div className="flex space-x-2">
          <Link to={"/volunteers/" + cell.row.original.id}>
            <IconButton icon={<EyeIcon className="w-4 h-4" />} />
          </Link>
        </div>
      ),
    }),
  ] as Array<ColumnDef<VolunteerRowData>>;
};
