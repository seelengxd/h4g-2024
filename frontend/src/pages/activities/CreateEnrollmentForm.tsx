import { ReactNode, useState } from "react";
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

const CreateEnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(createFormData());

  // I don't think this works... remove once I give up.
  // which at this rate, is going to be incredibly soon.

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
      const nextId = componentWithOptions.options.reduce(
        (curr, prev) => Math.max(curr, prev.id + 1),
        1
      );
      componentWithOptions.options.push(createOptionData(nextId));
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

  const handleFormTitleChange = (title: string) => {
    setFormData({ ...formData, title });
  };

  const handleFormDescriptionChange = (description: string) => {
    setFormData({ ...formData, description });
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

  return (
    <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 h-screen">
      <div className="flex flex-col justify-center">
        <input
          value={formData.title}
          className="ml-4 text-4xl"
          onChange={(e) => handleFormTitleChange(e.target.value)}
          placeholder="Form title"
          required
        />
        <textarea
          value={formData.description}
          className="mt-4 text-md ml-4 text-gray-400"
          onChange={(e) => handleFormDescriptionChange(e.target.value)}
          placeholder="Enter description here"
        >
          Form description
        </textarea>
        <hr className="my-4 ml-4" />
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
                      onQuestionTitleChange={handleQuestionTitleChange(index)}
                    />
                  ))}
                </div>
                {provided.placeholder}
              </>
            )}
          </Droppable>
        </DragDropContext>

        <div className="ml-4 flex">
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

        <div className="mt-4 mb-2 ml-4 flex justify-center">
          <Button>Create Form!</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEnrollmentForm;
