import { FireIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import {
  Activity,
  ActivityDatePostData,
  ActivityPostData,
} from "../../types/activities/activities";
import Select from "react-select";
import { Organisation } from "../../types/organisations/organisations";
import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import DatePicker from "react-datepicker"; // Import datepicker library
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles

interface Props {
  initialData?: Activity;
  handleValues: (values: ActivityPostData) => Promise<void>;
  label: string;
}

const ActivityForm: React.FC<Props> = ({
  initialData,
  handleValues,
  label,
}) => {
  const navigate = useNavigate();
  const [activityDates, setActivityDates] = useState<ActivityDatePostData[]>(
    []
  ); // State to store activity dates
  const formik = useFormik({
    initialValues: initialData
      ? {
          name: initialData.name,
          type: initialData.type,
          description: initialData.description,
          organisationId: initialData.organisationId,
          activityDates: initialData.ActivityDate,
        }
      : ({
          name: "",
          type: "VOLUNTEER",
          description: "",
          organisationId: 0,
          activityDates: [],
        } as ActivityPostData),
    validationSchema: object({
      name: string().trim().required("Name cannot be empty."),
      description: string().trim().required("Description cannot be empty."),
      organisationId: number().positive("Organisation cannot be empty."),
      activityDates: array(),
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
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="w-full">
        <div className="w-full flex flex-initial justify-between items-center">
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
          {/* <FormControl
            isInvalid={
              !!touched.activityDates && errors.activityDates !== undefined
            }
            errorMessage={JSON.stringify(errors.activityDates)}
            onBlur={handleBlur}
          >
            <Label htmlFor="activityDates">Timeslots</Label>
            
          </FormControl> */}
          <FormControl>
            <Label htmlFor="activityDates">Activity Dates</Label>
            <div>
              {/* Map through activityDates state to render datepicker for each date */}
              {activityDates.map((date, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  <DatePicker
                    showTimeSelect
                    selected={date.start}
                    onChange={(newDate) => {
                      const newDates = [...activityDates];
                      newDates[index] = { ...newDates[index], start: newDate! };
                      setActivityDates(newDates);
                    }}
                    className="border border-gray-300 rounded px-3 py-2"
                    dateFormat="yyyy-MM-dd"
                  />
                  <DatePicker
                    showTimeSelect
                    selected={date.end}
                    onChange={(newDate) => {
                      const newDates = [...activityDates];
                      newDates[index] = { ...newDates[index], end: newDate! };
                      setActivityDates(newDates);
                    }}
                    className="border border-gray-300 rounded px-3 py-2"
                    dateFormat="yyyy-MM-dd"
                  />
                  {/* Button to remove date entry */}
                  <button
                    type="button"
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded"
                    onClick={() => {
                      const newDates = [...activityDates];
                      newDates.splice(index, 1);
                      setActivityDates(newDates);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {/* Button to add new date entry */}
              <button
                type="button"
                className="px-3 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  setActivityDates([
                    ...activityDates,
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

export default ActivityForm;
