import Button from "../../components/buttons/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import activitiesAPI from "../../api/activities/activities";
import { ActivityData } from "../../types/activities/activities";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ClockTwoIcon, LocationPinIcon } from "../../components/icons/icons";
import { format } from "date-fns";

const ViewEnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const { activityId, id } = useParams();
  const [activity, setActivity] = useState<ActivityData | null>(null);

  useEffect(() => {
    activitiesAPI.getActivity(parseInt(activityId!)).then((activity) => {
      setActivity(activity);
    });
  }, [id]);

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

  return activity ? (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="p-4">
        <Link
          to={"/activities/" + activityId}
          className="flex items-center mb-12 text-xl font-bold"
        >
          <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
          Back to Activity
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-24">
        <div className="flex flex-col p-4 leading-normal">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            {activity.name}
          </h2>
          <p>
            by{" "}
            <Link
              to={"/organisations" + activity.organisationId.toString()}
              className="hover:underline"
            >
              {activity.organisation.name}
            </Link>
          </p>
          <p className="flex items-center mt-2 text-md">
            <LocationPinIcon className="w-4 h-4 mr-2" />
            {activity.location}
          </p>
          {!!activity.sessions.length && (
            <p className="flex items-center mt-2 text-md">
              <ClockTwoIcon className="w-4 h-4 mr-2" />
              <p>
                {format(
                  new Date(activity.sessions[0]!.start),
                  "EEEE d MMMM, hh:mma-"
                )}
                {new Date(activity.sessions[0]!.start).getDay() ===
                new Date(activity.sessions[0]!.end).getDay()
                  ? format(new Date(activity.sessions[0]!.end), "hh:mma")
                  : format(
                      new Date(activity.sessions[0]!.end),
                      " d MMM, hh:mma"
                    )}
              </p>
            </p>
          )}
        </div>
        <div className="flex flex-col col-span-2 gap-8 pl-2">
          <p className="text-4xl">Enrollment Form</p>
          <p>
            This is the additional form volunteers will see when they sign up
            for this activity.
          </p>
          <form
            className="items-center justify-between"
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
                            onChange={(newValue) =>
                              handleChange(index)(newValue)
                            }
                          />
                        );
                      case "multiline":
                        return (
                          <TextAreaInput
                            component={component}
                            value={answers[index].value as string}
                            onChange={(newValue) =>
                              handleChange(index)(newValue)
                            }
                          />
                        );
                      case "multiselect":
                        return (
                          <MultiSelectInput
                            component={component}
                            value={answers[index].value as number[]}
                            onChange={(newValue) =>
                              handleChange(index)(newValue)
                            }
                          />
                        );
                      case "select":
                        return (
                          <DropdownInput
                            component={component}
                            value={answers[index].value as number}
                            onChange={(newValue) =>
                              handleChange(index)(newValue)
                            }
                          />
                        );
                    }
                  })}
                  <Button type="submit" disabled>
                    Submit
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewEnrollmentForm;
