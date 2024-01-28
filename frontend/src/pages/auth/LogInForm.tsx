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
import { useAppDispatch } from "../../reducers/hooks";
import { setUser } from "../../reducers/authSlice";

const LogInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: object({
      username: string().trim().required("Username cannot be empty."),
      password: string().trim().required("Password cannot be empty."),
    }),
    onSubmit: async (values) => {
      authApi.logIn(values).then((user) => dispatch(setUser(user)));
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
          Sign in to your account
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
            isInvalid={!!touched.password && errors.password !== undefined}
            errorMessage={errors.password}
            onBlur={handleBlur}
          >
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <div>
            <Button type="submit">Sign in</Button>
          </div>
        </form>
        <Footer
          question={"Not a member?"}
          href="/signup"
          linkText="Create a new account."
        />
      </div>
    </Container>
  );
};

export default LogInForm;
