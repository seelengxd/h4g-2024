import { useNavigate } from "react-router-dom";
import organisationsAPI from "../../api/organisations/organisations";
import { OrganisationsPostData } from "../../types/organisations/organisations";
import OrganisationForm from "./OrganisationForm";

const CreateOrganisation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <OrganisationForm
      label="Create Organisation"
      handleValues={(values) =>
        organisationsAPI.createOrganisation(
          values as OrganisationsPostData
        )
      }
      handleCancel={() => navigate('/organisations')}
    />
  );
};

export default CreateOrganisation;
