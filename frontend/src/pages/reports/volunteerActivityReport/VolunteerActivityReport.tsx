import { useCallback, useEffect, useState } from "react";
import reportsApi from "../../../api/reports/reports";
import { VolunteerActivityReport } from "../../../types/reports/reports";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import Tabs from "../../../components/dataDisplay/Tabs";
import VolunteersTab from "./VolunteersTab";
import HoursTab from "./HoursTab";
import Button from "../../../components/buttons/Button";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { Renderer } from "xlsx-renderer";
import { saveAs } from "file-saver";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ViewVolunteerActivityReport = () => {
  const [report, setReport] = useState<VolunteerActivityReport | null>(null);

  useEffect(() => {
    reportsApi.getVolunteerActivityReport().then((report) => setReport(report));
  }, []);

  const volunteersPage = {
    id: "volunteers",
    tabTitle: "By Volunteers",
    page: report ? <VolunteersTab report={report} /> : <></>,
  };

  const hoursPage = {
    id: "hours",
    tabTitle: "By Hours",
    page: report ? <HoursTab report={report} /> : <></>,
  };

  const handleExportActivityReport = useCallback(() => {
    interface ExportFormat {
      month: string;
      interest: string;
      count: number;
      hours: number;
    }
    const rowCountPerInterest = report![0].volunteers.dataPoints.length;
    const tableData = {
      rows: [] as ExportFormat[],
    };

    for (const interestRow of report!) {
      for (let i = 0; i < rowCountPerInterest; i++) {
        tableData.rows.push({
          month: interestRow.volunteers.dataPoints[i].label,
          interest: interestRow.name,
          count: interestRow.volunteers.dataPoints[i].y,
          hours: interestRow.minutes.dataPoints[i].y / 60,
        });
      }
    }

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/templates/VolunteerActivityTemplate.xlsx`
    )
      // 2. Get template as ArrayBuffer.
      .then((response) => response.arrayBuffer())
      // 3. Fill the template with data (generate a report).
      .then((buffer) => new Renderer().renderFromArrayBuffer(buffer, tableData))
      // 4. Get a report as buffer.
      .then((report) => report.xlsx.writeBuffer())
      // 5. Use `saveAs` to download on browser site.
      .then((buffer) =>
        saveAs(
          new Blob([buffer]),
          `${Date.now()}_volunteer_activities_report.xlsx`
        )
      )
      // Handle errors.
      .catch((err) => console.log("Error writing excel export", err));
  }, [report]);

  return (
    <div className="items-center justify-between w-full p-6 mx-auto max-w-7xl lg:px-8">
      <div className="w-full">
        <div className="items-center justify-between flex-initial w-full sm:flex">
          <div className="flex items-center justify-between w-full mt-4">
            <h1 className="text-3xl text-gray-800">
              Volunteer Activity Report
            </h1>
            <Button
              roundness="md"
              py={2}
              bgColor="white"
              textColor="text-primary-700"
              outlined
              outlineColor="border-primary-700"
              onClick={handleExportActivityReport}
            >
              <ArrowDownOnSquareIcon className="w-4 h-4 mr-2 stroke-2" />
              Export Volunteer Activity Report
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-4">
        <Tabs
          tabs={[volunteersPage, hoursPage]}
          defaultTabId="volunteers"
          mt={8}
        />
      </div>
    </div>
  );
};

export default ViewVolunteerActivityReport;
