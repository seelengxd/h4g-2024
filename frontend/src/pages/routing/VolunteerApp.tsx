import { Route, Routes } from "react-router-dom";
import Organisations from "../organisations/Organisations";
import CreateOrganisation from "../organisations/CreateOrganisation";
import ViewOrganisation from "../organisations/ViewOrganisation";
import UpdateOrganisation from "../organisations/UpdateOrganisation";
import Error from "../error/Error";
import ViewEnrollmentForm from "../activities/ViewEnrollmentForm";
import VolunteerDashboard from "../dashboard/VolunteerDashboard";
import VolunteeringOpportunities from "../activities/VolunteeringOpportunities";
import VolunteerActivity from "../activities/VolunteerActivity";
import VolunteerEnroll from "../activities/VolunteerEnroll";

export const Error404 = (
  <Error errorCode={404} desc="Oh no! Are you sure this page exists?" />
);

const Error403 = (
  <Error errorCode={403} desc="Ehem! You don't have permission!" />
);

const VolunteerApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<VolunteerDashboard />} />

      {/* Organisation Routes */}
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/organisations/new" element={<CreateOrganisation />} />
      <Route path="/organisations/:id" element={<ViewOrganisation />} />
      <Route path="/organisations/:id/edit" element={<UpdateOrganisation />} />

      {/* Activity Routes */}
      <Route path="/events" element={<VolunteeringOpportunities />} />
      <Route path="/activities/:id" element={<VolunteerActivity />} />
      <Route path="/activities/:id/enroll" element={<VolunteerEnroll />} />

      {/* Enrollment forms*/}
      <Route
        path="/activities/:id/enrollment-forms/:id"
        element={<ViewEnrollmentForm />}
      />

      {/* 404 */}
      <Route path="*" element={Error404} />
    </Routes>
  );
};

export default VolunteerApp;
