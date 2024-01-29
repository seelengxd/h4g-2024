import { type Table } from "@tanstack/react-table";
import Tooltip from "../feedback/Tooltip";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import IconButton from "../buttons/IconButton";

interface DataTablePaginationProps<T> {
  table: Table<T>;
}

const numEntriesPerPageOptions = [5, 10, 20, 30, 40, 50];

const DataTablePagination = <T extends object>({
  table,
}: DataTablePaginationProps<T>): JSX.Element => {
  const {
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
    getState,
  } = table;
  const { pageIndex, pageSize } = getState().pagination;
  return (
    <div className="flex justify-between items-center border-t p-4">
      <div className="flex">
        {/* Jump to first page icon button */}
        <Tooltip label="First Page" />
        <IconButton
          ariaLabel="First Page"
          onClick={() => {
            setPageIndex(0);
          }}
          isDisabled={!getCanPreviousPage()}
          icon={<ChevronDoubleLeftIcon className="h-6 w-6 stroke-2" />}
          mr={4}
        />

        {/* Navigate to previous page icon button */}
        <Tooltip label="Previous Page" />
        <IconButton
          ariaLabel="Previous Page"
          onClick={previousPage}
          isDisabled={!getCanPreviousPage()}
          icon={<ChevronLeftIcon className="h-3 w-3 stroke-2" />}
        />
      </div>

      <div className="flex items-center">
        {/* Current page number display */}
        <p className="text-sm flex-shrink-0 mr-8">
          {"Page "}
          <span className="text-sm font-bold">
            {`${pageIndex + 1} of ${Math.max(getPageCount(), 1)}`}
          </span>
          <span className="text-sm">
            {` (${table.getPrePaginationRowModel().rows.length} entries)`}
          </span>
        </p>

        {/* Page Navigation Field Input */}
        <p className="text-sm flex-shrink-0">{"Go to page: "}</p>

        {/* TODO: there should be a min/max but idk how to get it to work */}
        <input
          type="number"
          name="number-input"
          className="ml-2 mr-4 w-20 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          //   min={1}
          //   max={Math.max(getPageCount(), 1)}
          onChange={(e) => {
            const num = (e.target as unknown as { value: number }).value;
            setPageIndex(Math.min(Math.max(num - 1, 0), getPageCount() - 1));
          }}
          value={pageIndex + 1}
        />

        {/* Toggle number of entries per page */}
        <select
          className="w-sm block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {numEntriesPerPageOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="flex">
        <Tooltip label="Next Page" />
        <IconButton
          ariaLabel="Next Page"
          onClick={nextPage}
          isDisabled={!getCanNextPage()}
          icon={<ChevronRightIcon className="h-3 w-3 stroke-2" />}
          mr={4}
        />

        <Tooltip label="Last Page" />
        <IconButton
          ariaLabel="Last Page"
          onClick={() => {
            setPageIndex(getPageCount() - 1);
          }}
          isDisabled={!getCanNextPage()}
          icon={<ChevronDoubleRightIcon className="h-6 w-6 stroke-2" />}
          marginLeft={4}
        />
      </div>
    </div>
  );
};

export default DataTablePagination;
