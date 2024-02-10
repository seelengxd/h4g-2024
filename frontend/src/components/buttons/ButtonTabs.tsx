interface ButtonTabsProps {
  tabNames: string[];
  activeTabIndex: number;
  setTabIndex: (index: number) => void;
}

const ButtonTabs: React.FC<ButtonTabsProps> = ({
  tabNames,
  activeTabIndex,
  setTabIndex,
}: ButtonTabsProps) => {
  return (
    <div className="flex flex-col items-start gap-8 py-20 pl-24">
      {tabNames.map((tab, index) => (
        <button
          className={
            "px-4 py-2 text-lg text-left" +
            (activeTabIndex === index
              ? " text-white rounded-xl bg-primary-500"
              : " text-primary-800")
          }
          onClick={() => setTabIndex(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ButtonTabs;
