import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Button from "../../components/buttons/Button";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";
import sessionApi from "../../api/sessions/sessions";

interface ViewSessionActionButtonProps {
  activityId: number;
}

const ViewSessionActionButton: React.FC<ViewSessionActionButtonProps> = ({
  activityId,
}: ViewSessionActionButtonProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    sessionApi
      .deleteSession(parseInt(id!))
      .then(() => navigate(`/activities/${activityId}`));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex justify-between w-full">
          <Link
            to={"/activities/" + activityId}
            className="flex items-center text-xl font-bold"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-1 stroke-2" />
            Back to Activity
          </Link>
        </div>

        <div className="flex gap-6">
          <div>
            <Link to={`/activities/${id}/edit`}>
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

      <div className="flex flex-col justify-between p-4 pt-8 leading-normal">
        {dialogOpen && (
          <ConfirmationDialog
            message="Are you sure you want to delete this session? This action cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewSessionActionButton;
