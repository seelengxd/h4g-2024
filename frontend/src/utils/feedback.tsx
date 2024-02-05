import {
  type SortingFn,
  type ColumnDef,
  type ColumnHelper,
  type Row,
} from "@tanstack/react-table";

import { Feedback } from "../types/feedback/feedback";
import FeedbackDisplay from "../pages/feedback/FeedbackDisplay";

export interface FeedbackRow extends Feedback {
  action?: undefined;
}

export const FeedbackTableColumns = (
  columnHelper: ColumnHelper<FeedbackRow>
): Array<ColumnDef<FeedbackRow>> => {
  return [
    columnHelper.accessor("id", {
      cell: (id): number => id.getValue()!,
      header: "ID",
    }),

    columnHelper.accessor("userReflection", {
      cell: (name): string => name.getValue(),
      header: "Reflection",
    }),
    columnHelper.accessor("actualFeedback", {
      cell: (name): string => name.getValue(),
      header: "Feedback",
    }),
    columnHelper.accessor("action", {
      header: "",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (cell) => <FeedbackDisplay feedback={cell.row.original} isAdmin />,
    }),
  ] as Array<ColumnDef<Feedback>>;
};
