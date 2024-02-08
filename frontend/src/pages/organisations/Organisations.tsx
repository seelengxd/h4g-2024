import { PlusIcon } from "@heroicons/react/24/outline";
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
    <div className="items-center justify-between w-full h-screen p-6 mx-auto mt-8 max-w-7xl lg:px-8">
      <div className="w-full">
        <div className="items-center justify-between flex-initial w-full sm:flex">
          <div className="flex items-center mt-4">
            <h1 className="text-3xl text-gray-800">Organisations</h1>
          </div>

          <div className="hidden sm:block">
            <Link to="/organisations/new">
              <Button>
                <PlusIcon className="w-4 h-4 mr-2 stroke-2" /> Create
                Organisation
              </Button>
            </Link>
          </div>
          <div className="sm:hidden">
            <Link to="/organisations/new">
              <button
                type="button"
                className="absolute right-4 bottom-8 text-white bg-primary-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
              >
                <PlusIcon className="w-8 h-8 stroke-2" />
                <span className="sr-only">Create Organisation</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-10 mt-12 sm:grid-cols-2 xl:grid-cols-4">
          {organisations.map((organisation) => (
            <OrganisationCard organisation={organisation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Organisations;
