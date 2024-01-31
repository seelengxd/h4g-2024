interface Props {
  label: string;
}

const Tooltip: React.FC<Props> = ({ label }) => {
  return (
    <div
      id="tooltip-light"
      role="tooltip"
      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg opacity-0 shadow-sm tooltip"
    >
      {label}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};

export default Tooltip;
