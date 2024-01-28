import { Route, Routes } from "react-router-dom";
import Organisations from "../organisations/Organisations";

const AuthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/organisations" element={<Organisations />} />
    </Routes>
  );
};

export default AuthenticatedApp;
