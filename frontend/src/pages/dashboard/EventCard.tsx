import { Registration } from "../../types/registrations/registrations";
import { format } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ClockTwoIcon, LocationPinIcon } from "../../components/icons/icons";

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
            <Link
              to={"/activities/" + registration.session.activity.id}
              className="hover:text-primary-800 hover:underline"
              state={{ prevRoute: "/" }}
            >
              {registration.session.activity.name}
            </Link>
          </p>
          <p className="mt-1 text-sm">
            {registration.session.activity.organisation.name}
          </p>
          {!hideLocation && (
            <p className="flex items-center">
              <LocationPinIcon className="w-4 h-4 mr-2 shrink-0" />{" "}
              {registration.session.activity.location}
            </p>
          )}
          <p className="flex items-center">
            <ClockTwoIcon className="w-4 h-4 mr-2 shrink-0" />
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
