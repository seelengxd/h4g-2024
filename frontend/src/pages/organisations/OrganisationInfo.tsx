import { LinkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Organisation } from "../../types/organisations/organisations"

interface OrganisationInfoProps {
  organisation: Organisation;
}

const OrganisationInfo: React.FC<OrganisationInfoProps> = ({ organisation }: OrganisationInfoProps) => {

  return (
    <div className="grid grid-cols-3 bg-white p-8 rounded-md shadow">
      <div className="flex flex-col justify-center min-h-36 col-span-1">
        <img
          className="object-contain w-auto h-48 rounded-full" // h-96" //md:max-w-50% md:h-auto md:rounded-none md:rounded-s-lg"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + organisation.imageUrl}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center col-span-2">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          {organisation.name}
        </h2>

        {organisation.websiteUrl && 
          <div className="mb-4 text-sky-700">
            <Link to={organisation.websiteUrl} target="_blank">
              <div className="flex items-center underline">
                <LinkIcon className="w-4 h-4 mr-2 stroke-2" />
                Organisation Website
              </div>
            </Link>
          </div>
        }
        
        <p>{organisation.description}</p>
      </div>
    </div>
  );
};

export default OrganisationInfo;
