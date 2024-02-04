import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import { ActivityData } from "../../types/activities/activities";
import Spinner from "../../components/loading/Spinner";
import {
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

import { format } from "date-fns";
import FormMultiSelectInput from "../../components/forms/FormMultiSelectInput";
import Button from "../../components/buttons/Button";
import { useFormik } from "formik";
import { array, object } from "yup";
import { RegistrationPostData } from "../../types/registrations/registrations";
import registrationsAPI from "../../api/registrations/registrations";
import FormControl from "../../components/forms/FormControl";

const VolunteerEnroll: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityData | null>(null);
  useEffect(() => {
    activitiesAPI
      .getActivity(parseInt(id!))
      .then((activity) => setActivity(activity));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      sessionIds: [],
    } as RegistrationPostData,
    validationSchema: object({
      sessionIds: array()
        .required()
        .min(1, "You must pick at least one session."),
    }),
    onSubmit: async (values) => {
      registrationsAPI
        .createRegistration(values)
        .finally(() => navigate("/activities/" + activity?.id.toString()));
    },
  });

  const {
    touched,
    errors,
    values,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = formik;

  console.log({ errors, ids: values.sessionIds });

  return activity ? (
    <div className="items-center justify-between max-h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="p-4">
        {location.state?.prevRoute === "/events" && (
          <Link
            to="/events"
            className="flex items-center mb-12 text-xl font-bold"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
            Back to events
          </Link>
        )}
        {location.state?.prevRoute &&
          /\/activities\/\d+/.test(location.state.prevRoute) && (
            <Link
              to={location.state.prevRoute}
              className="flex items-center mb-12 text-xl font-bold"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to event page
            </Link>
          )}
      </div>
      <div className="grid grid-cols-3 gap-24">
        <div className="flex flex-col p-4 leading-normal">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            {activity.name}
          </h2>
          <p>
            by{" "}
            <Link
              to={"/organisations" + activity.organisationId.toString()}
              className="hover:underline"
            >
              {activity.organisation.name}
            </Link>
          </p>
          <p className="flex items-center mt-2 text-md">
            <MapPinIcon className="w-4 h-4 mr-2" />
            {activity.location}
          </p>
          {!!activity.sessions.length && (
            <p className="flex items-center mt-2 text-md">
              <ClockIcon className="w-4 h-4 mr-2" />
              <p>
                {format(
                  new Date(activity.sessions[0]!.start),
                  "EEEE d MMMM, hh:mma-"
                )}
                {new Date(activity.sessions[0]!.start).getDay() ===
                new Date(activity.sessions[0]!.end).getDay()
                  ? format(new Date(activity.sessions[0]!.end), "hh:mma")
                  : format(
                      new Date(activity.sessions[0]!.end),
                      " d MMM, hh:mma"
                    )}
              </p>
            </p>
          )}
        </div>
        <div className="flex flex-col h-[calc(100vh-80px)] max-h-full gap-8 overflow-y-scroll col-span-2 pl-2">
          <p className="text-4xl">Indicate Availability</p>
          <p>Select the session that you would like to attend.</p>
          <form
            className="flex flex-col justify-between h-[calc(100vh-450px)]"
            onSubmit={handleSubmit}
          >
            <FormControl
              isInvalid={
                !!touched.sessionIds && errors.sessionIds !== undefined
              }
              errorMessage={errors.sessionIds as string}
              onBlur={handleBlur}
            >
              <FormMultiSelectInput
                name="sessionIds"
                value={values.sessionIds}
                options={activity.sessions.map((session) => ({
                  id: session.id,
                  value:
                    format(
                      new Date(activity.sessions[0]!.start),
                      "EEEE d MMMM, hh:mma-"
                    ) +
                    (new Date(activity.sessions[0]!.start).getDay() ===
                    new Date(activity.sessions[0]!.end).getDay()
                      ? format(new Date(activity.sessions[0]!.end), "hh:mma")
                      : format(
                          new Date(activity.sessions[0]!.end),
                          "EEEE d MMM, hh:mma"
                        )),
                }))}
                onChange={(values) => {
                  setFieldValue("sessionIds", values);
                }}
              />
            </FormControl>

            <Button type="submit" disabled={!!errors.sessionIds}>
              Enroll in Event
            </Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default VolunteerEnroll;
