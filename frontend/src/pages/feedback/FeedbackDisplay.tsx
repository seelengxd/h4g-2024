import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../../components/containers/Dialog";
import { Feedback } from "../../types/feedback/feedback";
import { number, object, string } from "yup";
import { differenceInMinutes } from "date-fns";
import { useFormik } from "formik";
import feedbackAPI from "../../api/feedback/feedback";
import FormControl from "../../components/forms/FormControl";
import Label from "../../components/forms/Label";
import Button from "../../components/buttons/Button";

interface Props {
  feedback: Feedback;
  isAdmin?: boolean;
}
const FeedbackDisplay: React.FC<Props> = ({ feedback, isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minutes, setMinutes] = useState(feedback.minutesServed % 60);
  const [hours, setHours] = useState(Math.floor(feedback.minutesServed / 60));

  const registration = feedback.registration;
  const formik = useFormik({
    initialValues: {
      userReflection: "",
      actualFeedback: feedback.actualFeedback,
      minutesServed: feedback.registration
        ? differenceInMinutes(
            feedback.registration.session.end,
            feedback.registration.session.start
          )
        : 0,
      status: feedback.status,
    } as Feedback,
    validationSchema: object({
      actualFeedback: string().required("Actual feedback cannot be empty."),
      minutesServed: number()
        .min(0)
        .max(
          registration
            ? differenceInMinutes(
                registration?.session.end,
                registration?.session.start
              )
            : 0,
          registration
            ? `Time served cannot be more than ${Math.floor(
                differenceInMinutes(
                  registration?.session.end,
                  registration?.session.start
                ) / 60
              )}h ${
                differenceInMinutes(
                  registration?.session.end,
                  registration?.session.start
                ) % 60
              }mins for this session.`
            : ""
        ),
    }),
    onSubmit: async (values) => {
      feedbackAPI
        .updateSubmission(feedback.id!, {
          ...values,
          userReflection: feedback.userReflection,
          registrationId: feedback.registration.id,
        })
        .then(() => setIsOpen(false));
    },
    enableReinitialize: true,
  });

  const {
    touched,
    errors,
    values,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = formik;

  return (
    <>
      <EyeIcon className="w-6 h-6 fill-black" onClick={() => setIsOpen(true)} />
      <Modal
        title="Feedback"
        buttonDisplay="Close Feedback"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        hideButton={isAdmin}
      >
        {isAdmin ? (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="whatever">User Reflection</Label>
              <p className="m-0 text-sm">{feedback.userReflection}</p>
            </div>
            <FormControl
              isInvalid={
                !!touched.actualFeedback && errors.actualFeedback !== undefined
              }
              errorMessage={errors.userReflection}
              onBlur={handleBlur}
            >
              <Label htmlFor="description" mb={2}>
                Actual Feedback
              </Label>
              <textarea
                id="actualFeedback"
                name="actualFeedback"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-300 focus:border-gray-300"
                placeholder="Write your feedback here"
                value={values.actualFeedback}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl
              isInvalid={
                !!touched.minutesServed && errors.minutesServed !== undefined
              }
              errorMessage={errors.minutesServed}
              onBlur={handleBlur}
            >
              <Label htmlFor="actualFeedback" mb={2}>
                Time Served
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-20"
                  min="0"
                  value={hours}
                  onChange={(e) => {
                    setHours(parseInt(e.currentTarget.value));
                    setFieldValue(
                      "minutesServed",
                      minutes + 60 * parseInt(e.currentTarget.value)
                    );
                  }}
                />
                <span className="inline-block align-text-bottom">h</span>
                <input
                  type="number"
                  className="w-20"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => {
                    setMinutes(parseInt(e.currentTarget.value));
                    setFieldValue(
                      "minutesServed",
                      parseInt(e.currentTarget.value) + 60 * hours
                    );
                  }}
                />
                <span className="align-middle">mins</span>
              </div>
            </FormControl>
            <FormControl
              isInvalid={!!touched.status && errors.status !== undefined}
              errorMessage={errors.status}
              onBlur={handleBlur}
            >
              <Label htmlFor="actualFeedback" mb={2}>
                Status
              </Label>
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className={
                      "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700" +
                      (values.status === "Pending" ? " text-primary-700 " : "")
                    }
                    onClick={() => setFieldValue("status", "Pending")}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    className={
                      "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700" +
                      (values.status === "Accepted" ? " text-primary-700" : "")
                    }
                    onClick={() => setFieldValue("status", "Accepted")}
                  >
                    Accepted
                  </button>
                  <button
                    type="button"
                    className={
                      "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700" +
                      (values.status === "Rejected" ? " text-primary-700" : "")
                    }
                    onClick={() => setFieldValue("status", "Rejected")}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            </FormControl>
            <Button type="submit">Save Changes</Button>
          </form>
        ) : (
          <>
            <p className="mt-4">User Reflection</p>
            {feedback.userReflection}
            <p className="mt-2">Feedback</p>
            {feedback.actualFeedback}
            <p className="mt-2">Time Served</p>
            {hours} h {minutes} minutes
          </>
        )}
      </Modal>
    </>
  );
};

export default FeedbackDisplay;
