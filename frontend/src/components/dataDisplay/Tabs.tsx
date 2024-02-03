import { useState } from "react";

export interface Tab {
  id: string;
  tabTitle: string;
  page: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId: string;
  mt?: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId, mt = 0 }: TabsProps) => {
  const [activeTabId, setActiveTab] = useState(defaultTabId);
  const activeTabClass = "inline-block p-4 text-primary-600 bg-primary-200 rounded-t-lg active";
  const inactiveTabClass = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100";

  return (
    <div className={`mt-${mt}`}>
      <div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b-2 border-primary-300">
          {tabs.map((tab) => (
            <li className="me-2">
              <span className={ tab.id === activeTabId ? activeTabClass : inactiveTabClass} onClick={() => setActiveTab(tab.id)}>
                {tab.tabTitle}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        {tabs.find((tab) => tab.id === activeTabId)?.page }
      </div>
    </div>
  );
};

export default Tabs;
