import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { UserRegistration } from "../../types/registrations/registrations";
import { AdminRegistrationRowData, AdminRegistrationTableColumns } from "../../utils/registrations";

interface SessionRegistrationsProps {
  registrations: UserRegistration[];
}

const SessionRegistrations: React.FC<SessionRegistrationsProps> = ({registrations}: SessionRegistrationsProps) => {
  const columnHelper = createColumnHelper<AdminRegistrationRowData>();
  const registrationColumns: Array<ColumnDef<AdminRegistrationRowData>> = AdminRegistrationTableColumns(columnHelper);
  return (
    <DataTable
      columns={registrationColumns}
      tableData={registrations}
      getColumnCanGlobalFilter={(column: Column<UserRegistration>) => column.getCanSort()}
      emptyTableText="No Registrations Found"
      searchText="Search Registration List"
    />
  );
};

export default SessionRegistrations;
