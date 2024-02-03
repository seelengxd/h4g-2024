import { createColumnHelper, ColumnDef, Column } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { ActivityMiniData } from "../../types/activities/activities";
import { Organisation } from "../../types/organisations/organisations";
import { ActivityRowData, ActivityTableColumns } from "../../utils/activities";
import { useState } from "react";
import Button from "../../components/buttons/Button";
import { RectangleGroupIcon, TableCellsIcon } from "@heroicons/react/20/solid";

interface OrganisationActivityTabProps {
  organisation: Organisation;
}

const OrganisationActivityTab: React.FC<OrganisationActivityTabProps> = ({ organisation }: OrganisationActivityTabProps) => {
  const [isTableView, setIsTableView] = useState<boolean>(true);
  const columnHelper = createColumnHelper<ActivityRowData>();
  const activityColumns: Array<ColumnDef<ActivityRowData>> = ActivityTableColumns(columnHelper).filter((col) => col.header !== 'Organisation');

  return (
  <div className="mt-6 mb-12">
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-xl">{organisation.activities.length} Activities</h4>
      <Button px={4} onClick={() => setIsTableView(!isTableView)}>
        {isTableView ? <RectangleGroupIcon className="w-4 h-4 mr-2 stroke-2" /> : <TableCellsIcon className="w-4 h-4 mr-2 stroke-2" />}
        {isTableView ? "Toggle to Grid View" : "Toggle to Table View"}
      </Button>
    </div>
    <div className="mt-4" hidden={!isTableView}>
      <DataTable
        columns={activityColumns}
        tableData={organisation.activities}
        getColumnCanGlobalFilter={(column: Column<ActivityMiniData>) =>
          column.getCanSort()
        }
      />
    </div>
  </div>
 );
};

export default OrganisationActivityTab;
