import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sessionApi from "../../api/sessions/sessions";
import Spinner from "../../components/loading/Spinner";
import { SessionData } from "../../types/sessions/sessions";
import { Error404 } from "../routing/VolunteerApp";
import ViewSessionAttendanceHeader from "./ViewSessionAttendanceHeader";
import {
  ListBulletIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Button from "../../components/buttons/Button";
import DataTable from "../../components/tables/DataTable";
import { UserRegistration } from "../../types/registrations/registrations";
import {
  AdminRegistrationRowData,
  AdminRegistrationTableColumns,
} from "../../utils/registrations";
import Tabs from "../../components/dataDisplay/Tabs";
import registrationsAPI from "../../api/registrations/registrations";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const ViewSessionAttendances: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [registrations, setRegistrations] = useState<UserRegistration[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      sessionApi
        .getSession(parseInt(id))
        .then((session) => {
          setSession(session);
          setRegistrations(session.registrations);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (!id) return Error404;
  if (isLoading) return <Spinner />;
  if (!registrations || !session) return Error404;

  const handleMarkAttended = (registeration: UserRegistration) =>
    registrationsAPI.markAttended(registeration).then(setRegistrations);
  const handleMarkAbsent = (registeration: UserRegistration) =>
    registrationsAPI.markAbsent(registeration).then(setRegistrations);
  const handleUnmark = (registeration: UserRegistration) =>
    registrationsAPI.unmark(registeration).then(setRegistrations);

  const numRegistrations = registrations.length;
  const columnHelper = createColumnHelper<AdminRegistrationRowData>();
  const registrationColumns: Array<ColumnDef<AdminRegistrationRowData>> =
    AdminRegistrationTableColumns(
      columnHelper,
      true,
      handleMarkAttended,
      handleMarkAbsent,
      handleUnmark
    );

  const pendingRegistrations = registrations.filter(
    (registration) => registration.attendance === null
  );
  const attendedRegistrations = registrations.filter(
    (registration) => registration.attendance === true
  );
  const absentRegistrations = registrations.filter(
    (registration) => registration.attendance === false
  );

  const pendingRegistrationsTab = {
    id: "pending",
    tabTitle: "Unmarked Attendance",
    page: (
      <DataTable
        columns={registrationColumns}
        tableData={pendingRegistrations}
        getColumnCanGlobalFilter={(column: Column<UserRegistration>) =>
          column.getCanSort()
        }
        emptyTableText="No Registrations Found"
        searchText="Search Registration List"
      />
    ),
  };

  const attendedRegistrationsTab = {
    id: "attended",
    tabTitle: "Attended",
    page: (
      <DataTable
        columns={registrationColumns}
        tableData={attendedRegistrations}
        getColumnCanGlobalFilter={(column: Column<UserRegistration>) =>
          column.getCanSort()
        }
        emptyTableText="No Registrations Found"
        searchText="Search Registration List"
      />
    ),
  };

  const absentRegistrationsTab = {
    id: "absent",
    tabTitle: "Absentees",
    page: (
      <DataTable
        columns={registrationColumns}
        tableData={absentRegistrations}
        getColumnCanGlobalFilter={(column: Column<UserRegistration>) =>
          column.getCanSort()
        }
        emptyTableText="No Registrations Found"
        searchText="Search Registration List"
      />
    ),
  };

  const allRegistrationsTab = {
    id: "all",
    tabTitle: "All",
    page: (
      <DataTable
        columns={registrationColumns}
        tableData={registrations}
        getColumnCanGlobalFilter={(column: Column<UserRegistration>) =>
          column.getCanSort()
        }
        emptyTableText="No Registrations Found"
        searchText="Search Registration List"
      />
    ),
  };

  return (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <ViewSessionAttendanceHeader session={session} />
      <div className="flex flex-row items-center justify-between mt-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Manage Attendance
        </h1>
        <div className="flex flex-row gap-3">
          <Button
            roundness="md"
            py={2}
            bgColor="white"
            textColor="text-primary-700"
            outlined
            outlineColor="border-primary-700"
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
          >
            <ArrowDownOnSquareIcon className="w-4 h-4 mr-2 stroke-2" />
            Export Registration/ Attendance Data
          </Button>
        </div>
      </div>

      <div className="grid h-full grid-cols-4 col-span-1 gap-4 px-4 py-6 my-4 bg-white rounded-md shadow">
        <div className="flex flex-col items-center justify-center col-span-1">
          <h4 className="text-sm font-semibold text-gray-600">
            Number of Registrations
          </h4>
          <h4 className="font-medium text-md text-black-600">
            {numRegistrations}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center col-span-1">
          <h4 className="text-sm font-semibold text-gray-600">
            Number Attended
          </h4>
          <h4 className="font-medium text-md text-black-600">
            {attendedRegistrations.length}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center col-span-1">
          <h4 className="text-sm font-semibold text-gray-600">Number Absent</h4>
          <h4 className="font-medium text-md text-black-600">
            {absentRegistrations.length}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center col-span-1">
          <h4 className="text-sm font-semibold text-gray-600">
            Number Unmarked
          </h4>
          <h4 className="font-medium text-md text-black-600">
            {pendingRegistrations.length}
          </h4>
        </div>
      </div>

      <div
        className="grid h-full grid-cols-12 col-span-1 gap-4 p-4 my-4 bg-white rounded-md shadow cursor-pointer hover:bg-gray-50"
        onClick={() => navigate("./drop_in")}
      >
        <div className="col-span-11 font-medium">Attendance Drop-in View</div>
        <div className="col-span-1">
          <ArrowRightIcon className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col h-full col-span-1 gap-4 p-8 bg-white rounded-md shadow">
        <Tabs
          tabs={[
            allRegistrationsTab,
            pendingRegistrationsTab,
            attendedRegistrationsTab,
            absentRegistrationsTab,
          ]}
          defaultTabId="all"
        />
      </div>
    </div>
  );
};

export default ViewSessionAttendances;
