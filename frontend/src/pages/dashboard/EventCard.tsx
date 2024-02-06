import { ClockIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { Registration } from "../../types/registrations/registrations";
import { format } from "date-fns";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface Props {
  hideLocation?: boolean;
  registration: Registration;
  showFeedback?: boolean;
}
const EventCard: React.FC<Props> = ({
  hideLocation = false,
  registration,
  showFeedback = false,
}) => {
  return (
    <div className="w-full p-4 bg-white border rounded-2xl border-primary-600">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-bold">
            {registration.session.activity.name}
          </p>
          <p className="mt-1 text-sm">
            {registration.session.activity.organisation.name}
          </p>
          {!hideLocation && (
            <p className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2 shrink-0" />{" "}
              {registration.session.activity.location}
            </p>
          )}
          <p className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 shrink-0" />
            {format(registration.session.start, "d MMM yyyy")}
          </p>
        </div>
        {showFeedback && (
          <Link
            className="my-auto"
            to={"/sessions/" + registration.session.id + "/feedback/new"}
          >
            <PencilSquareIcon className="w-10 h-10 fill-black" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
