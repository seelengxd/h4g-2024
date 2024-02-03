import Button from "../../components/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FormData } from "../../types/forms/forms";
import { useEffect, useState } from "react";
import enrollmentFormsAPI from "../../api/enrollmentForms/enrollmentForms";
import Spinner from "../../components/loading/Spinner";
import TextInput from "../../components/forms/custom/TextInput";
import { Answer, AnswerValue } from "../../types/enrollmentForms/submissions";
import { generateDefaultAnswer } from "../../utils/forms";
import TextAreaInput from "../../components/forms/custom/TextAreaInput";
import MultiSelectInput from "../../components/forms/custom/MultiSelectInput";
import DropdownInput from "../../components/forms/custom/DropdownInput";
import submissionsAPI from "../../api/enrollmentForms/submissions";

const ViewEnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const { activityId, id } = useParams();
  useEffect(() => {
    enrollmentFormsAPI
      .getEnrollmentForm(parseInt(id!))
      .then((enrollmentForm) => {
        setFormData(enrollmentForm.formSchema);
        setAnswers(
          enrollmentForm.formSchema.components.map((component) =>
            generateDefaultAnswer(component)
          )
        );
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (questionIndex: number) => (answer: AnswerValue) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex].value = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submissionsAPI
      .createSubmission({ answer: answers, enrollmentFormId: parseInt(id!) })
      .then(() => navigate("/activities/" + activityId));
  };

  return (
    <form
      className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
      onSubmit={handleSubmit}
    >
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
            {formData?.components.map((component, index) => {
              switch (component.type) {
                case "text":
                  return (
                    <TextInput
                      component={component}
                      value={answers[index].value as string}
                      onChange={(newValue) => handleChange(index)(newValue)}
                    />
                  );
                case "multiline":
                  return (
                    <TextAreaInput
                      component={component}
                      value={answers[index].value as string}
                      onChange={(newValue) => handleChange(index)(newValue)}
                    />
                  );
                case "multiselect":
                  return (
                    <MultiSelectInput
                      component={component}
                      value={answers[index].value as number[]}
                      onChange={(newValue) => handleChange(index)(newValue)}
                    />
                  );
                case "select":
                  return (
                    <DropdownInput
                      component={component}
                      value={answers[index].value as number}
                      onChange={(newValue) => handleChange(index)(newValue)}
                    />
                  );
              }
            })}
            <Button type="submit">Submit</Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ViewEnrollmentForm;
