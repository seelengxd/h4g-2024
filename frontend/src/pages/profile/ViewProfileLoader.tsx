import profilesAPI from "../../api/profile/profile";
import { Profile } from "../../types/users/profiles";
import React, { useEffect, useState } from "react";
import { Skill } from "../../types/skills/skills";
import { Interest } from "../../types/interests/interests";
import skillsApi from "../../api/skills/skills";
import interestApi from "../../api/interests/interests";
import Spinner from "../../components/loading/Spinner";
import ViewProfile from "./ViewProfile";

const ViewProfileLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);

  // Skills
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
