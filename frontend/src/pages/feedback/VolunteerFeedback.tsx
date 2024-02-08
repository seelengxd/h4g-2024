import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

import { format, isSameDay } from "date-fns";

import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Registration } from "../../types/registrations/registrations";
import FormControl from "../../components/forms/FormControl";

import { Error404 } from "../routing/VolunteerApp";
import registrationsAPI from "../../api/registrations/registrations";
import { Feedback } from "../../types/feedback/feedback";

import Label from "../../components/forms/Label";
import feedbackAPI from "../../api/feedback/feedback";
import { ClockTwoIcon, LocationPinIcon } from "../../components/icons/icons";

const VolunteerFeedback: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      registrationsAPI
        .getRegistration(parseInt(id))
        .then((registration) => {
          console.log({ registration });
          if (registration.feedback) {
            navigate("/your-activities");
          }
          setRegistration(registration);
        })

        .then(() => setIsLoading(false));
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      userReflection: "",
    } as Feedback,
    validationSchema: object({
      userReflection: string().required("User reflection cannot be empty."),
    }),
    onSubmit: async (values) => {
      feedbackAPI
        .createSubmission({
          ...values,
          registrationId: parseInt(id!),
          minutesServed: 0,
          actualFeedback: "",
        })
        .then(() => navigate("/your-activities"));
    },
    enableReinitialize: true,
  });

  const { touched, errors, values, handleBlur, handleSubmit, handleChange } =
    formik;

  if (!id) return Error404;
  if (isLoading) return <Spinner />;
  if (!registration) return Error404;

  const session = registration.session;

  return registration ? (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="p-4">
        <Link
          to={"/your-activities"}
          className="flex items-center mb-12 text-xl font-bold"
        >
          <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
          Back to Your Activities
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-24">
        <div className="flex flex-col p-4 leading-normal">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            {session.activity.name}
          </h2>
          <p>
            by{" "}
            <Link
              to={
                "/organisations" +
                registration.session.activity.organisationId.toString()
              }
              className="hover:underline"
            >
              {session.activity.organisation.name}
            </Link>
          </p>
          <p className="flex items-center mt-2 text-md">
            <LocationPinIcon className="w-4 h-4 mr-2" />
            {session.activity.location}
          </p>

          <p className="flex items-center mt-2 text-md">
            <ClockTwoIcon className="w-4 h-4 mr-2" />
            <p>
              {format(new Date(session.start), "EEEE d MMMM, hh:mma-")}
              {isSameDay(new Date(session.start), new Date(session.end))
                ? format(new Date(session.end), "hh:mma")
                : format(new Date(session.end), " d MMM, hh:mma")}
            </p>
          </p>
        </div>
        <div className="flex flex-col h-[calc(100vh-80px)] max-h-full gap-8 overflow-y-scroll col-span-2 pl-2">
          <p className="text-4xl">Reflection</p>
          <p>Give your reflection for this session!</p>

          <form
            className="flex flex-col justify-between h-[calc(100vh-450px)]"
            onSubmit={handleSubmit}
          >
            <FormControl
              isInvalid={
                !!touched.userReflection && errors.userReflection !== undefined
              }
              errorMessage={errors.userReflection}
              onBlur={handleBlur}
            >
              <Label htmlFor="userReflection" mb={2}>
                Reflection
              </Label>
              <textarea
                id="userReflection"
                name="userReflection"
                rows={16}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-300 focus:border-gray-300"
                placeholder="Write your reflection here"
                value={values.userReflection}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* scuffed spacer */}
            <div className="mt-2"></div>

            <Button type="submit">Submit Feedback</Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default VolunteerFeedback;
