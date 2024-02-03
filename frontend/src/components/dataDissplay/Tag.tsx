interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }: TagProps ) => {
  return (
    <div className="flex flex-col">
      <span className="py-1.5 px-1.5 text-xs rounded-md inline-block whitespace-nowrap text-center bg-slate-200 text-slate-600 align-baseline font-semibold uppercase leading-none">
        {text}
      </span>
    </div>
  );
};

export default Tag;
