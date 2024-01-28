interface Props {
  id: number;
}

const OrganisationCard: React.FC<Props> = ({ id }) => {
  return (
    <a
      href={"/organisations/" + id}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100"
    >
      <div className="flex flex-col justify-center min-h-36">
        <img
          className="object-cover w-full rounded-t-lg" // h-96" //md:max-w-50% md:h-auto md:rounded-none md:rounded-s-lg"
          src="https://www.cslmch.org.sg//image/catalog/slicings/Header/Logo.png"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900">
          Chen Su Lan Methodist Children's Home
        </h5>
      </div>
    </a>
  );
};

export default OrganisationCard;
