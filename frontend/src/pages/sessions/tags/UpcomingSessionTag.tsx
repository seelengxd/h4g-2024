import { TagProps } from "../../../components/dataDisplay/Tag";
import BaseSessionTag from "./BaseSessionTag"

const UpcomingSessionTag: React.FC<Omit<TagProps, "text">> = ({ ...props }: Omit<TagProps, "text">) => {
  return <BaseSessionTag tagBgColor="bg-blue-100" tagTextColor="text-blue-700" status="Upcoming" {...props} />;
}

export default UpcomingSessionTag;
