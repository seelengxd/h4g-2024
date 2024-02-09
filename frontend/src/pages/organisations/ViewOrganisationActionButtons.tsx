import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import organisationsAPI from "../../api/organisations/organisations";
import Button from "../../components/buttons/Button";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";

const ViewOrganisationActionButtons: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    organisationsAPI
      .deleteOrganisation(Number(id))
      .then(() => navigate("/organisations"));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to={`/organisations`}
            className="flex items-center text-xl font-bold"
          >
            {/* <Button px={4}> */}
            <ArrowLeftIcon className="w-4 h-4 mr-2 stroke-2" />
            Back to Organisations
            {/* </Button> */}
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
            <Button
              onClick={() => {
                setDialogOpen(true);
              }}
              roundness="md"
              py={1.5}
              bgColor="white"
              textColor="text-primary-700"
              outlined
              outlineColor="border-primary-700"
            >
              <TrashIcon className="w-4 h-4 mr-2 stroke-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        {dialogOpen && (
          <ConfirmationDialog
            message="Are you sure you want to delete this organisation? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewOrganisationActionButtons;
