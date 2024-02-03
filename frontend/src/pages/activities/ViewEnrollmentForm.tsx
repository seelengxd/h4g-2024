import ReactSelect from "react-select";
import Button from "../../components/buttons/Button";
import Input from "../../components/forms/Input";
import Label from "../../components/forms/Label";
import { FormData } from "../../types/forms/forms";
import { useEffect, useState } from "react";
import enrollmentFormsAPI from "../../api/enrollmentForms/enrollmentForms";
import { useParams } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";

const ViewEnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    enrollmentFormsAPI
      .getEnrollmentForm(parseInt(id!))
      .then((enrollmentForm) => setFormData(enrollmentForm.formSchema));
  }, []);

  return (
    <div className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-6xl font-semibold text-gray-800">
            {formData?.title}
          </h1>
          <p className="mt-4">{formData?.description}</p>
          <hr className="my-8 mt-4" />
          <div className="flex flex-col space-y-8">
            {formData?.components.map((component) => {
              switch (component.type) {
                case "text":
                  return (
                    <div>
                      <Label htmlFor={component.id.toString()}>
                        <p className="text-base">{component.title}</p>
                      </Label>
                      <Input
                        name={component.id.toString()}
                        onChange={() => {}}
                      />
                    </div>
                  );
                case "multiline":
                  return (
                    <div>
                      <Label htmlFor={component.id.toString()}>
                        <p className="text-base">{component.title}</p>
                      </Label>
                      <textarea
                        name={component.id.toString()}
                        onChange={() => {}}
                        rows={4}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-primary-200 rounded-2xl border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer"
                      />
                    </div>
                  );
                case "multiselect":
                  return (
                    <div>
                      <Label htmlFor={component.id.toString()}>
                        <p className="text-base">{component.title}</p>
                      </Label>
                      {component.options
                        .filter((option) => !option.deleted)
                        .map((option) => (
                          <div className="flex items-center mb-4">
                            <input
                              id={option.value + option.id}
                              type="checkbox"
                              value=""
                              className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                            />
                            <label
                              htmlFor={option.value + option.id}
                              className="text-sm font-medium text-gray-900 ms-2"
                            >
                              {option.value}
                            </label>
                          </div>
                        ))}
                    </div>
                  );
                case "select":
                  const transformedOptions = component.options.map(
                    (option) => ({
                      label: option.value,
                      value: option.id,
                    })
                  );
                  return (
                    <div>
                      <Label htmlFor={component.id.toString()}>
                        <p className="text-base">{component.title}</p>
                      </Label>
                      <ReactSelect options={transformedOptions}></ReactSelect>
                    </div>
                  );
              }
            })}
            <Button>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewEnrollmentForm;
