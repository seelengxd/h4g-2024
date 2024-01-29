import { Route, Routes } from "react-router-dom";
import Organisations from "../organisations/Organisations";
import CreateOrganisation from "../organisations/CreateOrganisation";
import ViewOrganisation from "../organisations/ViewOrganisation";
import UpdateOrganisation from "../organisations/UpdateOrganisation";
import Error from "../error/Error";

const error404 = (
  <Error errorCode={404} desc="Oh no! Are you sure this page exists?" />
);

const error403 = (
  <Error errorCode={403} desc="Ehem! You don't have permission!" />
);

const AuthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/organisations" element={<Organisations/>}/>
      <Route path="/organisations/new" element={<CreateOrganisation />} />
      <Route path="/organisations/:id" element={<ViewOrganisation />} />
      <Route path="/organisations/:id/edit" element={<UpdateOrganisation />} />
      
      //pages yet to implement
      <Route path="/volunteers" element={error404} />
      <Route path="/activities" element={error404} />
      <Route path="/forum" element={error404} />
      
    </Routes>
  );
};

export default AuthenticatedApp;
