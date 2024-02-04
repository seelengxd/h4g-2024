import React, { useState } from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import authApi from "../../api/users/auth";
import { Link } from "react-router-dom";

const ForgotPasswordForm: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: object({
      email: string()
        .trim()
        .required("Email cannot be empty.")
        .email("Email is invalid."),
    }),
    onSubmit: async (values) => {
      authApi
        .sendResetEmail(values)
        .then(() => setEmailSent(true))
        .catch(() => setFieldError("email", "Invalid email."));
    },
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
  } = formik;
  return (
    <div className="grid h-screen grid-cols-2">
      <img src="hearthand.png" alt="heart" className="object-cover h-full" />
      <div className="px-32 my-auto sm:mx-16">
        <h1 className="text-6xl font-semibold">Reset Password</h1>
        {emailSent ? (
          <p className="mt-16">
            Check your email for your password reset email.
          </p>
        ) : (
          <>
            <p className="mt-16">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
            <form className="-mb-6 " onSubmit={handleSubmit}>
              <div className="mt-6">
                <FormControl
                  isInvalid={!!touched.email && errors.email !== undefined}
                  errorMessage={errors.email}
                  onBlur={handleBlur}
                >
                  <Input
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </div>
              <div className="flex justify-end">
                <p className="mt-6">
                  Dont have an account?{" "}
                  <Link to="/signup">
                    <span className="underline text-primary-800">Sign up.</span>
                  </Link>
                </p>
              </div>

              <div className="mt-12">
                <Button type="submit" fullWidth>
                  Reset Password
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
