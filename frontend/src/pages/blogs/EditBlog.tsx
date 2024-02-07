import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { object, string } from "yup";
import blogsAPI from "../../api/blogs/blogs";
import Button from "../../components/buttons/Button";
import FormControl from "../../components/forms/FormControl";
import FormTextAreaInput from "../../components/forms/FormTextAreaInput";
import ImageUploader from "../../components/forms/ImageUploader";
import Label from "../../components/forms/Label";
import { selectUser } from "../../reducers/authSlice";
import { Blog, BlogPostData } from "../../types/blogs/blogs";

const EditBlog: React.FC = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [imageDisplayUrl, setImageDisplayUrl] = useState("");
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    blogsAPI.getBlog(Number(id)).then((blog) => setBlog(blog));
  }, [id]);

  const tagIds = blog?.tags.map((tag) => tag.id);

  const initialValues = {
    title: blog?.title || "",
    description: blog?.description || "",
    tags: tagIds || [],
    imageUrl: blog?.imageUrl || "",
    userId: user!.id,
    image: undefined,
  };

  const handleValues = async (values: BlogPostData) => {
    //console.log("handling: ", values);
    await blogsAPI.updateBlog(Number(id), values);
  };

  useEffect(() => {
    const fullUrl =
      process.env.REACT_APP_BACKEND_URL +
      "/" +
      (initialValues.imageUrl
        ? initialValues.imageUrl
        : "uploads/placeholder-image.png");
    setImageDisplayUrl(fullUrl);
  }, [initialValues.imageUrl]);

  //console.log("img url==> ", imageDisplayUrl);
  //console.log("img url===> ", initialValues.imageUrl);
  //console.log("dd ", blog);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object({
      title: string().trim().required("Title cannot be empty."),
      description: string()
        .trim()
        .required("Description name cannot be empty."),
    }),
    onSubmit: async (values) => {
      handleValues(values).then(() => navigate(`/blogs`));
    },
    enableReinitialize: true,
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
    <div>
      <form
        className="flex px-20 py-20 h-screen bg-primary-200"
        onSubmit={handleSubmit}
      >
        {/* left half */}
        <div className="flex flex-col w-2/3 min-w-96">
          <Link to="/blogs" className="flex justify-start items-center ">
            <svg
              className="w-4 h-4 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>

            <p className="pl-2 font-semibold">Back to Blog Posts</p>
          </Link>

          <h1 className="text-gray-600 text-2xl pt-8 pb-4"> Edit Post </h1>

          <FormControl>
            <div className="flex-1 pb-6">
              <Label htmlFor="Title">Title</Label>
              <FormTextAreaInput
                name="title"
                value={values.title}
                onChange={(newTitle) => setFieldValue("title", newTitle)}
                required
              />
            </div>

            <div className="col-span-3">
              <Label htmlFor="Title">Description</Label>
              <FormTextAreaInput
                name="description"
                value={values.description}
                onChange={(newDescription) =>
                  setFieldValue("description", newDescription)
                }
                required
              />
            </div>
          </FormControl>

          <div className="pt-4">
            <Button type="submit" roundness="3xl">
              Save Changes
            </Button>
          </div>
        </div>

        {/* right half */}
        <div className="w-1/3 pl-8 pt-8 max-w-96 min-w-96">
          <FormControl onBlur={handleBlur}>
            <div className="flex justify-center items-center pl-6">
              <ImageUploader
                name="image"
                type="file"
                fileConstraintLabel="Upload an image file"
                imgDisplayUrl={imageDisplayUrl}
                onChange={(event) => {
                  const reader = new FileReader();
                  let file = (
                    event.currentTarget as unknown as { files: File[] }
                  ).files[0];
                  reader.onloadend = () => {
                    setImageDisplayUrl(reader.result as string);
                    console.log("imgurl: ", imageDisplayUrl);
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("image", file);
                }}
              />
            </div>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
