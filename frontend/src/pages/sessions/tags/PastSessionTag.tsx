import { TagProps } from "../../../components/dataDisplay/Tag";
import BaseSessionTag from "./BaseSessionTag"

const PastSessionTag: React.FC<Omit<TagProps, "text">> = ({ ...props }: Omit<TagProps, "text">) => {
  return <BaseSessionTag tagBgColor="bg-gray-100" tagTextColor="text-gray-600" status="Past" {...props} />;
}

export default PastSessionTag;
