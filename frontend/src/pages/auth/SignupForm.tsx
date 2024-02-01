import React from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import authApi from "../../api/users/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      preferredName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: object({
      fullName: string().trim().required("Full name cannot be empty."),
      preferredName: string()
        .trim()
        .required("Preferred name cannot be empty."),
      password: string()
        .trim()
        .required("Password cannot be empty.")
        .min(8, "Password must be at least 8 characters long"),
      email: string()
        .trim()
        .required("Email cannot be empty.")
        .email("Please enter a valid email."),
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
        .signUp(values)
        .then(() => navigate("/"))
        .catch((err) =>
          setFieldError("username", "Username is already taken.")
        );
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
        <h1 className="text-6xl font-semibold">Sign Up</h1>
        <p className="mt-6">
          Already have an account?{" "}
          <Link to="/">
            <span className="underline text-primary-800">Login.</span>
          </Link>
        </p>
        <form className="mt-8 -mb-6" onSubmit={handleSubmit}>
          <div className="mt-6">
            <FormControl
              isInvalid={!!touched.fullName && errors.fullName !== undefined}
              errorMessage={errors.fullName}
              onBlur={handleBlur}
            >
              <Input
                label="Full name (as per NRIC)"
                name="fullName"
                autoComplete="fullName"
                value={values.fullName}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div className="mt-6">
            <FormControl
              isInvalid={
                !!touched.preferredName && errors.preferredName !== undefined
              }
              errorMessage={errors.preferredName}
              onBlur={handleBlur}
            >
              <Input
                label="Preferred Name"
                name="preferredName"
                autoComplete="preferredName"
                value={values.preferredName}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
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

          <div className="mt-6">
            <FormControl
              isInvalid={!!touched.password && errors.password !== undefined}
              errorMessage={errors.password}
              onBlur={handleBlur}
            >
              <Input
                label="Password"
                name="password"
                type="password"
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
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>

          <div className="mt-12">
            <Button type="submit" fullWidth>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
