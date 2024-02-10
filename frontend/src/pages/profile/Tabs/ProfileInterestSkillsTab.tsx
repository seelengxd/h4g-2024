import ReactSelect from "react-select";
import Button from "../../../components/buttons/Button";
import { useFormikContext } from "formik";
import { ProfilePostData } from "../../../types/users/profiles";
import { generateOptionsFromObject } from "../../../utils/miscellaneous";
import { Interest } from "../../../types/interests/interests";
import { Skill } from "../../../types/skills/skills";

interface ProfileInterestSkillsTabProps {
  skills: Skill[];
  interests: Interest[];
}

const ProfileInterestSkillsTab: React.FC<ProfileInterestSkillsTabProps> = ({
  skills,
  interests,
}) => {
  const formik = useFormikContext<ProfilePostData>();
  const { values, setFieldValue } = formik;

  const skillOptions = generateOptionsFromObject(skills);
  const interestOptions = generateOptionsFromObject(interests);

  return (
    <div className="flex h-screen col-span-3 py-20 m1">
      <div className="flex flex-col flex-1 pr-20">
        <h1 className="text-2xl form-medium">Skills and Interests</h1>

        <div className="flex flex-col mt-4 space-y-10">
          <div className="grid grid-cols-2">
            <div className="flex-1 pr-20">
              <h2 className="pt-10 pb-2 text-lg font-bold">Skills</h2>

              <p className="pb-3 text-sm text-gray-600">
                {" "}
                Search for your skill sets (e.g. Guitar playing, emceeing, etc.){" "}
              </p>
              <ReactSelect
                options={skillOptions}
                value={skillOptions?.filter((option) =>
                  values.skills?.includes(Number(option.value))
                )}
                isMulti
                onChange={(option) =>
                  setFieldValue(
                    "skills",
                    option.map((option) => option.value)
                  )
                }
              ></ReactSelect>

              <h2 className="pt-10 pb-2 text-lg font-bold">Interests</h2>
              <p className="pb-3 text-sm text-gray-600">
                Keywords to describe the kind of event you are interested in,
                from the type of beneficiaries to the nature/theme of the event.
              </p>
              <ReactSelect
                options={interestOptions}
                value={interestOptions?.filter((option) =>
                  values.interests?.includes(Number(option.value))
                )}
                isMulti
                onChange={(option) => {
                  setFieldValue(
                    "interests",
                    option.map((option) => option.value)
                  );
                }}
              ></ReactSelect>
              <div className="pt-12">
                <Button type="submit" roundness="3xl" fullWidth>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInterestSkillsTab;
