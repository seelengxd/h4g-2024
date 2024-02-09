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
import FormMultiSelectInput from "../../components/forms/FormMultiSelectInput";
import Spinner from "../../components/loading/Spinner";
import ViewProfile from "./ViewProfile";

const ViewProfileLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);

  //skills
  useEffect(() => {
    skillsApi
      .getAllSkills()
      .then((skill) => setSkills(skill))
      .then(() => interestApi.getAllInterests())
      .then((interest) => setInterests(interest))
      .then(() => profilesAPI.getProfile())
      .then((profile) => {
        if (profile) {
          setProfile(profile);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <ViewProfile profile={profile} skills={skills} interests={interests} />
  );
};

// @ts-ignore
export default ViewProfileLoader;
