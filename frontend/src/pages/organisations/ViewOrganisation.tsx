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
import OrganisationVolunteerTab from "./OrganisationVolunteerTab";

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

  if (isLoading) return <Spinner />;
  if (!organisation) return Error404;

  const ActivitiesTab: Tab = {
    id: "Activities",
    tabTitle: "Activities",
    page: <OrganisationActivityTab activities={organisation.activities} />,
  };

  const VolunteersTab: Tab = {
    id: "Volunteers",
    tabTitle: "Volunteers",
    page: <OrganisationVolunteerTab organisation={organisation} />,
  };

  const tabs = [ActivitiesTab, VolunteersTab];

  return (
    <div className="items-center justify-between p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <ViewOrganisationActionButtons />
      <OrganisationInfo organisation={organisation} />
      <Tabs tabs={tabs} defaultTabId="Activities" mt={8} />
    </div>
  );
};

export default ViewOrganisation;
