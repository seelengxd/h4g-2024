// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { VolunteerDemographicReport } from "../../../types/reports/reports";
import ReactSelect from "react-select";
import {
  VolunteerRowData,
  VolunteerTableColumns,
} from "../../../utils/volunteers";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../../components/tables/DataTable";
import { useState } from "react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {
  report: VolunteerDemographicReport;
}

const InterestsTab: React.FC<Props> = ({ report }) => {
  const pieChartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Volunteers By Interests",
    },
    legend: {
      cursor: "pointer",
    },
    axisX: {
      interval: 1,
    },
    axisY: {
      title: "Number of Volunteers",
    },
    data: [
      {
        type: "bar",
        dataPoints: report.interests.dataPoints.map((dataPoint) => ({
          ...dataPoint,
          name: dataPoint.label,
        })),
      },
    ],
  };

  const interests = report.interests.dataPoints.map((row, index) => ({
    label: row.label,
    value: index,
  }));

  const columnHelper = createColumnHelper<VolunteerRowData>();
  const volunteerColumns: Array<ColumnDef<VolunteerRowData>> =
    VolunteerTableColumns(columnHelper);

  const [categoryIndex, setCategoryIndex] = useState(0);

  return (
    <>
      <div className="flex">
        <CanvasJSChart options={pieChartOptions} />
      </div>

      <div className="flex justify-start gap-8">
        <ReactSelect
          className="mt-8 w-72"
          value={
            interests.filter((option) => option.value === categoryIndex)[0]
          }
          options={interests}
          onChange={(option) => setCategoryIndex(option!.value)}
        />
      </div>
      <DataTable
        columns={volunteerColumns}
        tableData={report.interests.users[categoryIndex].users}
        getColumnCanGlobalFilter={(column: Column<VolunteerRowData>) =>
          column.getCanSort()
        }
        emptyTableText="No Volunteers Found"
        searchText="Search volunteer list"
      />
    </>
  );
};

export default InterestsTab;
