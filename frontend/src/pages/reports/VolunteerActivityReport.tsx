import { useEffect, useState } from "react";
import reportsApi from "../../api/reports/reports";
import { VolunteerActivityReport } from "../../types/reports/reports";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import Tabs from "../../components/dataDisplay/Tabs";
import VolunteersTab from "./VolunteersTab";
import HoursTab from "./HoursTab";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ViewVolunteerActivityReport = () => {
  const [report, setReport] = useState<VolunteerActivityReport | null>(null);

  useEffect(() => {
    reportsApi.getVolunteerActivityReport().then((report) => setReport(report));
  }, []);

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
    data: report?.map((row) => ({
      type: "spline",
      name: row.name,
      showInLegend: true,
      dataPoints: row.minutes.dataPoints.map((dataPoint) => ({
        ...dataPoint,
        y: dataPoint.y / 60,
      })),
    })),
  };

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

  return (
    <div className="items-center justify-between w-full p-6 mx-auto max-w-7xl lg:px-8">
      <div className="w-full">
        <div className="items-center justify-between flex-initial w-full sm:flex">
          <div className="flex items-center mt-4">
            <h1 className="text-3xl text-gray-800">
              Volunteer Activity Report
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-8">
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
