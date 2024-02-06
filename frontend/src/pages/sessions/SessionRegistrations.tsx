import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { UserRegistration } from "../../types/registrations/registrations";
import {
  AdminRegistrationRowData,
  AdminRegistrationTableColumns,
} from "../../utils/registrations";
import { pluraliseWord } from "../../utils/miscellaneous";
import Button from "../../components/buttons/Button";
import {
  ArrowDownOnSquareIcon,
  CheckCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { SessionData } from "../../types/sessions/sessions";

interface SessionRegistrationsProps {
  session: SessionData;
  registrations: UserRegistration[];
}

const SessionRegistrations: React.FC<SessionRegistrationsProps> = ({
  session,
  registrations,
}: SessionRegistrationsProps) => {
  const columnHelper = createColumnHelper<AdminRegistrationRowData>();
  const registrationColumns: Array<ColumnDef<AdminRegistrationRowData>> =
    AdminRegistrationTableColumns(columnHelper);
  const numRegistrations = registrations.length;
  const navigate = useNavigate();

  // table export logic

  const tableRef = useRef<HTMLTableElement>(null);
  /* Callback invoked when the button is clicked */
  const handleExportAttendance = useCallback(() => {
    /* Create worksheet from HTML DOM TABLE */

    const wb = XLSX.utils.table_to_book(tableRef.current);

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "Attendances.xlsx");
  }, []);

  // Unclear what this is. I will just drop the attendance column then.
  const handleExportBlankAttendance = useCallback(() => {
    const tableData = registrations.map((registration) => ({
      fullName: registration.user.fullName,
      preferredName: registration.user.fullName,
      email: registration.user.email,
      attendance: 0,
    }));

    const ws = XLSX.utils.json_to_sheet(tableData);

    /* Create a new workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      `${format(session.start, "dd MMM yyyy hh.mm a")}`
    );

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "Attendances.xlsx");
  }, [registrations, session.start]);

  return (
    <div className="flex flex-col h-full gap-4 p-8 bg-white rounded-md shadow">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold">
          {numRegistrations} {pluraliseWord("Registration", numRegistrations)}
        </h1>
        <div className="flex flex-row gap-3">
          <Button
            roundness="md"
            py={2}
            bgColor="white"
            textColor="text-primary-700"
            outlined
            outlineColor="border-primary-700"
            onClick={handleExportBlankAttendance}
          >
            <ListBulletIcon className="w-4 h-4 mr-2 stroke-2" />
            Generate Blank Attendance List
          </Button>
          <Button
            roundness="md"
            py={2}
            bgColor="white"
            textColor="text-primary-700"
            outlined
            outlineColor="border-primary-700"
            onClick={handleExportAttendance}
          >
            <ArrowDownOnSquareIcon className="w-4 h-4 mr-2 stroke-2" />
            Export Registration/ Attendance Data
          </Button>
          <Button
            roundness="md"
            py={2}
            onClick={() => navigate("./attendances")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2 stroke-2" />
            Manage Attendance
          </Button>
        </div>
      </div>
      <DataTable
        columns={registrationColumns}
        tableData={registrations}
        getColumnCanGlobalFilter={(column: Column<UserRegistration>) =>
          column.getCanSort()
        }
        emptyTableText="No Registrations Found"
        searchText="Search Registration List"
        ref={tableRef}
      />
    </div>
  );
};

export default SessionRegistrations;
