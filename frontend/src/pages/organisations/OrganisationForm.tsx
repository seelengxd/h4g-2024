import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import { useEffect, useMemo, useState } from "react";
import {
  Organisation,
  OrganisationsPostData,
} from "../../types/organisations/organisations";
import ImageUploader from "../../components/forms/ImageUploader";
import FormMultiSelectInput from "../../components/forms/FormMultiSelectInput";
import { OptionData } from "../../types/forms/forms";
import Spinner from "../../components/loading/Spinner";
import InterestsAPI from "../../api/interests/interests";
import { Interest } from "../../types/interests/interests";

interface Props {
  initialData?: Organisation;
  handleValues: (values: OrganisationsPostData) => Promise<Number>;
  label: string;
}

const OrganisationForm: React.FC<Props> = ({
  initialData,
  handleValues,
  label,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allCategories, setAllCategories] = useState<Interest[]>();
  const [imageDisplayUrl, setImageDisplayUrl] = useState(
    initialData
      ? process.env.REACT_APP_BACKEND_URL! + "/" + initialData.imageUrl
      : ""
  );

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          websiteUrl: initialData.websiteUrl,
          categories: initialData.categories,
          image: undefined,
        }
      : {
          name: "",
          description: "",
          websiteUrl: "",
          categories: [],
          image: undefined,
        },
    validationSchema: object({
      name: string().trim().required("Name cannot be empty."),
      description: string().trim().required("Description cannot be empty."),
      websiteUrl: string().url("Please enter a valid URL."),
    }),
    onSubmit: async (values) => {
      handleValues(values).then((id) => navigate(`/organisations/${id}`));
    },
  });

  useEffect(() => {
    setIsLoading(true);
    InterestsAPI
      .getAllInterests()
      .then((categories) => setAllCategories(categories))
      .finally(() => setIsLoading(false));
  }, []);

  const allCategoryOptions: OptionData[] | undefined = useMemo(() => allCategories?.map((interest) => (
    { id: interest.id, value: interest.name }
  )), [allCategories]);

  if (isLoading || !allCategories || !allCategoryOptions) return <Spinner />;

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
    <div className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8 mt-8">
      <div className="w-full">
        <div className="flex items-center justify-between flex-initial w-full">
          <div className="flex items-center mt-4">
            <h1 className="text-3xl text-gray-800">{label}</h1>
          </div>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 bg-white p-8 rounded-md shadow mt-4">
          <div className="flex items-start justify-center h-full col-span-1 pr-8">
            <FormControl onBlur={handleBlur}>
              <Label htmlFor="image" textSize="text-md" mb={4}>Organisation Image</Label>
              <ImageUploader
                name="image"
                type="file"
                fileConstraintLabel="Upload an image file"
                imgDisplayUrl={imageDisplayUrl}
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
            </FormControl>
         </div>

         <div className="flex flex-col justify-center col-span-2 gap-6">
          <FormControl
            isInvalid={!!touched.name && errors.name !== undefined}
            errorMessage={errors.name}
            onBlur={handleBlur}
          >
            <Label htmlFor="Name" mb={2}>Organisation Name</Label>
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
            <Label htmlFor="description" mb={2}>Description</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-300 focus:border-gray-300"
              placeholder="Organisation Description"
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
            <Label htmlFor="websiteUrl" mb={2}>Link to organisation website</Label>
            <Input
              name="websiteUrl"
              value={values.websiteUrl}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl onBlur={handleBlur}>
            <Label htmlFor="categories" mb={4}>Organisation Categories</Label>
            <FormMultiSelectInput
              name="categories"
              value={values.categories.map((category) => category.id)}
              options={allCategoryOptions}
              onChange={(newCategoryIds) =>
                setFieldValue("categories",
                newCategoryIds.map((categoryId) => allCategories.find((category) => categoryId === category.id)))
              }
            />
          </FormControl>

         </div>
        </div>
        <div>
          <Button type="submit" fullWidth>{label}</Button>
        </div>
      </form>
    </div>
  );
};

export default OrganisationForm;
