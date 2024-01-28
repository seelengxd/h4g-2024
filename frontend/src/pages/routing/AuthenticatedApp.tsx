import { Route, Routes } from "react-router-dom";
import Organisations from "../organisations/Organisations";
import CreateOrganisation from "../organisations/CreateOrganisation";

const AuthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/organisations/new" element={<CreateOrganisation />} />
    </Routes>
  );
};

export default AuthenticatedApp;
