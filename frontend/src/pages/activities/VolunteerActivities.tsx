import { useEffect, useState } from "react";
import { Registration } from "../../types/registrations/registrations";
import registrationsAPI from "../../api/registrations/registrations";
import DataTable from "../../components/tables/DataTable";
import {
  RegistrationRowData,
  RegistrationTableColumns,
} from "../../utils/registrations";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Spinner from "../../components/loading/Spinner";

// This is the activities page specific to the volunteer, showing their enrolled events.
const VolunteerActivities: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const columnHelper = createColumnHelper<RegistrationRowData>();
  const activityColumns: Array<ColumnDef<RegistrationRowData>> =
    RegistrationTableColumns(columnHelper);

  useEffect(() => {
    registrationsAPI
      .getAllRegistrations()
      .then((registrations) => setRegistrations(registrations))
      .finally(() => setIsLoading(false));
  }, []);

  const upcomingEvents = registrations.filter(
    (registration) => new Date(registration.session.start) > new Date()
  );
  const pastEvents = registrations.filter(
    (registration) => new Date(registration.session.start) <= new Date()
  );
  return (
    <div className="items-center justify-between h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <h1 className="text-4xl">Your Activity</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-16">
          <DataTable
            columns={activityColumns}
            tableData={upcomingEvents}
            getColumnCanGlobalFilter={(column: Column<RegistrationRowData>) =>
              column.getCanSort()
            }
            title="Upcoming Enrolled Events"
            searchText="Search event"
          />

          <DataTable
            columns={activityColumns}
            tableData={pastEvents}
            getColumnCanGlobalFilter={(column: Column<RegistrationRowData>) =>
              column.getCanSort()
            }
            title="Past Attended Events"
            searchText="Search event"
          />
        </div>
      )}
    </div>
  );
};

export default VolunteerActivities;
