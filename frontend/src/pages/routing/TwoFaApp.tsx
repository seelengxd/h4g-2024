import { Navigate, Route, Routes } from "react-router-dom";
import SgId from "../auth/TwoFaSgIdLogin";
import TwoFaSgIdRedirect from "../auth/TwoFaSgIdRedirect";

const TwoFaApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SgId />} />
      <Route path="/two-fa" element={<SgId />} />
      <Route path="/two-fa-redirect" element={<TwoFaSgIdRedirect />} />

      {/* Default pages to sign in form if user not logged in */}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default TwoFaApp;
