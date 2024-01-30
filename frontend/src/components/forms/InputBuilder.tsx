import Input from "./Input";
import Select from "react-select";
import { useState } from "react";
import Button from "../buttons/Button";
import { InputData, InputType, OptionData } from "../../types/forms/forms";
import { createOptionData } from "../../utils/forms";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  nextId?: number;
  component: InputData;
  index: number;
}

const InputBuilder: React.FC<Props> = ({ nextId = 1, component, index }) => {
  const [type, setType] = useState<InputType>("text");
  const [nextOptionId, setNextOptionId] = useState(nextId);
  const typeOptions: Array<{ label: string; value: InputType }> = [
    { label: "Short answer", value: "text" },
    { label: "Paragraph", value: "multiline" },
    // TODO: maybe in the future
    // { label: "Multiple choice", value: "radio" },
    { label: "Checkboxes", value: "multiselect" },
    { label: "Dropdown", value: "select" },
  ];

  // TODO: create the six change handlers at CreateEnrollmentForm
  const [options, setOptions] = useState<OptionData[]>([]);
  return (
    <Draggable draggableId={component.id.toString()} index={index}>
      {(provided) => (
        <div
          className="border-gray-100 border-2 border-l-8 border-l-indigo-600 w-full p-4 m-4 rounded-md shadow-sm bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex gap-4 sm:gap-8 justify-center">
            <div className="mt-2 sm:w-8/12">
              {/* change 1: handle question title change */}
              <input
                placeholder={"Untitled Question"}
                required
                //   onChange={onChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 sm:w-4/12">
              {/* change 2: handle type change */}
              <Select
                name="type"
                options={typeOptions}
                value={typeOptions?.find((option) => option.value === type)}
                onChange={(option) => setType(option?.value!)}
                required
              />
            </div>
          </div>
          <div className="mt-2">
            {type === "text" ? (
              <p className="text-gray-600 underline underline-offset-4 decoration-dotted">
                Short answer text
              </p>
            ) : type === "multiline" ? (
              <p className="text-gray-600 underline underline-offset-4 decoration-dotted">
                Long answer text
              </p>
            ) : (
              <div>
                {options.map((option, index) => (
                  <div className="flex items-center mb-2" key={option.id}>
                    {type === "multiselect" && (
                      <input
                        type="checkbox"
                        checked={false}
                        className="w-6 h-6 mr-4 border-gray-300 rounded focus:ring-blue-500 "
                      />
                    )}
                    {type === "select" && (
                      <span className="mr-4 w-4">{index + 1}.</span>
                    )}
                    {/* change 3: handle option value change */}
                    <input
                      type="text"
                      value={option.value}
                      placeholder={"Option " + (index + 1)}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index].value = e.target.value;
                        setOptions(newOptions);
                      }}
                      className="block mr-4 w-1/2 rounded-md border-0 border-dotted py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {/* change 4: handle delete option */}
                    {!!index && <Button>Delete</Button>}
                  </div>
                ))}
                {/* change 5: handle add option */}
                <Button
                  onClick={() => {
                    setOptions([...options, createOptionData(nextOptionId)]);
                    setNextOptionId(nextOptionId + 1);
                  }}
                >
                  Add Option
                </Button>
                <div className="mt-2">
                  {/* change 6: handle delete field */}
                  <Button
                    onClick={() => {
                      setOptions([...options, createOptionData(nextOptionId)]);
                      setNextOptionId(nextOptionId + 1);
                    }}
                  >
                    Delete Field
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default InputBuilder;
