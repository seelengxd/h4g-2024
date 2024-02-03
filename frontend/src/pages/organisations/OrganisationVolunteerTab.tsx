import { Organisation } from "../../types/organisations/organisations";

interface OrganisationVolunteerTabProps {
  organisation: Organisation;
}

const OrganisationVolunteerTab: React.FC<OrganisationVolunteerTabProps> = ({ organisation }: OrganisationVolunteerTabProps) => {
  return (
  <div className="mt-6 mb-12 text-center">
    <h2 className="text-gray-400 text-4xl mt-16">Coming soon... (or never)</h2>
  </div>
 );
};

export default OrganisationVolunteerTab;
