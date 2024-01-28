import organisationsAPI from "../../api/organisations/organisations";
import { OrganisationsPostData } from "../../types/organisations/organisations";
import OrganisationForm from "./OrganisationForm";

const CreateOrganisation: React.FC = () => {
  return (
    <OrganisationForm
      label="Create Organisation"
      handleValues={(values) =>
        organisationsAPI.createOrganisation(
          values as OrganisationsPostData
        ) as unknown as Promise<void>
      }
    />
  );
};

export default CreateOrganisation;
