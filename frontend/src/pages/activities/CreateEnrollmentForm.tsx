import { ReactNode, useState } from "react";
import Button from "../../components/buttons/Button";
import InputBuilder from "../../components/forms/InputBuilder";
import { createFormData, createTextInputData } from "../../utils/forms";
import { FormData } from "../../types/forms/forms";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";

const CreateEnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(createFormData());
  console.log({ formData });

  // I don't think this works... remove once I give up.
  // which at this rate, is going to be incredibly soon.
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

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

    // I dont even know how the undefined got there.
    setFormData({
      ...formData,
      components: newComponents.filter((component) => component !== undefined),
    });
  };
  return (
    <div className="mx-auto max-w-4xl items-center justify-between p-6 lg:px-8 h-screen">
      <div className="flex flex-col justify-center">
        <input value={"Untitled Form"} className="ml-4 text-4xl "></input>
        <textarea
          className="mt-4 text-md ml-4 text-gray-400"
          contentEditable
          onInput={(e) => console.log(e.currentTarget.value)}
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
                    <InputBuilder component={component} index={index} />
                  ))}
                </div>
                {provided.placeholder}
              </>
            )}

            {/* {
            <>
              {formData.components.map((component) => (
                
                  {(provided) => (
                    <InputBuilder
                      //   ref={provided.innerRef}
                      {...provided.droppableProps}
                    />
                  )}
                
              }
            </>
          } */}
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
