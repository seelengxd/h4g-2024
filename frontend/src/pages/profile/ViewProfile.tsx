import profilesAPI from "../../api/profile/profile";
import {
  Profile,
  PostData,
  CommitmentLevel,
  ImmigrationStatus,
  EducationLevel,
  Gender,
  Salutation,
} from "../../types/users/profiles";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import Button from "../../components/buttons/Button";
import InputStatic from "../../components/forms/InputStatic";
import ReactSelect from "react-select";
import { Skill } from "../../types/skills/skills";
import { Interest } from "../../types/interests/interests";
import skillsApi from "../../api/skills/skills";
import interestApi from "../../api/interests/interests";
import ImageUploader from "../../components/forms/ImageUploader";
import FormControl from "../../components/forms/FormControl";
import Input from "../../components/forms/Input";
import FormTextAreaInput from "../../components/forms/FormTextAreaInput";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import Label from "../../components/forms/Label";
import UserQrTab from "./UserQrTab";

interface Props {
  profile?: Profile;
  skills: Skill[];
  interests: Interest[];
}

const ViewProfile: React.FC<Props> = ({ profile, skills, interests }) => {
  const [imageDisplayUrl, setImageDisplayUrl] = useState(
    profile?.imageUrl || ""
  );

  const [tabIndex, setTabIndex] = useState<0 | 1 | 2 | 3>(0);

  const allSkills = skills.map((skill: Skill) => ({
    label: skill.name,
    value: skill.id,
  }));

  const allInterests = interests.map((interest: Interest) => ({
    label: interest.name,
    value: interest.id,
  }));

  const selectedInterests = profile?.interests.map(
    (interest: Interest) => interest.id
  );
  const selectedSkills = profile?.skills.map((skill: Skill) => skill.id);

  //get user and profile
  const user = useSelector(selectUser);

  //set initial values
  const initialValues = {
    fullName: user?.fullName || "",
    prefName: user?.preferredName || "",
    email: user?.email || "",
    dob: profile?.dob ? new Date(profile?.dob) : new Date(),
    description: profile?.description || "",
    interests: selectedInterests || [],
    skills: selectedSkills || [],
    imageUrl: profile?.imageUrl || "",
    image: undefined,
    gender: profile?.gender,
    salutation: profile?.salutation || Salutation.Mr,

    driving: profile?.driving || false,
    ownVehicle: profile?.ownVehicle || false,
    availability: profile?.availability || "000000000000000000000",
    immigrationStatus: profile?.immigrationStatus || ImmigrationStatus.Citizen,
    commitmentLevel: profile?.commitmentLevel || CommitmentLevel.Adhoc,
    educationLevel: profile?.educationLevel || EducationLevel.Secondary,
  };

  const handleValues = async (values: PostData) => {
    await profilesAPI.updateProfile(values);
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object({
      fullName: string().trim().required("Name cannot be empty."),
      prefName: string().trim().required("Preferred name cannot be empty."),
      email: string().trim().required("Email cannot be empty."),
    }),
    onSubmit: async (values) => {
      handleValues({ ...values, gender: values.gender! }).then(() =>
        navigate(`/profile`)
      );
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    formik;

  const genderOptions = [
    {
      label: "Male",
      value: Gender.Male,
    },
    {
      label: "Female",
      value: Gender.Female,
    },
    {
      label: "Other",
      value: Gender.Other,
    },
  ];

  // Options array for EducationLevel
  const educationLevelOptions = [
    {
      label: "No",
      value: EducationLevel.No,
    },
    {
      label: "Primary",
      value: EducationLevel.Primary,
    },
    {
      label: "Lower Secondary",
      value: EducationLevel.LowerSecondary,
    },
    {
      label: "Secondary",
      value: EducationLevel.Secondary,
    },
    {
      label: "Post-Secondary",
      value: EducationLevel.PostSecondary,
    },
    {
      label: "Diploma",
      value: EducationLevel.Diploma,
    },
    {
      label: "Professional",
      value: EducationLevel.Professional,
    },
    {
      label: "Bachelor",
      value: EducationLevel.Bachelor,
    },
    {
      label: "Master",
      value: EducationLevel.Master,
    },
    {
      label: "Doctorate",
      value: EducationLevel.Doctorate,
    },
  ];

  // Options array for CommitmentLevel
  const commitmentLevelOptions = [
    {
      label: "Adhoc",
      value: CommitmentLevel.Adhoc,
    },
    {
      label: "Weekly",
      value: CommitmentLevel.Weekly,
    },
    {
      label: "Monthly",
      value: CommitmentLevel.Monthly,
    },
  ];

  // Options array for ImmigrationStatus
  const immigrationStatusOptions = [
    {
      label: "Citizen",
      value: ImmigrationStatus.Citizen,
    },
    {
      label: "PR",
      value: ImmigrationStatus.Pr,
    },
    {
      label: "EP",
      value: ImmigrationStatus.Ep,
    },
    {
      label: "DP",
      value: ImmigrationStatus.Dp,
    },
    {
      label: "LOC",
      value: ImmigrationStatus.LOC,
    },
    {
      label: "WP",
      value: ImmigrationStatus.WP,
    },
    {
      label: "Visitor",
      value: ImmigrationStatus.Vis,
    },
  ];

  const salutationOptions = [
    {
      label: "Mr",
      value: Salutation.Mr,
    },
    {
      label: "Mrs",
      value: Salutation.Mrs,
    },
    {
      label: "Ms",
      value: Salutation.Ms,
    },
    {
      label: "Miss",
      value: Salutation.Miss,
    },
    {
      label: "Madam",
      value: Salutation.Madam,
    },
    {
      label: "Dr",
      value: Salutation.Dr,
    },
  ];

  const toggleAvailabilityValue = (index: number) => () => {
    const bitString = values.availability.split("");
    bitString[index] = bitString[index] === "0" ? "1" : "0";
    setFieldValue("availability", bitString.join(""));
  };

  const firstTab = (
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
              //placeholder={initialValues.fullName}
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
            />

            <div className="mt-4">
              <Input
                label="Preferred Name"
                //placeholder={initialValues.prefName}
                name="prefName"
                value={values.prefName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <Input
                label="Email"
                //placeholder={initialValues.email}
                name="email"
                value={values.email}
                // onChange={(e) => {
                //   console.log(e);
                //   console.log(e.currentTarget.value);
                //   setFieldValue("email", e.currentTarget.value);
                //   setTimeout(() => setFieldTouched("email", true));
                // }}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <ReactSelect
                placeholder="Gender"
                options={genderOptions}
                value={
                  genderOptions.filter(
                    (option) => option.value === values.gender
                  )[0]
                }
                onChange={(option) => {
                  setFieldValue("gender", option?.value);
                }}
              />
              <ReactSelect
                placeholder="Salutation"
                options={salutationOptions}
                value={
                  salutationOptions.filter(
                    (option) => option.value === values.salutation
                  )[0]
                }
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
                value={
                  educationLevelOptions.filter(
                    (option) => option.value === values.educationLevel
                  )[0]
                }
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
                value={
                  immigrationStatusOptions.filter(
                    (option) => option.value === values.immigrationStatus
                  )[0]
                }
                onChange={(option) =>
                  setFieldValue("immigrationStatus", option?.value)
                }
              />
            </div>
            <div className="mt-4">
              <FormTextAreaInput
                label="Description"
                name="description"
                value={values.description}
                onChange={(value) => setFieldValue("description", value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const secondTab = (
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
                options={allSkills}
                value={allSkills?.filter((option) =>
                  values.skills?.includes(option.value)
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
                options={allInterests}
                value={allInterests?.filter((option) =>
                  values.interests?.includes(option.value)
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

  const thirdTab = (
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
              value={
                commitmentLevelOptions.filter(
                  (option) => option.value === values.commitmentLevel
                )[0]
              }
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

  return (
    <div className="grid grid-cols-4 gap-x-8">
      <div className="flex flex-col items-start gap-8 py-20 pl-24">
        <button
          className={
            "px-4 py-2 text-lg text-left" +
            (tabIndex === 0
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(0)}
        >
          Basic Information
        </button>
        <button
          className={
            "px-4 py-2 text-lg text-left" +
            (tabIndex === 1
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(1)}
        >
          Interests & Skills
        </button>
        <button
          className={
            "px-4 py-2 text-lg text-left" +
            (tabIndex === 2
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(2)}
        >
          Availability
        </button>
        <button
          className={
            "px-4 py-2 text-lg text-left" +
            (tabIndex === 2
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(3)}
        >
          My QR Code
        </button>
      </div>

      <form onSubmit={handleSubmit} className="col-span-3">
        {tabIndex === 0 && firstTab}
        {tabIndex === 1 && secondTab}
        {tabIndex === 2 && thirdTab}
        {tabIndex === 3 && <UserQrTab user={user} />}
      </form>
    </div>
  );
};

// @ts-ignore
const ButtonInput = forwardRef<HTMLButtonElement>(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
  >
    {format(new Date(value), "dd MMMM yyyy")}
  </button>
));

export default ViewProfile;
