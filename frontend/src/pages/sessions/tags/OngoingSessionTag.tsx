import { TagProps } from "../../../components/dataDisplay/Tag";
import BaseSessionTag from "./BaseSessionTag"

const OngoingSessionTag: React.FC<Omit<TagProps, "text">> = ({ ...props }: Omit<TagProps, "text">) => {
  return <BaseSessionTag tagBgColor="bg-green-100" tagTextColor="text-green-700" status="Ongoing" {...props} />;
}

export default OngoingSessionTag;
