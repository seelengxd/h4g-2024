import Spinner from "../../components/loading/Spinner";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserData } from "../../types/users/users";
import volunteersApi from "../../api/users/volunteers";
import Tag from "../../components/dataDisplay/Tag";
import { Column, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  RegistrationRowData,
  VolunteerRegistrationRowData,
  VolunteerRegistrationTableColumns,
} from "../../utils/registrations";
import DataTable from "../../components/tables/DataTable";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ReactDatePicker from "react-datepicker";
import { endOfDay, format, isFuture } from "date-fns";
import Button from "../../components/buttons/Button";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { Renderer } from "xlsx-renderer";
import { saveAs } from "file-saver";

const Volunteer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState<UserData | null>(null);
  const [minDate, setMinDate] = useState<Date | undefined | null>();
  const [maxDate, setMaxDate] = useState<Date | undefined | null>();
  const [startDate, setStartDate] = useState<Date | undefined | null>();
  const [endDate, setEndDate] = useState<Date | undefined | null>();

  const columnHelper = createColumnHelper<VolunteerRegistrationRowData>();
  const volunteerRegistrationColumns: Array<
    ColumnDef<VolunteerRegistrationRowData>
  > = VolunteerRegistrationTableColumns(columnHelper);

  useEffect(() => {
    volunteersApi
      .getVolunteer(parseInt(id!))
      .then((volunteer) => {
        setVolunteer(volunteer);
        if (volunteer.registrations.length) {
          const startDates = volunteer.registrations.map(
            (registration) => registration.session.start
          );
          const endDates = volunteer.registrations.map(
            (registration) => registration.session.end
          );

          if (startDates && endDates) {
            console.log({
              volunteer,
              registrations: volunteer.registrations,
              startDates,
              endDates,
            });
            const maxDate = new Date(
              endDates.reduce(function (a, b) {
                return a > b ? a : b;
              })
            );

            const minDate = new Date(
              startDates.reduce(function (a, b) {
                return a < b ? a : b;
              })
            );
            setEndDate(maxDate);
            setStartDate(minDate);
            setMaxDate(maxDate);
            setMinDate(minDate);
          }
        }
      })
      .then(() => setLoading(false));
  }, [id]);

  let filteredData = volunteer?.registrations;
  if (startDate !== null && startDate !== undefined) {
    filteredData = filteredData?.filter(
      (registration) => new Date(registration.session.start) >= startDate
    );
  }

  if (endDate !== null && endDate !== undefined) {
    filteredData = filteredData?.filter(
      (registration) => new Date(registration.session.end) <= endOfDay(endDate)
    );
  }

  const handleExportActivityReport = useCallback(() => {
    if (!filteredData) return;

    const tableData = {
      fullName: volunteer?.fullName,
      startDate: format(startDate!, "d MMM yyyy"),
      endDate: format(endDate!, "d MMM yyyy"),
      registrations: filteredData?.map((registration) => ({
        organisationName: registration.session.activity.organisation.name,
        activityName: registration.session.activity.name,
        location: registration.session.activity.location,
        date:
          format(new Date(registration.session.start), "d MMM yyyy, h:mma-") +
          (new Date(registration.session.start).getDay() ===
          new Date(registration.session.end).getDay()
            ? format(new Date(registration.session.end), "h:mma")
            : format(new Date(registration.session.end), "d MMM, h:mma")),
        status: isFuture(registration.session.start)
          ? "Upcoming"
          : registration.attendance
          ? "Attended"
          : "Did not attend",
      })),
    };

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/templates/IndividualVolunteerActivityTemplate.xlsx`
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
          `${Date.now()}_${volunteer!.fullName}_activity_report.xlsx`
        )
      )
      // Handle errors.
      .catch((err) => console.log("Error writing excel export", err));
  }, [filteredData, endDate, startDate, volunteer]);

  if (!volunteer) return <Spinner />;
  return (
    <div className="items-center justify-between h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="flex flex-col w-full space-y-8">
        <Link
          to="/volunteers"
          className="flex items-center -mb-4 text-xl font-bold"
        >
          <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
          Back to Volunteers
        </Link>
        <div className="items-center justify-between flex-initial w-full sm:flex">
          <div className="flex items-center w-full mt-4">
            <div className="flex flex-col w-full gap-8 p-8 bg-white rounded-md shadow">
              <h2 className="text-2xl text-gray-800">Volunteer Profile</h2>

              <div className="grid grid-cols-2">
                <img
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    "/" +
                    volunteer.profile?.imageUrl
                  }
                  alt="volunteer"
                  className="m-auto rounded-full max-w-56 "
                />
                <div className="flex flex-col justify-center space-y-2">
                  <p>
                    <span className="font-semibold">Full Name: </span>
                    {volunteer.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Preferred Name: </span>
                    {volunteer.preferredName}
                  </p>
                  <p>
                    <span className="font-semibold">Email: </span>
                    {volunteer.email}
                  </p>
                  <p className="font-semibold">Skills</p>
                  <div className="flex gap-4">
                    {volunteer.profile?.skills?.map((skill) => (
                      <Tag text={skill.name} textSize="text-sm" />
                    ))}
                    {!volunteer.profile?.skills && (
                      <p className="text-sm text-red-600">
                        Volunteer did not list any skills.
                      </p>
                    )}
                  </div>
                  <p className="font-semibold">Interests</p>
                  <div className="flex gap-4">
                    {volunteer.profile?.interests?.map((skill) => (
                      <Tag text={skill.name} textSize="text-sm" />
                    ))}
                    {!volunteer.profile?.interests && (
                      <p className="text-sm text-red-600">
                        Volunteer did not list any interests.
                      </p>
                    )}
                  </div>
                  <p className="font-semibold">Description</p>
                  <p className="text-sm">{volunteer.profile?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 p-8 bg-white rounded-md shadow">
          <div className="flex justify-between">
            <h2 className="text-2xl text-gray-800">Volunteer Activity</h2>
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

          {volunteer.registrations.length ? (
            <>
              <div className="flex items-center gap-4">
                <p>Start Date:</p>
                <ReactDatePicker
                  dateFormat="dd MMM yyyy"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                />
                <p>End Date:</p>
                <ReactDatePicker
                  dateFormat="dd MMM yyyy"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
              <DataTable
                columns={volunteerRegistrationColumns}
                tableData={filteredData!}
                getColumnCanGlobalFilter={(
                  column: Column<RegistrationRowData>
                ) => column.getCanSort()}
                searchText="Search event"
              />
            </>
          ) : (
            <div className="flex justify-center mt-10 text-2xl text-gray-500">
              {" "}
              No Activity{" "}
            </div>
          )}
        </div>
      </div>

      {loading ? <Spinner /> : <div className="mt-12"></div>}
    </div>
  );
};

export default Volunteer;
