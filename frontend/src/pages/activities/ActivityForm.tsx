import Button from "../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import {
  ActivityMiniData,
  ActivityPostData,
  Image,
} from "../../types/activities/activities";
import Select from "react-select";
import { Organisation } from "../../types/organisations/organisations";
import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import DatePicker from "react-datepicker"; // Import datepicker library
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import FileUploader from "../../components/forms/FileUploader";
import ImageGallery from "../../components/dataDisplay/ImageGallery";
import FormTextAreaInput from "../../components/forms/FormTextAreaInput";
import _ from "lodash";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

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
  const [imageDisplayUrls, setImageDisplayUrls] = useState(
    initialData?.images.map(
      (image) => `${process.env.REACT_APP_BACKEND_URL}/${image.imageUrl}`
    ) ?? []
  );

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialData
      ? {
          name: initialData.name,
          type: initialData.type,
          description: initialData.description,
          organisationId: initialData.organisationId,
          sessions: initialData.sessions.map((session) => ({
            id: session.id,
            start: new Date(session.start),
            end: new Date(session.end),
          })),
          location: initialData.location,
          images: initialData.loadedImages!,
          capacity: initialData.capacity,
        }
      : ({
          name: "",
          type: "VOLUNTEER",
          description: "",
          organisationId: 0,
          sessions: [],
          location: "",
          images: [],
          capacity: 10,
        } as ActivityPostData),
    validationSchema: object({
      name: string().trim().required("Name cannot be empty."),
      description: string().trim().required("Description cannot be empty."),
      organisationId: number().positive("Organisation cannot be empty."),
      sessions: array(),
      capacity: number().positive("Capacity should be more than 0."),
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
      {initialData && (
        <div className="flex justify-between w-full mb-4">
          <Link
            to={"/activities/" + initialData.id}
            className="flex items-center text-xl font-bold"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
            Back to Activity
          </Link>
        </div>
      )}
      <div className="w-full">
        <div className="flex items-center justify-between flex-initial w-full">
          <div className="flex items-center mt-4">
            <h1 className="text-3xl text-gray-800">{label}</h1>
          </div>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Actvitiy Information */}
        <div className="grid grid-cols-3 gap-8 p-8 mt-4 bg-white rounded-md shadow">
          <div className="w-full col-span-3">
            <h3 className="text-lg font-medium">Activity Information</h3>
          </div>

          {/* Activity Name */}
          <div className="w-full col-span-2">
            <FormControl
              isInvalid={!!touched.name && errors.name !== undefined}
              errorMessage={errors.name}
              onBlur={handleBlur}
            >
              <Label htmlFor="Name">Activity Name</Label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>

          {/* Activity Type */}
          <div className="w-full col-span-1">
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
                styles={{
                  valueContainer: (base) => ({ ...base, fontSize: "0.875rem" }),
                }}
                required
              />
            </FormControl>
          </div>

          {/* Activity Organisation */}
          <div className="w-full col-span-2">
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
                styles={{
                  valueContainer: (base) => ({ ...base, fontSize: "0.875rem" }),
                }}
                required
              />
            </FormControl>
          </div>
          {/* Activity Capacity */}
          <div className="w-full col-span-1">
            <FormControl
              isInvalid={!!touched.capacity && errors.capacity !== undefined}
              errorMessage={errors.capacity}
              onBlur={handleBlur}
            >
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                type="number"
                name="capacity"
                value={values.capacity}
                onChange={handleChange}
              />
            </FormControl>
          </div>

          {/* Activity Location */}
          <div className="w-full col-span-3">
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
          </div>

          {/* Activity Description */}
          <div className="w-full col-span-3">
            <FormControl
              isInvalid={
                !!touched.description && errors.description !== undefined
              }
              errorMessage={errors.description}
              onBlur={handleBlur}
            >
              <Label htmlFor="description">Description</Label>
              <FormTextAreaInput
                name="description"
                value={values.description}
                onChange={(newDescription) =>
                  setFieldValue("description", newDescription)
                }
                required
              />
            </FormControl>
          </div>
        </div>

        {/* Activity Images */}
        <div className="grid grid-cols-12 gap-8 p-8 mt-4 bg-white rounded-md shadow">
          <div className="w-full col-span-12">
            <Label htmlFor="images" textSize="text-lg">
              Activity Images
            </Label>
          </div>

          {/* Image Preview */}
          {!_.isEmpty(imageDisplayUrls) && (
            <div className="w-full h-full col-span-7">
              <ImageGallery
                imageUrls={imageDisplayUrls}
                height="h-64"
                deletable
                onDelete={(updatedImageUrls) => {
                  setImageDisplayUrls(updatedImageUrls);
                  setFieldValue("images", updatedImageUrls);
                }}
              />
            </div>
          )}

          {/* Image Upload */}
          <div
            className={`flex items-start justify-center w-full h-full col-span-${
              _.isEmpty(imageDisplayUrls) ? 12 : 5
            }`}
          >
            <div className="flex flex-col w-full gap-8">
              <FormControl onBlur={handleBlur}>
                <FileUploader
                  name="images"
                  type="file"
                  fileConstraintLabel="Add one or more image files"
                  multiple
                  onChange={async (event) => {
                    const files = (
                      event.currentTarget as unknown as { files: File[] }
                    ).files;
                    const numFiles = files.length;

                    const processFile = (file: File) => {
                      const reader = new FileReader();
                      return new Promise<string>((resolve) => {
                        reader.onloadend = () => {
                          resolve(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      });
                    };

                    const promises: Promise<string>[] = [];
                    for (let i = 0; i < numFiles; i++) {
                      promises.push(processFile(files[i]));
                    }

                    await Promise.all(promises).then((dataUrls) => {
                      const updatedImageUrls =
                        dataUrls.concat(imageDisplayUrls);
                      setImageDisplayUrls(updatedImageUrls);
                      setFieldValue("images", [...values.images, ...files]);
                    });
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>

        {/* Activity Sessions */}
        <div className="flex flex-col gap-8 p-8 mt-4 bg-white rounded-md shadow">
          <h3 className="text-lg font-medium">Activity Sessions</h3>
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
        </div>
        <div>
          <Button type="submit" fullWidth>
            {label}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
