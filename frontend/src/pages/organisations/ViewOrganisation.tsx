import { Link, useParams } from "react-router-dom";
import { Organisation } from "../../types/organisations/organisations";
import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import Spinner from "../../components/loading/Spinner";
import Button from "../../components/buttons/Button";
import { LinkIcon } from "@heroicons/react/24/outline";

const ViewOrganisation: React.FC = () => {
  const { id } = useParams();
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  useEffect(() => {
    organisationsAPI
      .getOrganisation(Number(id))
      .then((organisation) => setOrganisation(organisation));
  }, [id]);
  return organisation ? (
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="flex flex-col justify-center min-h-36 mt-12">
        <img
          className="object-contain h-48 sm:h-96 w-auto rounded-t-lg" // h-96" //md:max-w-50% md:h-auto md:rounded-none md:rounded-s-lg"
          src={
            process.env.REACT_APP_BACKEND_URL! + "/" + organisation.image_url
          }
          alt=""
        />
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
          {organisation.name}
        </h2>
        <p>{organisation.description}</p>
        {organisation.website_url && (
          <Link to={organisation.website_url}>
            <Button>
              <LinkIcon className="stroke-2 w-4 h-4 mr-2" />
              Link to website
            </Button>
          </Link>
        )}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewOrganisation;
