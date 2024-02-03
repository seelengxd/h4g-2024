import Tag from "../../components/dataDisplay/Tag";
import { Organisation } from "../../types/organisations/organisations";

interface Props {
  organisation: Organisation;
}

const OrganisationCard: React.FC<Props> = ({ organisation }) => {
  return (
    <a
      href={"/organisations/" + organisation.id}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow align-between xs:w-full xs:h-xl md:w-xl md:h-90 hover:bg-gray-100"
    >
      <div className="flex flex-col justify-between shadow-inner w-full overflow-hidden max-h-36">
        <img
          className="object-cover rounded-t-lg shadow-inner"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + organisation.imageUrl}
          alt=""
        />
      </div>

      <div className="shadow-inner justify-between p-4 pb-8 leading-normal w-full mb h-42 gap-1">
        <div className="flex">
        <h5 className="font-semibold tracking-tight text-gray-900 text-md pb-1">
          {organisation.name}
        </h5>
        </div>
        <div className="flex overflow-scroll no-scrollbar gap-2 pb-2">
          {organisation.categories.map((category) => <Tag text={category.name} />)}
        </div>
        <div className="gap">
        <p className="tracking-tight text-gray-500 text-sm line-clamp-2">
          {organisation.description}
        </p>
        </div>
      </div>
    </a>
  );
};

export default OrganisationCard;
