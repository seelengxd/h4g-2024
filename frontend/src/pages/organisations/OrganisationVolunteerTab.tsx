import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Organisation } from "../../types/organisations/organisations";
import {
  VolunteerRowData,
  VolunteerTableColumns,
} from "../../utils/volunteers";
import { useEffect, useState } from "react";
import Spinner from "../../components/loading/Spinner";
import DataTable from "../../components/tables/DataTable";
import { ActivityMiniData } from "../../types/activities/activities";
import organisationsAPI from "../../api/organisations/organisations";

interface OrganisationVolunteerTabProps {
  organisation: Organisation;
}

const OrganisationVolunteerTab: React.FC<OrganisationVolunteerTabProps> = ({
  organisation,
}: OrganisationVolunteerTabProps) => {
  const [loading, setLoading] = useState(true);
  const columnHelper = createColumnHelper<VolunteerRowData>();
  const [volunteers, setVolunteers] = useState<VolunteerRowData[]>([]);
  const volunteerColumns: Array<ColumnDef<VolunteerRowData>> =
    VolunteerTableColumns(columnHelper);

  useEffect(() => {
    organisationsAPI
      .getAllOrganisationVolunteers(organisation.id)
      .then((volunteers) => setVolunteers(volunteers))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [organisation.id]);

  return (
    <div className="mt-6 mb-12 text-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-8">
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

export default OrganisationVolunteerTab;
