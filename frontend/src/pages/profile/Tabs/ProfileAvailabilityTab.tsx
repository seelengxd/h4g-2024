import { useFormikContext } from "formik";
import ReactSelect from "react-select";
import Button from "../../../components/buttons/Button";
import Label from "../../../components/forms/Label";
import {
  CommitmentLevel,
  CommitmentLevelLabelMap,
  ProfilePostData,
} from "../../../types/users/profiles";
import { generateEnumFormOptions } from "../../../utils/miscellaneous";

const ProfileAvailabilityTab: React.FC = () => {
  const formik = useFormikContext<ProfilePostData>();
  const { values, setFieldValue } = formik;

  const commitmentLevelOptions = generateEnumFormOptions(
    CommitmentLevel,
    CommitmentLevelLabelMap
  );

  const toggleAvailabilityValue = (index: number) => () => {
    const bitString = values.availability.split("");
    bitString[index] = bitString[index] === "0" ? "1" : "0";
    setFieldValue("availability", bitString.join(""));
  };

  return (
    <div className="flex h-screen col-span-3 py-20 m1">
      <div className="flex flex-col flex-1 pr-20">
        <h1 className="pb-2 text-2xl form-medium">Availability</h1>

        <div className="flex flex-col pt-4 mt-4 space-y-10">
          <div>
            <p>Are you currently licensed to drive in Singapore?</p>

            <div className="flex items-center mb-4">
              <input
                name="driving yes"
                type="checkbox"
                checked={values.driving}
                className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                onChange={async (e) => {
                  await setFieldValue("driving", !e.currentTarget.value);
                  console.log(values.driving);
                }}
              />

              <label className="text-sm font-medium text-gray-900 ms-2">
                Yes
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                name="driving no"
                type="checkbox"
                checked={!values.driving}
                className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                onChange={() => setFieldValue("driving", !values.driving)}
              />

              <label className="text-sm font-medium text-gray-900 ms-2">
                No
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="commitmentPreference">Commitment Preference</Label>
            <ReactSelect
              placeholder="Commitment Preference"
              options={commitmentLevelOptions}
              value={commitmentLevelOptions.find(
                (option) => option.value === values.commitmentLevel
              )}
              onChange={(option) =>
                setFieldValue("commitmentLevel", option?.value)
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-y-2">
            <div></div>
            <div className="text-center">
              <p>Morning</p>
              <p className="text-sm">8AM-12PM</p>
            </div>
            <div className="text-center">
              <p>Afternoon</p>
              <p className="text-sm">12PM-4PM</p>
            </div>
            <div className="text-center">
              <p>Evening</p>
              <p className="text-sm">4PM-9PM</p>
            </div>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <>
                <div>
                  <p>{day}</p>
                </div>
                <div className="mx-auto">
                  <input
                    type="checkbox"
                    checked={values.availability[index * 3] === "1"}
                    className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    onChange={toggleAvailabilityValue(index * 3)}
                  />
                </div>
                <div className="mx-auto">
                  <input
                    type="checkbox"
                    checked={values.availability[index * 3 + 1] === "1"}
                    className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    onChange={toggleAvailabilityValue(index * 3 + 1)}
                  />
                </div>
                <div className="mx-auto">
                  <input
                    type="checkbox"
                    checked={values.availability[index * 3 + 2] === "1"}
                    className="w-6 h-6 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2"
                    onChange={toggleAvailabilityValue(index * 3 + 2)}
                  />
                </div>
              </>
            ))}
          </div>

          <div className="pt-4">
            <Button type="submit" roundness="3xl" fullWidth>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 pr-20"></div>
    </div>
  );
};

export default ProfileAvailabilityTab;
