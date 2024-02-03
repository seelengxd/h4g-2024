import Tag from "../../components/dataDissplay/Tag";
import { Organisation } from "../../types/organisations/organisations";

interface Props {
  organisation: Organisation;
}

const OrganisationCard: React.FC<Props> = ({ organisation }) => {
  return (
    <a
      href={"/organisations/" + organisation.id}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow align-between md:max-w-xl md:max-h-64 hover:bg-gray-100"
    >
      <div className="flex flex-col justify-between shadow-inner w-full md:max-h-full overflow-hidden">
        <img
          className="object-cover rounded-t-lg shadow-inner"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + organisation.imageUrl}
          alt=""
        />
      </div>

      <div className="flex flex-col shadow-inner justify-between p-4 leading-normal w-full mb">
        <h5 className="font-semibold tracking-tight text-gray-900 text-md pb-1">
          {organisation.name}
        </h5>
        <div className="flex overflow-scroll no-scrollbar gap-2 pb-2">
          {organisation.categories.map((category) => <Tag text={category.name} />)}
        </div>
        <p className="tracking-tight text-gray-500 text-sm line-clamp-2">
          {organisation.description}
        </p>
      </div>
    </a>
  );
};

export default OrganisationCard;
