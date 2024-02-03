import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ActivityData } from "../../types/activities/activities";
import { Submission } from "../../types/forms/forms";
import { FormColumns } from "../../utils/form";
import DataTable from "../../components/tables/DataTable";

interface Props {
  activity: ActivityData;
}

const EnrollmentFormTable: React.FC<Props> = ({ activity }) => {
  if (!activity.enrollmentForm) {
    return <></>;
  }
  const columnHelper = createColumnHelper<Submission>();
  const submissionColumns: Array<ColumnDef<Submission>> = FormColumns(
    columnHelper,
    activity?.enrollmentForm.formSchema
  );

  return (
    <DataTable
      columns={submissionColumns}
      tableData={activity.enrollmentForm.submissions}
      getColumnCanGlobalFilter={(column: Column<Submission>) =>
        column.getCanSort()
      }
      searchText="Search submissions..."
    />
  );
};

export default EnrollmentFormTable;
