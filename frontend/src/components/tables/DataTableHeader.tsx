import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { type HeaderGroup } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import React from "react";

interface DataTableHeaderProps<T> {
  headerGroups: Array<HeaderGroup<T>>;
  isSortable: boolean;
}

const DataTableHeader = <T extends object>({
  headerGroups,
  isSortable,
}: DataTableHeaderProps<T>): JSX.Element => {
  return (
    <thead className="text-white capitalize text-md bg-gray-5 bg-primary-600">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const sortDirection = header.column.getIsSorted();
            return (
              <th
                scope="col"
                className="px-6 py-3"
                key={header.id}
                {...(isSortable && {
                  onClick: header.column.getToggleSortingHandler(),
                })}
              >
                <div className="flex items-center">
                  <p className="font-bold text-md">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </p>

                  <span>
                    {sortDirection === "asc" && (
                      <ChevronUpIcon className="w-5 h-5" />
                    )}
                    {sortDirection === "desc" && (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </span>
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default DataTableHeader;
