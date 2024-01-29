import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import { useState } from "react";
import {
  Organisation,
  OrganisationsPostData,
} from "../../types/organisations/organisations";

interface Props {
  initialData?: Organisation;
  handleValues: (values: OrganisationsPostData) => Promise<void>;
  label: string;
}

const OrganisationForm: React.FC<Props> = ({
  initialData,
  handleValues,
  label,
}) => {
  const [imageDisplayUrl, setImageDisplayUrl] = useState(
    initialData
      ? process.env.REACT_APP_BACKEND_URL! + "/" + initialData.image_url
      : ""
  );
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          websiteUrl: initialData.website_url,
          image: undefined,
        }
      : {
          name: "",
          description: "",
          websiteUrl: "",
          image: undefined,
        },
    validationSchema: object({
      name: string().trim().required("Name cannot be empty."),
      description: string().trim().required("Description cannot be empty."),
      websiteUrl: string().url("Please enter a valid URL."),
    }),
    onSubmit: async (values) => {
      handleValues(values).then(() => navigate("/organisations"));
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

  return (
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="w-full">
        <div className="w-full flex flex-initial justify-between items-center">
          <div className="flex items-center mt-4">
            <BuildingOfficeIcon className="w-10 h-10 mr-4" />
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
            isInvalid={!!touched.websiteUrl && errors.websiteUrl !== undefined}
            errorMessage={errors.websiteUrl}
            onBlur={handleBlur}
          >
            <Label htmlFor="websiteUrl">Link to organisation website</Label>
            <Input
              name="websiteUrl"
              value={values.websiteUrl}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl onBlur={handleBlur}>
            <Label htmlFor="new-password">Image</Label>
            <Input
              name="image"
              type="file"
              onChange={(event) => {
                const reader = new FileReader();
                let file = (event.currentTarget as unknown as { files: File[] })
                  .files[0];
                reader.onloadend = () => {
                  setImageDisplayUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
                setFieldValue("image", file);
              }}
            />
            {imageDisplayUrl && (
              <img
                className="mt-4 w-full md:w-56"
                src={imageDisplayUrl}
                alt="uploaded"
              />
            )}
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

export default OrganisationForm;
