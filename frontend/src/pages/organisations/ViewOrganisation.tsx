import { useParams } from "react-router-dom";
import { Organisation } from "../../types/organisations/organisations";
import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import Spinner from "../../components/loading/Spinner";
import OrganisationInfo from "./OrganisationInfo";
import ViewOrganisationActionButtons from "./ViewOrganisationActionButtons";
import Tabs, { Tab } from "../../components/dataDisplay/Tabs";
import OrganisationActivityTab from "./OrganisationActivityTab";
import { Error404 } from "../routing/VolunteerApp";

const ViewOrganisation: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [organisation, setOrganisation] = useState<Organisation | null>(null);

  useEffect(() => {
    setIsLoading(true);
    organisationsAPI
      .getOrganisation(Number(id))
      .then((organisation) => setOrganisation(organisation))
      .finally(() => setIsLoading(false));
  }, [id]);

  if(isLoading) return <Spinner />;
  if (!organisation) return Error404;

  const ActivitiesTab: Tab = {
    id: "Activities",
    tabTitle: "Activities",
    page: <OrganisationActivityTab organisation={organisation} />
  };

  const VolunteersTab: Tab = {
    id: "Volunteers",
    tabTitle: "Volunteers",
    page: <h1>VOLUNTEERS</h1>
  };

  const tabs = [ActivitiesTab, VolunteersTab];

  return (
    <div className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8 mt-4">
      <ViewOrganisationActionButtons />
      <OrganisationInfo organisation={organisation} />
      <Tabs tabs={tabs} defaultTabId="Activities" mt={8} />
    </div>
  );
};

export default ViewOrganisation;
