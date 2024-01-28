import React from "react";
import Label from "../../components/forms/Label";
import Input from "../../components/forms/Input";
import Button from "../../components/buttons/Button";
import Container from "../../components/containers/Container";
import Footer from "../../components/forms/Footer";

const LogInForm: React.FC = () => {
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
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input name="username" autoComplete="username" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
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
