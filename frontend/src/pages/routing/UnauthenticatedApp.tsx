import { Navigate, Route, Routes } from "react-router-dom";
import LogInForm from "../auth/LogInForm";
import SignUpForm from "../auth/SignupForm";
import ForgotPasswordForm from "../auth/ForgotPassword";
import ResetPasswordForm from "../auth/ResetPassword";

const UnauthenticatedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />

      {/* Default pages to sign in form if user not logged in */}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
