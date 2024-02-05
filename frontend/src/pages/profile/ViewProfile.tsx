import profilesAPI from "../../api/profile/profile";
import { Profile, PostData } from "../../types/users/profiles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import Button from "../../components/buttons/Button";
import InputStatic from "../../components/forms/InputStatic";
import SearchBar from "../../components/searchBar/searchBar";
import ReactSelect from "react-select";
import { Skill } from "../../types/skills/skills";
import { Interest } from "../../types/interests/interests";
import skillsApi from "../../api/skills/skills";
import interestApi from "../../api/interests/interests";

//todo add gender and salutation in profile, current db does not have

const ViewProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);

  // setFieldValue("skills", [1, 2, 3] <-- your array of ids)
  //  (options: [{label: "skill": value: id}])
  useEffect(() => {
    skillsApi.getAllSkills().then((skill) => setSkills(skill));
  }, []);

  useEffect(() => {
    interestApi.getAllInterests().then((interest) => setInterests(interest));
  }, []);

  const allSkills = skills.map((skill: Skill) => ({
    label: skill.name,
    value: skill.id,
  }));

  const allInterests = interests.map((interest: Interest) => ({
    label: interest.name,
    value: interest.id,
  }));

  console.log({allInterests})

  const selectedInterests = profile?.interests.map((interest: Interest) => interest.id);
  const selectedSkills = profile?.skills.map((skill: Skill) => skill.id);

  //get user and profile
  const user = useSelector(selectUser);
  useEffect(() => {
    profilesAPI
      .getProfile()
      .then((profile) => setProfile(profile))
      .finally(() => setLoading(false));
  }, []);

  //set initial values
  const initialValues = {
    fullName: user?.fullName || "",
    prefName: user?.preferredName || "", 
    email: user?.email || "",
    dob: profile?.dob ? new Date(profile?.dob): null,
    description: profile?.description || "",
    interests: selectedInterests || [],
    skills: selectedSkills || [],
    imageUrl: profile?.imageUrl || "",
    //ui has no section for availability yet, not dealing with mon-sun
  };

  console.log("here is interest"+ initialValues.interests);

  const handleValues = async (values: PostData) => {
    await profilesAPI.updateProfile(values);
    //todo: handle updating user values
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object({
      fullName: string().trim().required("Name cannot be empty."),
      //todo add more
    }),
    onSubmit: async (values) => {
      handleValues(values).then(() => navigate(`/profile`));
    },
    enableReinitialize: true,
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    // skills: []
    // setFieldValue("skills", [])
  } = formik;

  console.log({ values });

  return (
    <div className="bg-primary-100">
      <div className="flex h-screen m1 pl-20 py-20">
        <div className="flex-1 pr-20">
          <h1 className="text-2xl font-bold pb-2">My Profile</h1>
          {initialValues.imageUrl ? (
            <img
              className="w-20 h-20 rounded-full p-2 bg-primary-200"
              src={`${process.env.REACT_APP_BACKEND_URL!}/${
                initialValues.imageUrl
              }`}
            />
          ) : (
            <img
              className="w-20 h-20 rounded-full p-2"
              src={`${process.env
                .REACT_APP_BACKEND_URL!}/uploads/user_icons/icon_4.png`}
            />
          )}

          <form
            className="flex flex-col space-y-5 pt-4"
            onSubmit={handleSubmit}
          >
            <InputStatic
              label="Full Name (as per NRIC)"
              //placeholder={initialValues.fullName}
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
            />

            <InputStatic
              label="Preferred Name"
              //placeholder={initialValues.prefName}
              name="prefName"
              value={values.prefName}
              onChange={handleChange}
              required
            />

            <InputStatic
              label="Email"
              //placeholder={initialValues.email}
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />

            <InputStatic
              label="Description"
              //placeholder={initialValues.description}
              name="description"
              value={values.description}
              onChange={handleChange}
              required
            />

            <div className="pt-2">
              <Button type="submit" roundness="3xl">
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        <div className="flex-1 pr-20">
          <h2 className="pt-10 text-lg font-bold pb-2">Skills</h2>

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

          <h2 className="pt-10 text-lg font-bold pb-2">Interests</h2>
          <ReactSelect
            options={allInterests}
            value={allInterests?.filter((option) =>
              values.interests?.includes(option.value)
            )}
            isMulti
            onChange={(option) =>
              {setFieldValue(
                "interests",
                option.map((option) => option.value))}
            }
          ></ReactSelect>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
