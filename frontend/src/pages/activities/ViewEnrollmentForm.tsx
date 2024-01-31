import Label from "../../components/forms/Label";
import { FormData } from "../../types/forms/forms";

const ViewEnrollmentForm: React.FC = () => {
  const formData: FormData = {
    title: "Untitled Form",
    description: "some form description",
    components: [
      {
        id: 2,
        type: "text",
        title: "short",
      },
      {
        id: 1,
        type: "multiselect",
        title: "checkboxes",
        options: [
          {
            id: 1,
            value: "test",
          },
          {
            id: 2,
            value: "test",
          },
        ],
      },
      {
        id: 3,
        type: "multiline",
        title: "paragraph",
      },
      {
        id: 4,
        type: "select",
        title: "dropdown",
        options: [
          {
            id: 1,
            value: "test",
          },
          {
            id: 2,
            value: "test",
          },
        ],
      },
    ],
    meta: {
      nextId: 5,
    },
  };

  console.log({ formData });

  return (
    <div className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8">
      <h1 className="text-6xl font-semibold text-gray-800">{formData.title}</h1>
      <p className="mt-4">{formData.description}</p>
      <hr className="my-2" />
      {/* {formData.components.map((component) => {
        return <div><Label htmlFor={component.id}></div>;
      })} */}
    </div>
  );
};

export default ViewEnrollmentForm;
