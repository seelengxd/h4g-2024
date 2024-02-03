interface TagProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  textSize?: string;
  textCasing?: string;
  fontWeight?: string;
  px?: string;
  py?: string;

}

const Tag: React.FC<TagProps> = ({
  text,
  bgColor = 'bg-slate-200',
  textColor = 'text-slate-600',
  textSize = 'text-xs',
  textCasing = 'uppercase',
  fontWeight = 'font-semibold',
  px = 'px-1.5',
  py = 'py-1.5',
}: TagProps ) => {
  return (
    <div className="flex flex-col">
      <span className={`${px} ${py} ${textSize} rounded-md inline-block whitespace-nowrap text-center ${bgColor} ${textColor} align-baseline ${fontWeight} ${textCasing} leading-none`}>
        {text}
      </span>
    </div>
  );
};

export default Tag;
