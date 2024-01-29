// import { Select } from "@chakra-ui/react";
import { type Column, type ColumnMeta } from "@tanstack/react-table";
import React from "react";

interface DataTableSelectFilterColMeta<T, V> extends ColumnMeta<T, V> {
  /* The options to filter from, if not defined will be taken from row values */
  selectFilterOptions?: string[];
  selectOptionPrefix?: string;
}

interface DataTableSelectFilterProps<T> {
  column: Column<T>;
}

const DataTableSelectFilter = <T extends object>({
  column: { getFilterValue, setFilterValue, id, columnDef },
}: DataTableSelectFilterProps<T>): JSX.Element => {
  const meta = columnDef.meta as
    | DataTableSelectFilterColMeta<T, unknown>
    | undefined;
  const filterValue = getFilterValue() as string[] | undefined;
  const options = meta?.selectFilterOptions ?? [];

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilterValue(e.target.value ?? undefined);
      }}
      className="min-w-fit"
    >
      <option value="">{`${meta?.selectOptionPrefix ?? id}: All`}</option>
      {options?.map((option, i) => (
        <option key={i} value={option}>
          {`${meta?.selectOptionPrefix ?? id}: ${option}`}
        </option>
      ))}
    </select>
  );
};

export default DataTableSelectFilter;
