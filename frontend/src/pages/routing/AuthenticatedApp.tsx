import { Route, Routes } from "react-router-dom";
import Organisations from "../organisations/Organisations";
import CreateOrganisation from "../organisations/CreateOrganisation";
import ViewOrganisation from "../organisations/ViewOrganisation";
import UpdateOrganisation from "../organisations/UpdateOrganisation";
import Error from "../error/Error";
import Activities from "../activities/Activities";
import CreateActivity from "../activities/CreateActivity";
import UpdateActivity from "../activities/UpdateActivity";
import ViewActivity from "../activities/ViewActivity";

const error404 = (
  <Error errorCode={404} desc="Oh no! Are you sure this page exists?" />
);

const error403 = (
  <Error errorCode={403} desc="Ehem! You don't have permission!" />
);

const AuthenticatedApp: React.FC = () => {
  return (
    <Routes>
      {/* Organisation Routes */}
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/organisations/new" element={<CreateOrganisation />} />
      <Route path="/organisations/:id" element={<ViewOrganisation />} />
      <Route path="/organisations/:id/edit" element={<UpdateOrganisation />} />

      {/* Activity Routes */}
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/new" element={<CreateActivity />} />
      <Route path="/activities/:id" element={<ViewActivity />} />
      <Route path="/activities/:id/edit" element={<UpdateActivity />} />

      {/* 404 */}
      <Route path="*" element={error404} />
    </Routes>
  );
};

export default AuthenticatedApp;
