import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import {
  Organisation,
  OrganisationsPostData,
} from "../../types/organisations/organisations";
import OrganisationForm from "./OrganisationForm";
import { useNavigate, useParams } from "react-router-dom";

const UpdateOrganisation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState<Organisation | null>(null);

  useEffect(() => {
    organisationsAPI
      .getOrganisation(Number(id))
      .then((organisation) => setOrganisation(organisation))
      .catch(() => navigate("/organisations"));
  }, [id, navigate]);

  return (
    organisation && (
      <OrganisationForm
        label="Update Organisation"
        initialData={organisation!}
        handleValues={(values) =>
          organisationsAPI.updateOrganisation(
            Number(id),
            values as OrganisationsPostData
          )
        }
        handleCancel={() => navigate(`/organisations/${id}`)}
      />
    )
  );
};

export default UpdateOrganisation;
