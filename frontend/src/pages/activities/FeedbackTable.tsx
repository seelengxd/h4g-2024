import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { RegistrationData } from "../../types/registrations/registrations";
import { FeedbackRow, FeedbackTableColumns } from "../../utils/feedback";

interface Props {
  registrations: RegistrationData[];
}

const FeedbackTable: React.FC<Props> = ({ registrations }) => {
  const allFeedback = registrations
    .map((registration) => registration.feedback)
    .filter((feedback) => !!feedback);

  if (!registrations) {
    return (
      <div className="flex justify-center mt-10 text-2xl text-gray-500">
        No Enrollment Form
      </div>
    );
  }
  const columnHelper = createColumnHelper<FeedbackRow>();
  const feedbackColumns: Array<ColumnDef<FeedbackRow>> =
    FeedbackTableColumns(columnHelper);

  return (
    <DataTable
      columns={feedbackColumns}
      tableData={allFeedback}
      getColumnCanGlobalFilter={(column: Column<FeedbackRow>) =>
        column.getCanSort()
      }
      searchText="Search submissions..."
      emptyTableText="No Submissions Found"
    />
  );
};

export default FeedbackTable;
