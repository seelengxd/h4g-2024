import { useCallback, useEffect, useState } from "react";
import reportsApi from "../../../api/reports/reports";
import { VolunteerDemographicReport } from "../../../types/reports/reports";
import Tabs from "../../../components/dataDisplay/Tabs";
import Button from "../../../components/buttons/Button";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { Renderer } from "xlsx-renderer";
import { saveAs } from "file-saver";
import GenderTab from "./GenderTab";
import ImmigrationStatusTab from "./ImmigrationStatusTab";
import SkillsTab from "./SkillsTab";
import InterestsTab from "./InterestsTab";
import AgeTab from "./AgeTab";

const ViewVolunteerDemographicReport = () => {
  const [report, setReport] = useState<VolunteerDemographicReport | null>(null);

  useEffect(() => {
    reportsApi
      .getVolunteerDemographicReport()
      .then((report) => setReport(report));
  }, []);

  const volunteersPage = {
    id: "gender",
    tabTitle: "Gender",
    page: report ? <GenderTab report={report} /> : <></>,
  };

  const immigrationStatusPage = {
    id: "immigrationStatus",
    tabTitle: "Immigration Status",
    page: report ? <ImmigrationStatusTab report={report} /> : <></>,
  };

  const skillsPage = {
    id: "skills",
    tabTitle: "Skills",
    page: report ? <SkillsTab report={report} /> : <></>,
  };

  const interestsPage = {
    id: "interests",
    tabTitle: "Interests",
    page: report ? <InterestsTab report={report} /> : <></>,
  };

  const agesPage = {
    id: "age",
    tabTitle: "Age",
    page: report ? <AgeTab report={report} /> : <></>,
  };

  const handleExportActivityReport = useCallback(() => {
    const tableData = {
      age: report?.age.dataPoints,
      gender: report?.gender.dataPoints,
      interests: report?.interests.dataPoints,
      immigrationStatus: report?.immigrationStatus.dataPoints,
      skills: report?.skills.dataPoints,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/templates/VolunteerDemographicTemplate.xlsx`
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
          `${Date.now()}_volunteer_demographics_report.xlsx`
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
              Volunteer Demographic Report
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
              Export Volunteer Demographic Report
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Tabs
          tabs={[
            agesPage,
            volunteersPage,
            immigrationStatusPage,
            skillsPage,
            interestsPage,
          ]}
          defaultTabId="age"
          mt={8}
        />
      </div>
    </div>
  );
};

export default ViewVolunteerDemographicReport;
