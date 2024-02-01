import React from "react";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControl from "../../components/forms/FormControl";
import authApi from "../../api/users/auth";
import { useAppDispatch } from "../../reducers/hooks";
import { setUser } from "../../reducers/authSlice";
import { Link } from "react-router-dom";

const LogInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: object({
      email: string()
        .trim()
        .required("Email cannot be empty.")
        .email("Email is invalid."),
      password: string().trim().required("Password cannot be empty."),
    }),
    onSubmit: async (values) => {
      authApi
        .logIn(values)
        .then((user) => dispatch(setUser(user)))
        .catch(() => setFieldError("password", "Invalid email or password."));
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
        <h1 className="text-6xl font-semibold">Login</h1>
        <p className="mt-6">
          Dont have an account?{" "}
          <Link to="/signup">
            <span className="underline text-primary-800">Sign up.</span>
          </Link>
        </p>
        <form className="mt-8 -mb-6" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div className="flex justify-end mt-2">
            <Link to="#">
              <span className="text-sm text-primary-800">Forgot password?</span>
            </Link>
          </div>

          <div className="mt-12">
            <Button type="submit" fullWidth>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
