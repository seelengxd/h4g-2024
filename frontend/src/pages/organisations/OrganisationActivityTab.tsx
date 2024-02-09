import { createColumnHelper, ColumnDef, Column } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { ActivityMiniData } from "../../types/activities/activities";
import { ActivityRowData, ActivityTableColumns } from "../../utils/activities";
import { useState } from "react";
import Button from "../../components/buttons/Button";
import { RectangleGroupIcon, TableCellsIcon } from "@heroicons/react/20/solid";
import VolunteeringOpportunityCard from "../activities/VolunteertingOpportunityCard";

interface OrganisationActivityTabProps {
  activities: ActivityMiniData[];
}

const OrganisationActivityTab: React.FC<OrganisationActivityTabProps> = ({
  activities,
}: OrganisationActivityTabProps) => {
  const [isTableView, setIsTableView] = useState<boolean>(true);
  const columnHelper = createColumnHelper<ActivityRowData>();
  const activityColumns: Array<ColumnDef<ActivityRowData>> =
    ActivityTableColumns(columnHelper).filter(
      (col) => col.header !== "Organisation"
    );

  return (
    <div className="mt-6 mb-12">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">
          {activities.length} Activities
        </h4>
        <Button px={4} onClick={() => setIsTableView(!isTableView)}>
          {isTableView ? (
            <RectangleGroupIcon className="w-4 h-4 mr-2 stroke-2" />
          ) : (
            <TableCellsIcon className="w-4 h-4 mr-2 stroke-2" />
          )}
          {isTableView ? "Toggle to Grid View" : "Toggle to Table View"}
        </Button>
      </div>

      <div className="mt-4" hidden={!isTableView}>
        <DataTable
          columns={activityColumns}
          tableData={activities}
          getColumnCanGlobalFilter={(column: Column<ActivityMiniData>) =>
            column.getCanSort()
          }
          emptyTableText="No Activities Found"
        />
      </div>

      <div className="mt-4" hidden={isTableView}>
        <div className="grid grid-cols-4 gap-x-8 gap-y-16">
          {activities.map((activity) => (
            <VolunteeringOpportunityCard
              activity={activity}
              showButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganisationActivityTab;
