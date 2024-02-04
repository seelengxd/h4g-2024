// import { Card, Stack, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type Column,
  type ColumnDef,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import React, { useState } from "react";
import DataTablePagination from "./DataTablePagination";
import DataTableHeader from "./DataTableHeader";
import DataTableSearch from "./DataTableSearch";
import DataTableSelectFilter from "./DataTableSelectFilter";

interface DataTableProps<T extends object> {
  /* The data collection to be displayed by the table */
  tableData: T[];
  /* The columns to be displayed by the table */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<ColumnDef<T, any>>;
  /* Whether the DataTable should be sortable or not, sorting is enabled for
    all columns by default. To only enable sorting for some columns, set isSortable
    to true and toggle the enableSorting attribute in the column def. */
  isSortable?: boolean;
  /* Whether the DataTable should be searchable or not, enabled by default */
  isSearchable?: boolean;
  /* Determines which columns can be filtered */
  getColumnCanGlobalFilter?: (column: Column<T>) => boolean;
  /* Whether the DataTable should be paginated or not, enabled by default */
  isPaginated?: boolean;
  searchText?: string;
  title?: string;
  emptyTableText?: string;
}

const DataTable = <T extends object>({
  tableData,
  columns,
  isSortable = true,
  isSearchable = true,
  getColumnCanGlobalFilter,
  isPaginated = true,
  searchText = "Search activity list...",
  title = "",
  emptyTableText = "",
}: DataTableProps<T>): JSX.Element => {
  const [sortBy, setSortBy] = useState<SortingState>([]);
  const table = useReactTable<T>({
    data: tableData,
    columns,
    state: {
      sorting: isSortable ? sortBy : undefined,
    },
    autoResetPageIndex: true,
    getCoreRowModel: getCoreRowModel(),
    ...(isSortable && {
      onSortingChange: setSortBy,
      getSortedRowModel: getSortedRowModel(),
    }),
    ...(isSearchable && { getFilteredRowModel: getFilteredRowModel() }),
    ...(getColumnCanGlobalFilter !== undefined && { getColumnCanGlobalFilter }),
    ...(isPaginated && { getPaginationRowModel: getPaginationRowModel() }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mt-6 mb-6">
        {title && <p className="p-0 m-0 text-2xl font-bold">{title}</p>}
        <div className="flex items-end">
          {isSortable && (
            <DataTableSearch table={table} searchText={searchText} />
          )}
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => {
              const column = header.column;
              if (column.columnDef.meta === undefined) return null;
              if ("selectFilterOptions" in column.columnDef.meta) {
                return (
                  <DataTableSelectFilter key={column.id} column={column} />
                );
              } else return null;
            })
          )}
        </div>
      </div>

      <div className="bg-white border shadow border-primary-700 border-opacity-60 rounded-2xl overflow-clip">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
          <DataTableHeader
            headerGroups={table.getHeaderGroups()}
            isSortable={isSortable}
          />
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b odd:bg-primary-50 even:bg-primary-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getPrePaginationRowModel().rows.length === 0 && (
              <tr className="border-b odd:bg-white even:bg-gray-50">
                <td className="py-8 text-center" colSpan={columns.length}>
                  <p color="text-gray-500">{emptyTableText}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isPaginated && <DataTablePagination table={table} />}
      </div>
    </div>
  );
};

export default DataTable;
