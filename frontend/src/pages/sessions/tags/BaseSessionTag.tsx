import Tag, { TagProps } from "../../../components/dataDisplay/Tag";

interface BaseSessionTagProps extends Omit<TagProps, "text"> {
  status: string;
  tagBgColor: string;
  tagTextColor: string;
}

const BaseSessionTag: React.FC<BaseSessionTagProps> = ({ status, tagBgColor, tagTextColor, ...props}: BaseSessionTagProps) => {
  return <Tag text={status} bgColor={tagBgColor} textColor={tagTextColor} {...props} />;
};

export default BaseSessionTag;
