import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ActivityData } from "../../types/activities/activities";
import { FormColumns } from "../../utils/form";
import DataTable from "../../components/tables/DataTable";
import { SubmissionData } from "../../types/enrollmentForms/submissions";

interface Props {
  activity: ActivityData;
  submissions: SubmissionData[];
}

const EnrollmentFormTable: React.FC<Props> = ({ activity, submissions }) => {
  if (!activity.enrollmentForm) {
    return (
      <div className="flex justify-center mt-10 text-2xl text-gray-500">
        No Enrollment Form
      </div>
    );
  }
  const columnHelper = createColumnHelper<SubmissionData>();
  const submissionColumns: Array<ColumnDef<SubmissionData>> = FormColumns(
    columnHelper,
    activity?.enrollmentForm.formSchema
  );

  return (
    <DataTable
      columns={submissionColumns}
      tableData={submissions}
      getColumnCanGlobalFilter={(column: Column<SubmissionData>) =>
        column.getCanSort()
      }
      searchText="Search submissions..."
      emptyTableText="No Submissions Found"
    />
  );
};

export default EnrollmentFormTable;
