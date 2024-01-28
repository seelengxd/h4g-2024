import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Button from "../../components/buttons/Button";
import OrganisationCard from "./OrganisationCard";

const Organisations: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="w-full">
        <div className="w-full flex flex-initial justify-between items-center">
          <div className="flex items-center mt-4">
            <UserGroupIcon className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-semibold text-gray-800">
              Organisations
            </h1>
          </div>
          <Button>
            <PlusIcon className="stroke-2 w-4 h-4 mr-2" /> Create
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 mt-12 gap-10">
        <OrganisationCard id={1} />
        <OrganisationCard id={2} />
        <OrganisationCard id={3} />
        <OrganisationCard id={4} />
        <OrganisationCard id={5} />
        <OrganisationCard id={6} />
        <OrganisationCard id={7} />
        <OrganisationCard id={8} />
      </div>
    </div>
  );
};

export default Organisations;
