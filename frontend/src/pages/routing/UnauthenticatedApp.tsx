import { Route, Routes } from "react-router-dom";
import LogInForm from "../auth/LogInForm";
import SignUpForm from "../auth/SignupForm";

const UnauthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
