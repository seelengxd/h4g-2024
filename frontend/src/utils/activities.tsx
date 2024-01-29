import {
  type SortingFn,
  type ColumnDef,
  type ColumnHelper,
  type Row,
} from "@tanstack/react-table";

import React, { ReactNode } from "react";

import { Activity } from "../types/activities/activities";
import { Link } from "react-router-dom";
import IconButton from "../components/buttons/IconButton";
import { EyeIcon } from "@heroicons/react/24/outline";

export interface ActivityRowData extends Activity {
  action?: undefined;
}

export const ActivityTableColumns = (
  columnHelper: ColumnHelper<ActivityRowData>,
  setActivityList: React.Dispatch<React.SetStateAction<ActivityRowData[]>>
): Array<ColumnDef<ActivityRowData>> => {
  return [
    columnHelper.accessor("id", {
      cell: (id): number => id.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (name): string => name.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("type", {
      cell: (type): ReactNode => {
        // TODO: replace with tag
        return <div>{type.getValue()}</div>;
      },
      header: "type",
    }),
    columnHelper.accessor("organisation", {
      cell: (organisation): ReactNode => (
        <Link to={"/organisations/" + organisation.getValue().id}>
          <p className="hover:underline hover:text-gray-800">
            {organisation.getValue().name}
          </p>
        </Link>
      ),
      header: "Organisation",
    }),
    columnHelper.accessor("action", {
      header: "",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) => (
        <div className="flex space-x-2">
          <IconButton icon={<EyeIcon className="w-4 h-4" />} />
        </div>
      ),
    }),
  ] as Array<ColumnDef<Activity>>;
};
