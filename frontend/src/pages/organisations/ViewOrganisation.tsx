import { Link, useNavigate, useParams } from "react-router-dom";
import { Organisation } from "../../types/organisations/organisations";
import { useEffect, useState } from "react";
import organisationsAPI from "../../api/organisations/organisations";
import Spinner from "../../components/loading/Spinner";
import Button from "../../components/buttons/Button";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";
import OrganisationInfo from "./OrganisationInfo";

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
    <div className="items-center justify-between p-6 mx-auto max-w-7xl lg:px-8 mt-4">
      <div className="flex justify-between mb-8">
        <div>
          <Link to={`/organisations`}>
            <Button px={4}>
              <ArrowLeftIcon className="w-4 h-4 mr-2 stroke-2" />
              Back
            </Button>
          </Link>
        </div>
        <div className="flex gap-6">
          <div>
            <Link to={`/organisations/${id}/edit`}>
              <Button roundness="md" py={2}>
                <PencilIcon className="w-4 h-4 mr-2 stroke-2" />
                Edit
              </Button>
            </Link>
          </div>
          <div>
            <Button onClick={() => { setDialogOpen(true) }} roundness="md" py={2} bgColor="white" textColor="text-primary-700" outlined outlineColor="border-primary-700">
              <TrashIcon className="w-4 h-4 mr-2 stroke-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
      <OrganisationInfo organisation={organisation} />

      <div className="flex flex-col justify-between p-4 leading-normal">
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
