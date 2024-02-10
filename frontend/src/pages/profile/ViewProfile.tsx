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
import ButtonTabs from "../../components/buttons/ButtonTabs";

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
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);

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

  const tabNames = [
    "Basic Information",
    "Interests & Skills",
    "Availability",
    "My QR Code",
    "2FA Settings",
  ];

  return (
    <div className="grid grid-cols-4 gap-x-8">
      <ButtonTabs
        tabNames={tabNames}
        activeTabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />

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
