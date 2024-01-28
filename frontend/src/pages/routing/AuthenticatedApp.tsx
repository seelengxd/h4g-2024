import { Route, Routes } from "react-router-dom";
import Organisations from "../organisations/Organisations";
import CreateOrganisation from "../organisations/CreateOrganisation";
import ViewOrganisation from "../organisations/ViewOrganisation";

const AuthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/organisations/new" element={<CreateOrganisation />} />
      <Route path="/organisations/:id" element={<ViewOrganisation />} />
    </Routes>
  );
};

export default AuthenticatedApp;
