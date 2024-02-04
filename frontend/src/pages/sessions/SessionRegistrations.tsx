import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { UserRegistration } from "../../types/registrations/registrations";
import { AdminRegistrationRowData, AdminRegistrationTableColumns } from "../../utils/registrations";
import { pluraliseWord } from "../../utils/miscellaneous";
import Button from "../../components/buttons/Button";
import { ArrowDownOnSquareIcon, CheckCircleIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface SessionRegistrationsProps {
  registrations: UserRegistration[];
}

const SessionRegistrations: React.FC<SessionRegistrationsProps> = ({registrations}: SessionRegistrationsProps) => {
  const columnHelper = createColumnHelper<AdminRegistrationRowData>();
  const registrationColumns: Array<ColumnDef<AdminRegistrationRowData>> = AdminRegistrationTableColumns(columnHelper);
  const numRegistrations = registrations.length;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white p-8 rounded-md shadow gap-4 h-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-semibold">{numRegistrations} {pluraliseWord("Registration", numRegistrations)}</h1>
        <div className="flex flex-row gap-3">
          <Button roundness="md" py={2} bgColor="white" textColor="text-primary-700" outlined outlineColor="border-primary-700">
            <ListBulletIcon className="w-4 h-4 mr-2 stroke-2"/>
            Generate Blank Attendance List
          </Button>
          <Button roundness="md" py={2} bgColor="white" textColor="text-primary-700" outlined outlineColor="border-primary-700">
            <ArrowDownOnSquareIcon className="w-4 h-4 mr-2 stroke-2" />
            Export Registration/ Attendance Data
          </Button>
          <Button roundness="md" py={2} onClick={() => navigate("./attendances")}>
            <CheckCircleIcon className="w-4 h-4 mr-2 stroke-2" />
            Manage Attendance
          </Button>
        </div>
      </div>
      <DataTable
        columns={registrationColumns}
        tableData={registrations}
        getColumnCanGlobalFilter={(column: Column<UserRegistration>) => column.getCanSort()}
        emptyTableText="No Registrations Found"
        searchText="Search Registration List"
      />
    </div>
  );
};

export default SessionRegistrations;
