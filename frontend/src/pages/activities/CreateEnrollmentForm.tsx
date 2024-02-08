import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import InputBuilder from "../../components/forms/InputBuilder";
import {
  createFormData,
  createMultiselectInputData,
  createOptionData,
  createSelectInputData,
  createTextInputData,
  createTextareaInputData,
} from "../../utils/forms";
import {
  FormData,
  InputType,
  InputWithOptionsBase,
} from "../../types/forms/forms";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import enrollmentFormsAPI from "../../api/enrollmentForms/enrollmentForms";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/authSlice";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ActivityData } from "../../types/activities/activities";
import activitiesAPI from "../../api/activities/activities";
import Spinner from "../../components/loading/Spinner";
import { ClockTwoIcon, LocationPinIcon } from "../../components/icons/icons";
import { format } from "date-fns";

const CreateEnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(createFormData());

  // activityId
  const { id } = useParams();
  const navigate = useNavigate();
  const activityId = parseInt(id!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enrollmentFormsAPI
      .createEnrollmentForm({
        formSchema: formData,
        activityId,
      })
      .then(() => navigate("/activities/" + activityId));
  };

  const [activity, setActivity] = useState<ActivityData | null>(null);

  useEffect(() => {
    activitiesAPI.getActivity(parseInt(id!)).then((activity) => {
      setActivity(activity);
    });
  }, [id]);
  // Input change handlers
  const handleQuestionTitleChange =
    (index: number) => (questionTitle: string) => {
      const formDataCopy = _.cloneDeep(formData);
      const component = formDataCopy.components[index];
      component.title = questionTitle;
      setFormData(formDataCopy);
    };

  const handleTypeChange = (index: number) => (newType: InputType) => {
    const formDataCopy = _.cloneDeep(formData);
    const oldComponent = formDataCopy.components[index];
    let newComponent = oldComponent;

    // this one is incredibly dubious
    switch (newType) {
      case "text":
        newComponent = createTextInputData(oldComponent.id);
        break;
      case "multiline":
        newComponent = createTextareaInputData(oldComponent.id);
        break;
      case "select":
        newComponent = createSelectInputData(oldComponent.id);
        break;
      case "multiselect":
        newComponent = createMultiselectInputData(oldComponent.id);
        break;
    }

    formDataCopy.components[index] = newComponent;
    setFormData(formDataCopy);
  };

  const handleOptionValueChange =
    (index: number) => (optionIndex: number, newValue: string) => {
      const formDataCopy = _.cloneDeep(formData);
      const component = formDataCopy.components[index];
      if (["multiselect", "select"].includes(component.type)) {
        const componentWithOptions = component as InputWithOptionsBase;
        componentWithOptions.options[optionIndex].value = newValue;
        setFormData(formDataCopy);
      }
    };

  const handleOptionDelete = (index: number) => (optionIndex: number) => {
    const formDataCopy = _.cloneDeep(formData);
    const component = formDataCopy.components[index];
    if (["multiselect", "select"].includes(component.type)) {
      const componentWithOptions = component as InputWithOptionsBase;
      componentWithOptions.options[optionIndex].deleted = true;
      setFormData(formDataCopy);
    }
  };

  const handleOptionAdd = (index: number) => () => {
    const formDataCopy = _.cloneDeep(formData);
    const component = formDataCopy.components[index];
    if (["multiselect", "select"].includes(component.type)) {
      const componentWithOptions = component as InputWithOptionsBase;
      const nextId = componentWithOptions.options.reduce(
        (curr, prev) => Math.max(curr, prev.id + 1),
        1
      );
      componentWithOptions.options.push(createOptionData(nextId));
      setFormData(formDataCopy);
    }
  };

  const handleFieldDelete = (index: number) => () => {
    const formDataCopy = _.cloneDeep(formData);
    formDataCopy.components = formDataCopy.components.filter(
      (_, i) => index !== i
    );
    setFormData(formDataCopy);
  };

  // Reordering handlers
  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const toDrop = formData.components[source.index];
    const newComponents = [...formData.components];

    newComponents.splice(source.index, 1);
    newComponents.splice(destination.index, 0, toDrop);

    setFormData({
      ...formData,
      components: newComponents,
    });
  };

  return activity ? (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="p-4">
        <Link
          to={"/activities/" + id}
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
        <div className="flex flex-col h-[calc(100vh-80px)] max-h-full gap-8 overflow-y-scroll col-span-2 pl-2">
          <p className="text-4xl">Enrollment Form</p>
          <p>
            Create questions to collect information from volunteers when they
            sign up for this activity!
          </p>
          <form
            className="items-center justify-between h-screen"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-center">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="inputs">
                  {(provided) => (
                    <>
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {formData.components.map((component, index) => (
                          <InputBuilder
                            key={component.id}
                            component={component}
                            index={index}
                            onFieldDelete={handleFieldDelete(index)}
                            onTypeChange={handleTypeChange(index)}
                            onOptionValueChange={handleOptionValueChange(index)}
                            onOptionAdd={handleOptionAdd(index)}
                            onOptionDelete={handleOptionDelete(index)}
                            onQuestionTitleChange={handleQuestionTitleChange(
                              index
                            )}
                          />
                        ))}
                      </div>
                      {provided.placeholder}
                    </>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="flex">
                <Button
                  onClick={(e) =>
                    setFormData({
                      ...formData,
                      meta: {
                        nextId: formData.meta.nextId + 1,
                      },
                      components: [
                        ...formData.components,
                        createTextInputData(formData.meta.nextId),
                      ],
                    })
                  }
                >
                  Add Input
                </Button>
              </div>

              <div className="flex justify-center mt-8 mb-2">
                <Button type="submit" fullWidth>
                  Create Form!
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default CreateEnrollmentForm;
