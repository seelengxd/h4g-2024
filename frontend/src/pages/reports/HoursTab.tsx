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
import { ActivityRowData, ActivityTableColumns } from "../../utils/activities";
import { ActivityMiniData } from "../../types/activities/activities";
import FormMultiSelectInput from "../../components/forms/FormMultiSelectInput";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {
  report: VolunteerActivityReport;
}

const HoursTab: React.FC<Props> = ({ report }) => {
  const [activeCategories, setActiveCategories] = useState<number[]>(
    report[0].minutes.dataPoints.map((dataPoint, index) => index)
  );
  const hoursOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Number of Hours Per Activity Type",
    },
    axisY: {
      title: "Number of Hours",
    },
    toolTip: {
      shared: true,
    },
    data: report
      ?.map((row) => ({
        type: "spline",
        name: row.name,
        showInLegend: true,
        dataPoints: row.minutes.dataPoints.map((dataPoint) => ({
          ...dataPoint,
          y: dataPoint.y / 60,
        })),
      }))
      .filter((row, index) => activeCategories.includes(index)),
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
  const alsoInterestOptions = report.map((row, index) => ({
    value: row.name,
    id: index,
  }));

  const columnHelper = createColumnHelper<ActivityRowData>();
  const activityColumns: Array<ColumnDef<ActivityRowData>> =
    ActivityTableColumns(columnHelper);

  const [dateIndex, setDateIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  return (
    <>
      <div className="flex">
        <CanvasJSChart options={hoursOptions} />
        <div className="px-8 my-auto">
          <FormMultiSelectInput
            name="category"
            value={activeCategories}
            options={alsoInterestOptions}
            onChange={(newValues) => setActiveCategories(newValues)}
          />
        </div>
      </div>
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
        columns={activityColumns}
        tableData={report[categoryIndex].minutes.activities[dateIndex]}
        getColumnCanGlobalFilter={(column: Column<ActivityMiniData>) =>
          column.getCanSort()
        }
        emptyTableText="No Activities Found"
      />
    </>
  );
};

export default HoursTab;
