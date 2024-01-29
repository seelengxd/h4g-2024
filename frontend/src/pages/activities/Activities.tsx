import { FireIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import Spinner from "../../components/loading/Spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { Activity } from "../../types/activities/activities";
import DataTable from "../../components/tables/DataTable";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ActivityRowData, ActivityTableColumns } from "../../utils/activities";

const Activities: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const columnHelper = createColumnHelper<ActivityRowData>();
  const [activities, setActivities] = useState<ActivityRowData[]>([]);
  const activityColumns: Array<ColumnDef<ActivityRowData>> =
    ActivityTableColumns(columnHelper, setActivities);
  useEffect(() => {
    activitiesAPI
      .getAllActivities()
      .then((activities) => setActivities(activities))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 h-screen">
      <div className="w-full">
        <div className="w-full sm:flex flex-initial justify-between items-center">
          <div className="flex items-center mt-4">
            <FireIcon className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-semibold text-gray-800">Activities</h1>
          </div>
          <div className="hidden sm:block">
            <Link to="/activities/new">
              <Button>
                <PlusIcon className="stroke-2 w-4 h-4 mr-2" /> Create
              </Button>
            </Link>
          </div>
          <div className="sm:hidden">
            <Link to="/activities/new">
              <button
                type="button"
                className="absolute right-4 bottom-8 text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
              >
                <PlusIcon className="stroke-2 w-8 h-8" />
                <span className="sr-only">Create</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-12">
          <DataTable
            columns={activityColumns}
            tableData={activities}
            getColumnCanGlobalFilter={(column: Column<Activity>) =>
              column.getCanSort()
            }
          />
        </div>
      )}
    </div>
  );
};

export default Activities;
