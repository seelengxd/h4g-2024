import { Organisation } from "../../types/organisations/organisations";

interface Props {
  organisation: Organisation;
}

const OrganisationCard: React.FC<Props> = ({ organisation }) => {
  return (
    <a
      href={"/organisations/" + organisation.id}
      className="flex flex-col items-center align-between bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100"
    >
      <div className="flex flex-col justify-between min-h-36">
        <img
          className="object-cover max-h-56 rounded-t-lg" // h-96" //md:max-w-50% md:h-auto md:rounded-none md:rounded-s-lg"
          src={
            process.env.REACT_APP_BACKEND_URL! + "/" + organisation.image_url
          }
          alt=""
        />
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900">
          {organisation.name}
        </h5>
      </div>
    </a>
  );
};

export default OrganisationCard;
