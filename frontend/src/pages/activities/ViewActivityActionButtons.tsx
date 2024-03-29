import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import Button from "../../components/buttons/Button";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";

const ViewActivityActionButtons: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    activitiesAPI
      .deleteActivity(parseInt(id!))
      .then(() => navigate("/activities"));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex justify-between w-full">
          {location.state?.prevRoute.startsWith("/organisation") && (
            <Link
              to={location.state.prevRoute}
              className="flex items-center text-xl font-bold"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Organisation
            </Link>
          )}
          {!location.state?.prevRoute.startsWith("/organisation") && (
            <Link
              to={"/activities"}
              className="flex items-center text-xl font-bold"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
              Back to Activities
            </Link>
          )}

          <div className="flex gap-6">
            <div>
              <Link to={`/activities/${id}/edit`}>
                <Button roundness="md" py={2} px={3}>
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
                px={3}
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
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        {dialogOpen && (
          <ConfirmationDialog
            message="Are you sure you want to delete this activity? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewActivityActionButtons;
