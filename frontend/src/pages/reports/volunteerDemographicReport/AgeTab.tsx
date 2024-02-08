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

const AgeTab: React.FC<Props> = ({ report }) => {
  const total = report.immigrationStatus.dataPoints.reduce(
    (count, dataPoint) => dataPoint.y + count,
    0
  );
  const pieChartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Volunteers By Age",
    },
    legend: {
      cursor: "pointer",
    },
    data: [
      {
        showInLegend: true,
        type: "pie",
        startAngle: 240,
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label} {y}",
        dataPoints: report.age.dataPoints.map((dataPoint) => ({
          ...dataPoint,
          name: dataPoint.label,
          y: (dataPoint.y / total) * 100,
        })),
      },
    ],
  };

  const ages = report.age.dataPoints.map((row, index) => ({
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
          className="w-56 mt-8"
          value={ages.filter((option) => option.value === categoryIndex)[0]}
          options={ages}
          onChange={(option) => setCategoryIndex(option!.value)}
        />
      </div>
      <DataTable
        columns={volunteerColumns}
        tableData={report.age.users[categoryIndex].users}
        getColumnCanGlobalFilter={(column: Column<VolunteerRowData>) =>
          column.getCanSort()
        }
        emptyTableText="No Volunteers Found"
        searchText="Search volunteer list"
      />
    </>
  );
};

export default AgeTab;
