interface CircleProps {
  h?: string;
  w?: string;
  bgColor?: string;
  onClick?: () => void;
}

const Circle: React.FC<CircleProps> = ({
  h="h-2",
  w="w-2",
  bgColor="bg-gray-300",
  onClick,
}: CircleProps) => {
  return <span className={`${h} ${w} ${bgColor} rounded-full inline-block`} onClick={onClick} />;
};

export default Circle;
