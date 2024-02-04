import React, { useState } from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import authApi from "../../api/users/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPasswordForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  if (!token) {
    navigate("/");
  }

  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: object({
      password: string()
        .trim()
        .required("Password cannot be empty.")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: string().test({
        name: "samePassword",
        message: "Password does not match.",
        test: function (value) {
          return value === this.parent.password;
        },
      }),
    }),
    onSubmit: async (values) => {
      authApi
        .resetPassword({ password: values.password }, token!)
        .then(() => setSubmitted(true))
        .catch(() => setFieldError("password", "Invalid token?"));
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
        {submitted ? (
          <>
            <p className="mt-16">
              Your password has been reset!{" "}
              <Link to="/" className="underline text-primary-800">
                Return to login.
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="mt-16">Enter your new password for your account.</p>
            <form className="-mb-6 " onSubmit={handleSubmit}>
              <div className="mt-6">
                <FormControl
                  isInvalid={
                    !!touched.password && errors.password !== undefined
                  }
                  errorMessage={errors.password}
                  onBlur={handleBlur}
                >
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </div>
              <div className="mt-6">
                <FormControl
                  isInvalid={
                    !!touched.confirmPassword &&
                    errors.confirmPassword !== undefined
                  }
                  errorMessage={errors.confirmPassword}
                  onBlur={handleBlur}
                >
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
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

export default ResetPasswordForm;
