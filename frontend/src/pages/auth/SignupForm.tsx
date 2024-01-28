import React from "react";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import Container from "../../components/containers/Container";
import Footer from "../../components/forms/Footer";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import authApi from "../../api/users/auth";

const SignUpForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: object({
      username: string().trim().required("Username cannot be empty."),
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
      authApi.signUp(values);
    },
  });

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;
  return (
    <Container>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormControl
            isInvalid={!!touched.username && errors.username !== undefined}
            errorMessage={errors.username}
            onBlur={handleBlur}
          >
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            isInvalid={!!touched.email && errors.email !== undefined}
            errorMessage={errors.email}
            onBlur={handleBlur}
          >
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            isInvalid={!!touched.password && errors.password !== undefined}
            errorMessage={errors.password}
            onBlur={handleBlur}
          >
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            isInvalid={
              !!touched.confirmPassword && errors.confirmPassword !== undefined
            }
            errorMessage={errors.confirmPassword}
            onBlur={handleBlur}
          >
            <Label htmlFor="new-password">Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              value={values.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
          <div>
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
        <Footer
          question={"Already have an account?"}
          href="/"
          linkText="Sign in."
        />
      </div>
    </Container>
  );
};

export default SignUpForm;
