// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { VolunteerActivityReport } from "../../types/reports/reports";
import ReactSelect from "react-select";
import {
  VolunteerRowData,
  VolunteerTableColumns,
} from "../../utils/volunteers";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/tables/DataTable";
import { useState } from "react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {
  report: VolunteerActivityReport;
}

const VolunteersTab: React.FC<Props> = ({ report }) => {
  const volunteerOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Number of Volunteers Per Activity Type",
    },
    axisY: {
      title: "Number of Volunteers",
    },
    toolTip: {
      shared: true,
    },
    data: report?.map((row) => ({
      type: "spline",
      name: row.name,
      showInLegend: true,
      dataPoints: row.volunteers.dataPoints,
    })),
  };

  const dateOptions = report
    ? report[0].minutes.dataPoints.map((dataPoint, index) => ({
        label: dataPoint.label,
        value: index,
      }))
    : [];

  const interestOptions = report.map((row, index) => ({
    label: row.name,
    value: index,
  }));

  const columnHelper = createColumnHelper<VolunteerRowData>();
  const volunteerColumns: Array<ColumnDef<VolunteerRowData>> =
    VolunteerTableColumns(columnHelper);

  const [dateIndex, setDateIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  return (
    <>
      <CanvasJSChart options={volunteerOptions} />
      <div className="flex justify-start gap-8">
        <ReactSelect
          className="w-56 mt-8"
          value={dateOptions.filter((option) => option.value === dateIndex)}
          options={dateOptions}
          onChange={(option) => setDateIndex(option!.value)}
        />
        <ReactSelect
          className="w-56 mt-8"
          value={interestOptions.filter(
            (option) => option.value === categoryIndex
          )}
          options={interestOptions}
          onChange={(option) => setCategoryIndex(option!.value)}
        />
      </div>
      <DataTable
        columns={volunteerColumns}
        tableData={report[categoryIndex].volunteers.users[dateIndex]}
        getColumnCanGlobalFilter={(column: Column<VolunteerRowData>) =>
          column.getCanSort()
        }
        emptyTableText="No Volunteers Found"
        searchText="Search volunteer list"
      />
    </>
  );
};

export default VolunteersTab;
