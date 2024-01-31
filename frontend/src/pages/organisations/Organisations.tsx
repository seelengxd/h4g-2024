import {
  BuildingOfficeIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
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
    <div className="items-center justify-between h-screen p-6 mx-auto max-w-7xl lg:px-8">
      <div className="w-full">
        <div className="items-center justify-between flex-initial w-full sm:flex">
          <div className="flex items-center mt-4">
            <BuildingOfficeIcon className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-semibold text-gray-800">
              Organisations
            </h1>
          </div>
          <div className="hidden sm:block">
            <Link to="/organisations/new">
              <Button>
                <PlusIcon className="w-4 h-4 mr-2 stroke-2" /> Create
              </Button>
            </Link>
          </div>
          <div className="sm:hidden">
            <Link to="/organisations/new">
              <button
                type="button"
                className="absolute right-4 bottom-8 text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
              >
                <PlusIcon className="w-8 h-8 stroke-2" />
                <span className="sr-only">Create</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-12 grid md:grid-cols-4 gap-10">
          {organisations.map((organisation) => (
            <OrganisationCard organisation={organisation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Organisations;
