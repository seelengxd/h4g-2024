import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import {
  ActivityMiniData,
  ActivityPostData,
} from "../../types/activities/activities";
import Select from "react-select";
import { Organisation } from "../../types/organisations/organisations";
import { forwardRef, useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import DatePicker from "react-datepicker"; // Import datepicker library
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { format } from "date-fns";

interface Props {
  initialData?: ActivityMiniData;
  handleValues: (values: ActivityPostData) => Promise<void>;
  label: string;
}

const ActivityForm: React.FC<Props> = ({
  initialData,
  handleValues,
  label,
}) => {
  const x = new Date();
  x.setMonth(x.getMonth() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(x);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialData
      ? {
          name: initialData.name,
          type: initialData.type,
          description: initialData.description,
          organisationId: initialData.organisationId,
          sessions: initialData.sessions.map((session) => ({
            start: new Date(session.start),
            end: new Date(session.end),
          })),
          location: initialData.location,
        }
      : ({
          name: "",
          type: "VOLUNTEER",
          description: "",
          organisationId: 0,
          sessions: [],
          location: "",
        } as ActivityPostData),
    validationSchema: object({
      name: string().trim().required("Name cannot be empty."),
      description: string().trim().required("Description cannot be empty."),
      organisationId: number().positive("Organisation cannot be empty."),
      sessions: array(),
    }),
    onSubmit: async (values) => {
      handleValues(values).then(() => navigate("/activities"));
    },
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const typeOptions = [
    { value: "VOLUNTEER", label: "Volunteer" },
    { value: "WORKSHOP", label: "Workshop" },
    { value: "TRAINING", label: "Training" },
  ];

  const [loading, setLoading] = useState(true);
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  useEffect(() => {
    organisationsAPI
      .getAllOrganisations()
      .then((organisations) => setOrganisations(organisations))
      .finally(() => setLoading(false));
  }, []);
  const organisationOptions = organisations.map((organisation) => ({
    value: organisation.id,
    label: organisation.name,
  }));
  return (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="w-full">
        <div className="flex items-center justify-between flex-initial w-full">
          <div className="flex items-center mt-4">
            <FireIcon className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-semibold text-gray-800">{label}</h1>
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mx-auto sm:w-full md:max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormControl
            isInvalid={!!touched.name && errors.name !== undefined}
            errorMessage={errors.name}
            onBlur={handleBlur}
          >
            <Label htmlFor="Name">Name</Label>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            isInvalid={
              !!touched.description && errors.description !== undefined
            }
            errorMessage={errors.description}
            onBlur={handleBlur}
          >
            <Label htmlFor="description">Description</Label>
            <Input
              name="description"
              value={values.description}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            isInvalid={!!touched.type && errors.type !== undefined}
            errorMessage={errors.type}
            onBlur={handleBlur}
          >
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              options={typeOptions}
              value={typeOptions?.find(
                (option) => option.value === values.type
              )}
              onChange={(option) => setFieldValue("type", option?.value)}
              required
            />
          </FormControl>
          <FormControl
            isInvalid={
              !!touched.organisationId && errors.organisationId !== undefined
            }
            errorMessage={errors.organisationId}
            onBlur={handleBlur}
          >
            <Label htmlFor="organisationId">Organisation</Label>
            <Select
              name="organisationId"
              options={organisationOptions}
              value={organisationOptions?.find(
                (option) => option.value === values.organisationId
              )}
              onChange={(option) =>
                setFieldValue("organisationId", option?.value)
              }
              required
            />
          </FormControl>
          <FormControl
            isInvalid={!!touched.location && errors.location !== undefined}
            errorMessage={errors.location}
            onBlur={handleBlur}
          >
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              value={values.location}
              onChange={handleChange}
              required
            />
          </FormControl>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            nextMonthButtonLabel=">"
            previousMonthButtonLabel="<"
            popperClassName="react-datepicker-left"
            customInput={<ButtonInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-lg text-gray-700">
                  {format(date, "MMMM yyyy")}
                </span>

                <div className="space-x-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              "cursor-not-allowed opacity-50"
                                            }
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          />
          <FormControl>
            <Label htmlFor="sessions">Activity Dates</Label>
            <div>
              {/* Map through sessions state to render datepicker for each date */}
              {values.sessions.map((date, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <DatePicker
                    showTimeSelect
                    selected={date.start}
                    onChange={(newDate) => {
                      const newDates = [...values.sessions];
                      newDates[index] = { ...newDates[index], start: newDate! };
                      setFieldValue("sessions", newDates);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  <DatePicker
                    showTimeSelect
                    selected={date.end}
                    onChange={(newDate) => {
                      const newDates = [...values.sessions];
                      newDates[index] = { ...newDates[index], end: newDate! };
                      setFieldValue("sessions", newDates);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  {/* Button to remove date entry */}
                  <button
                    type="button"
                    className="px-3 py-2 ml-2 text-white bg-red-500 rounded"
                    onClick={() => {
                      const newDates = [...values.sessions];
                      newDates.splice(index, 1);
                      setFieldValue("sessions", newDates);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {/* Button to add new date entry */}
              <button
                type="button"
                className="px-3 py-2 text-white bg-blue-500 rounded"
                onClick={() =>
                  setFieldValue("sessions", [
                    ...values.sessions,
                    { start: new Date(), end: new Date() },
                  ])
                }
              >
                Add Date
              </button>
            </div>
          </FormControl>
          <div>
            <Button type="submit" fullWidth>
              {label}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ButtonInput = forwardRef<
  HTMLButtonElement,
  { value?: Date; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="inline-flex items-center justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
  >
    {format(new Date(value as any), "dd MMMM yyyy")}{" "}
    <CalendarIcon className="w-5 h-5 ml-2" />
  </button>
));

export default ActivityForm;
