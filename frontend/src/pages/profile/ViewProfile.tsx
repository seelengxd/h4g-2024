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

//todo add gender and salutation in profile, current db does not have

const ViewProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();

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
    dob: profile?.dob || null,
    description: profile?.description || "",
    interests: profile?.interests || [],
    skills: profile?.skills || [],
    imageUrl: profile?.imageUrl || "",
    //ui has no section for availability yet, not dealing with mon-sun
  };

  console.log(initialValues);

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
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

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
              placeholder={initialValues.fullName}
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
            />

            <InputStatic
              label="Preferred Name"
              placeholder={initialValues.prefName}
              name="prefName"
              value={values.prefName}
              onChange={handleChange}
              required
            />

            <InputStatic
              label="Email"
              placeholder={initialValues.email}
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />

            <InputStatic
              label="Description"
              placeholder={initialValues.description}
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

        <div className="flex-1">
        <h2 className="pt-10 text-lg font-bold pb-2">Skills</h2>
        <SearchBar s='skill'/>
        
        <h2 className="pt-10 text-lg font-bold pb-2">Interests</h2>
        <SearchBar s="interest" />
        
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
