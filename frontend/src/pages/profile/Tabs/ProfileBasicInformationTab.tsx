import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
import Button from "../../../components/buttons/Button";
import FormControl from "../../../components/forms/FormControl";
import FormTextAreaInput from "../../../components/forms/FormTextAreaInput";
import ImageUploader from "../../../components/forms/ImageUploader";
import Input from "../../../components/forms/Input";
import Label from "../../../components/forms/Label";
import { useFormikContext } from "formik";
import {
  EducationLevel,
  EducationLevelToLabelMap,
  Gender,
  GenderToLabelMap,
  ImmigrationStatus,
  ImmigrationStatusLabelMap,
  Profile,
  ProfilePostData,
  Salutation,
  SalutationLabelMap,
} from "../../../types/users/profiles";
import { useEffect, useState } from "react";
import ButtonInput from "../../../components/buttons/DateButtonInput";
import { generateEnumFormOptions } from "../../../utils/miscellaneous";

interface ProfileBasicInformationTabProps {
  profile?: Profile;
}

const ProfileBasicInformationTab: React.FC<ProfileBasicInformationTabProps> = ({
  profile,
}: ProfileBasicInformationTabProps) => {
  const formik = useFormikContext<ProfilePostData>();
  const { values, handleBlur, handleChange, setFieldValue } = formik;
  const [imageDisplayUrl, setImageDisplayUrl] = useState("");

  useEffect(() => {
    if (profile?.imageUrl) {
      setImageDisplayUrl(
        process.env.REACT_APP_BACKEND_URL! + "/" + profile?.imageUrl
      );
    }
  }, [profile]);

  // Form Options
  const genderOptions = generateEnumFormOptions(Gender, GenderToLabelMap);
  const educationLevelOptions = generateEnumFormOptions(
    EducationLevel,
    EducationLevelToLabelMap
  );
  const immigrationStatusOptions = generateEnumFormOptions(
    ImmigrationStatus,
    ImmigrationStatusLabelMap
  );
  const salutationOptions = generateEnumFormOptions(
    Salutation,
    SalutationLabelMap
  );

  return (
    <div className="flex h-screen col-span-3 py-20 m1">
      <div className="flex flex-col flex-1 pr-20">
        <h1 className="pb-2 text-2xl form-medium">My Profile</h1>
        <div className="flex items-center justify-center w-24 h-24 mt-4 overflow-hidden rounded-full">
          <FormControl onBlur={handleBlur}>
            <div className="flex items-center justify-center w-40 scale-150 hover:scale-50">
              <ImageUploader
                name="image"
                type="file"
                fileConstraintLabel="Upload an image file"
                imgDisplayUrl={imageDisplayUrl}
                onChange={(event) => {
                  const reader = new FileReader();
                  let file = (
                    event.currentTarget as unknown as { files: File[] }
                  ).files[0];
                  reader.onloadend = () => {
                    setImageDisplayUrl(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("image", file);
                }}
              />
            </div>
          </FormControl>
        </div>

        <div className="grid grid-cols-2 pt-4 mt-4 gap-x-12">
          <div className="flex flex-col gap-4">
            <Input
              label="Full Name (as per NRIC)"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
            />

            <div className="mt-4">
              <Input
                label="Preferred Name"
                name="prefName"
                value={values.prefName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <ReactSelect
                placeholder="Gender"
                options={genderOptions}
                value={genderOptions.find(
                  (option) => option.value === values.gender
                )}
                onChange={(option) => {
                  setFieldValue("gender", option?.value);
                }}
              />
              <ReactSelect
                placeholder="Salutation"
                options={salutationOptions}
                value={salutationOptions.find(
                  (option) => option.value === values.salutation
                )}
                onChange={(option) => {
                  setFieldValue("salutation", option?.value);
                }}
              />
            </div>

            <div className="w-full mt-4 customDatePickerWidth">
              <Label htmlFor="dob">Date Of Birth</Label>
              <ReactDatePicker
                selected={values.dob}
                onChange={(date) => setFieldValue("dob", date)}
                selectsStart
                nextMonthButtonLabel=">"
                previousMonthButtonLabel="<"
                popperClassName="react-datepicker-left"
                customInput={<ButtonInput />}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" roundness="3xl" fullWidth>
                Save Changes
              </Button>
            </div>
          </div>
          <div className="flex-1 pr-20 space-y-4">
            <div>
              <Label htmlFor="educationLevel">Education Level</Label>
              <ReactSelect
                placeholder="Education Level"
                options={educationLevelOptions}
                value={educationLevelOptions.find(
                  (option) => option.value === values.educationLevel
                )}
                onChange={(option) =>
                  setFieldValue("educationLevel", option?.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="immigrationStatus">Immigration Status</Label>
              <ReactSelect
                placeholder="Immigation Status"
                options={immigrationStatusOptions}
                value={immigrationStatusOptions.find(
                  (option) => option.value === values.immigrationStatus
                )}
                onChange={(option) =>
                  setFieldValue("immigrationStatus", option?.value)
                }
              />
            </div>
            <div className="mt-4">
              <FormTextAreaInput
                label="Description"
                name="description"
                value={values.description || ""}
                onChange={(value) => setFieldValue("description", value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBasicInformationTab;
