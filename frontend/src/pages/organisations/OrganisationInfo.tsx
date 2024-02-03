import { LinkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Organisation } from "../../types/organisations/organisations"
import Tag from "../../components/dataDisplay/Tag";

interface OrganisationInfoProps {
  organisation: Organisation;
}

const OrganisationInfo: React.FC<OrganisationInfoProps> = ({ organisation }: OrganisationInfoProps) => {

  return (
    <div className="grid grid-cols-3 bg-white p-8 rounded-md shadow">
      {/* Organisation Image */}
      <div className="flex flex-col justify-center min-h-36 col-span-1 pr-8">
        <img
          className="object-contain w-auto h-48"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + organisation.imageUrl}
          alt=""
        />
      </div>

      {/* Organisation Details */}
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
      
        <div className="flex overflow-scroll no-scrollbar gap-2 pb-2 mt-4">
          {organisation.categories.map((category) => <Tag text={category.name} textSize="text-sm" />)}
        </div>
      </div>
    </div>
  );
};

export default OrganisationInfo;
