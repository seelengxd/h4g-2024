import { Route, Routes } from "react-router-dom";
import Error from "../error/Error";
import ViewProfile from "../profile/ViewProfile";
import profilesAPI from "../../api/profile/profile";
import Postdata from "../profile/ViewProfile"

export const Error404 = (
  <Error errorCode={404} desc="Oh no! Are you sure this page exists?" />
);

const ProfileApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewProfile/>} />

      {/* 404 */}
      <Route path="*" element={Error404} />
    </Routes>
  );
};
