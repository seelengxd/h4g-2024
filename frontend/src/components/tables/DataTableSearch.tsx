import { type Table } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

const SEARCH_DEBOUNCE_DELAY = 200;

interface DataTableSearchProps<T> {
  table: Table<T>;
  searchText: string;
}

const DataTableSearch = <T extends object>({
  table,
  searchText,
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
      <input
        type="search"
        id="default-search"
        className="block p-2 text-sm rounded-xl w-72 bg-gray-50 border-primary-300 ps-4 focus:ring-primary-500 focus:border-primary-500 "
        placeholder={searchText}
        onChange={(e) => {
          setSearchValue(e.currentTarget.value);
        }}
      />
      {(searchValue === undefined || searchValue === "") && (
        <div className="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-4 opacity-80">
          <svg
            className="w-4 h-4"
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
      )}
    </div>
  );
};

export default DataTableSearch;
