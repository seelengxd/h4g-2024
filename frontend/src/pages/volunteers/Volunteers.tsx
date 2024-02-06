import { FireIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import Spinner from "../../components/loading/Spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActivityMiniData } from "../../types/activities/activities";
import DataTable from "../../components/tables/DataTable";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ActivityRowData, ActivityTableColumns } from "../../utils/activities";
import { UserMiniData } from "../../types/users/users";
import volunteersApi from "../../api/users/volunteers";
import {
  VolunteerRowData,
  VolunteerTableColumns,
} from "../../utils/volunteers";

const Volunteers: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const columnHelper = createColumnHelper<VolunteerRowData>();
  const [volunteers, setVolunteers] = useState<VolunteerRowData[]>([]);
  const volunteerColumns: Array<ColumnDef<VolunteerRowData>> =
    VolunteerTableColumns(columnHelper);

  useEffect(() => {
    volunteersApi
      .getAllVolunteers()
      .then((volunteers) => setVolunteers(volunteers))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="items-center justify-between h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="w-full">
        <div className="items-center justify-between flex-initial w-full sm:flex">
          <div className="flex items-center mt-4">
            <h1 className="text-3xl text-gray-800">Volunteers</h1>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-12">
          <DataTable
            columns={volunteerColumns}
            tableData={volunteers}
            getColumnCanGlobalFilter={(column: Column<ActivityMiniData>) =>
              column.getCanSort()
            }
            emptyTableText="No Volunteers Found"
            searchText="Search volunteer list"
          />
        </div>
      )}
    </div>
  );
};

export default Volunteers;
