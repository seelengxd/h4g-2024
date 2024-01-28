import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import OrganisationCard from "./OrganisationCard";
import Spinner from "../../components/loading/Spinner";
import { useEffect, useState } from "react";
import { Organisation } from "../../types/organisations/organisations";
import organisationsAPI from "../../api/organisations/organisations";
import { Link } from "react-router-dom";

const Organisations: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  useEffect(() => {
    organisationsAPI
      .getAllOrganisations()
      .then((organisations) => setOrganisations(organisations))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8 h-screen">
      <div className="w-full">
        <div className="w-full flex flex-initial justify-between items-center">
          <div className="flex items-center mt-4">
            <UserGroupIcon className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-semibold text-gray-800">
              Organisations
            </h1>
          </div>
          <Link to="/organisations/new">
            <Button>
              <PlusIcon className="stroke-2 w-4 h-4 mr-2" /> Create
            </Button>
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-4 mt-12 gap-10">
          {organisations.map((organisation) => (
            <OrganisationCard organisation={organisation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Organisations;
