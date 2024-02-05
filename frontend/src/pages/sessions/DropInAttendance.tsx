import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import sessionApi from "../../api/sessions/sessions";
import Spinner from "../../components/loading/Spinner";
import { SessionData } from "../../types/sessions/sessions";
import { UserRegistration } from "../../types/registrations/registrations";
import { Error404 } from "../routing/VolunteerApp";
import Tabs from "../../components/dataDisplay/Tabs";
import DropInAttendanceQrScanner from "./DropInAttendanceQrScanner";
import DropInAttendanceSelect from "./DropInAttendanceSelect";
import registrationsAPI from "../../api/registrations/registrations";

const DropInAttendance: React.FC = () => {
  const { id } = useParams();
  const [session, setSession] = useState<SessionData | null>(null);
  const [registrations, setRegistrations] = useState<UserRegistration[] | null>(
    null
  );
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleMarkAttended = (registeration: UserRegistration) =>
    registrationsAPI.markAttended(registeration).then(setRegistrations);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      sessionApi
        .getSession(parseInt(id))
        .then((session) => {
          setSession(session);
          setRegistrations(session.registrations);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (!id) return Error404;
  if (isLoading) return <Spinner />;
  if (!registrations || !session) return Error404;

  const qrTab = {
    id: "qr",
    tabTitle: "QR Scanner",
    page: (
      <DropInAttendanceQrScanner
        activity={session.activity}
        session={session}
        registrations={registrations}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        handleMarkAttendance={handleMarkAttended}
      />
    ),
  };

  const manualInput = {
    id: "manual",
    tabTitle: "Manual Input",
    page: (
      <DropInAttendanceSelect
        registrations={registrations}
        selectedUserId={selectedUserId}
        onSelectedUserChange={(newId) => setSelectedUserId(newId)}
      />
    ),
  };

  return (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <Tabs tabs={[qrTab, manualInput]} defaultTabId="qr" />
    </div>
  );
};

export default DropInAttendance;
