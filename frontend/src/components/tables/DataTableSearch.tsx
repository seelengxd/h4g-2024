import { type Table } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

const SEARCH_DEBOUNCE_DELAY = 200;

interface DataTableSearchProps<T> {
  table: Table<T>;
}

const DataTableSearch = <T extends object>({
  table,
}: DataTableSearchProps<T>): JSX.Element => {
  const globalFilter = table.getState().globalFilter as string | undefined;
  const [searchValue, setSearchValue] = useState(globalFilter);

  useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(searchValue);
    }, SEARCH_DEBOUNCE_DELAY);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Search activity list..."
        onChange={(e) => {
          setSearchValue(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default DataTableSearch;
