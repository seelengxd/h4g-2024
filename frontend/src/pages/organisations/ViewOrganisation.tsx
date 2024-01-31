import { Link, useNavigate, useParams } from "react-router-dom";
import { Organisation } from "../../types/organisations/organisations";
import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import Spinner from "../../components/loading/Spinner";
import Button from "../../components/buttons/Button";
import { LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";

const ViewOrganisation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  useEffect(() => {
    organisationsAPI
      .getOrganisation(Number(id))
      .then((organisation) => setOrganisation(organisation));
  }, [id]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    organisationsAPI
      .deleteOrganisation(Number(id))
      .then(() => navigate("/organisations"));
  };
  return organisation ? (
    <div className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8">
      <div className="flex flex-col justify-center mt-12 min-h-36">
        <img
          className="object-contain w-auto h-48 rounded-t-lg sm:h-96" // h-96" //md:max-w-50% md:h-auto md:rounded-none md:rounded-s-lg"
          src={process.env.REACT_APP_BACKEND_URL! + "/" + organisation.imageUrl}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h2 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
          {organisation.name}
        </h2>
        <p>{organisation.description}</p>
        {organisation.websiteUrl && (
          <Link to={organisation.websiteUrl}>
            <Button>
              <LinkIcon className="w-4 h-4 mr-2 stroke-2" />
              Link to website
            </Button>
          </Link>
        )}
        <div>
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <TrashIcon className="w-4 h-4 mr-2 stroke-2" />
            Delete
          </Button>
        </div>
        <div>
          <Link to={`/organisations/${id}/edit`}>
            <Button>
              <PencilIcon className="w-4 h-4 mr-2 stroke-2" />
              Edit
            </Button>
          </Link>
        </div>

        {dialogOpen && (
          <ConfirmationDialog
            message="Are you sure you want to delete this organisation? This action cannot be undone."
            onDelete={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ViewOrganisation;
