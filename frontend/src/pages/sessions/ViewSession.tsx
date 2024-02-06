import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sessionApi from "../../api/sessions/sessions";
import { SessionData } from "../../types/sessions/sessions";
import { Error404 } from "../routing/VolunteerApp";
import Spinner from "../../components/loading/Spinner";
import ActivityMiniViewCard from "../activities/ActivityMiniViewCard";
import ViewSessionActionButton from "./ViewSessionActionButtons";
import SessionMiniViewCard from "./minicard/SessionMiniViewCard";
import Tabs from "../../components/dataDisplay/Tabs";
import SessionRegistrations from "./SessionRegistrations";
import EnrollmentFormTable from "../activities/EnrollmentFormTable";
import FeedbackTable from "../activities/FeedbackTable";

const ViewSession: React.FC = () => {
  const { id } = useParams();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      sessionApi
        .getSession(parseInt(id))
        .then((session) => setSession(session))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (!id) return Error404;
  if (isLoading) return <Spinner />;
  if (!session) return Error404;

  const registrationPage = {
    id: "registrations",
    tabTitle: "Manage Registrations and Attendance",
    page: (
      <SessionRegistrations
        session={session}
        registrations={session.registrations}
      />
    ),
  };

  const enrollmentFormPage = {
    id: "enrollment",
    tabTitle: "Enrollment Form Submissions",
    page: (
      <EnrollmentFormTable
        activity={session.activity}
        submissions={session.registrations
          .map((registration) => registration.submission)
          .filter((submission) => submission !== undefined)
          // this nonsense is to fix the type
          .map((submission) => submission!)}
      />
    ),
  };

  const feedbackPage = {
    id: "feedback",
    tabTitle: "Session Feedback and Reflections",
    page: <FeedbackTable registrations={session.registrations} />,
  };

  return (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <ViewSessionActionButton activityId={session.activity.id} />
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <ActivityMiniViewCard activity={session.activity} />
        </div>
        <div className="col-span-1">
          <SessionMiniViewCard session={session} />
        </div>
      </div>
      <Tabs
        tabs={[registrationPage, enrollmentFormPage, feedbackPage]}
        defaultTabId="registrations"
        mt={8}
      />
    </div>
  );
};

export default ViewSession;
