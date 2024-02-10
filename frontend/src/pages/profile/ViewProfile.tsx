import profilesAPI from "../../api/profile/profile";
import {
  Profile,
  ProfilePostData,
  CommitmentLevel,
  ImmigrationStatus,
  EducationLevel,
  Salutation,
} from "../../types/users/profiles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Skill } from "../../types/skills/skills";
import { Interest } from "../../types/interests/interests";
import ProfileUserQrTab from "./Tabs/ProfileUserQrTab";
import ProfileTwoFaSettingsTab from "./Tabs/ProfileTwoFaSettingsTab";
import ProfileBasicInformationTab from "./Tabs/ProfileBasicInformationTab";
import ProfileInterestSkillsTab from "./Tabs/ProfileInterestSkillsTab";
import ProfileAvailabilityTab from "./Tabs/ProfileAvailabilityTab";

interface Props {
  profile?: Profile;
  skills: Skill[];
  interests: Interest[];
}

const validationSchema = object().shape({
  fullName: string().trim().required("Name cannot be empty."),
  prefName: string().trim().required("Preferred name cannot be empty."),
  email: string().trim().required("Email cannot be empty."),
});

const ViewProfile: React.FC<Props> = ({ profile, skills, interests }) => {
  const [tabIndex, setTabIndex] = useState<0 | 1 | 2 | 3 | 4>(0);

  const selectedInterests = profile?.interests.map(
    (interest: Interest) => interest.id
  );
  const selectedSkills = profile?.skills.map((skill: Skill) => skill.id);

  // Get user and profile
  const user = useSelector(selectUser);

  // Set initial values
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

  const handleSubmit = async (values: ProfilePostData) => {
    await profilesAPI.updateProfile(values).then(() => navigate(`/profile`));
  };

  const navigate = useNavigate();

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
            (tabIndex === 3
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(3)}
        >
          My QR Code
        </button>
        <button
          className={
            "px-4 py-2 text-lg text-left" +
            (tabIndex === 4
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(4)}
        >
          2FA Settings
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps: FormikProps<any>) => (
          <form onSubmit={formikProps.handleSubmit} className="col-span-3">
            {tabIndex === 0 && <ProfileBasicInformationTab profile={profile} />}
            {tabIndex === 1 && (
              <ProfileInterestSkillsTab skills={skills} interests={interests} />
            )}
            {tabIndex === 2 && <ProfileAvailabilityTab />}
            {tabIndex === 3 && (
              <ProfileUserQrTab user={user} profile={profile} />
            )}
            {tabIndex === 4 && <ProfileTwoFaSettingsTab user={user} />}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ViewProfile;
