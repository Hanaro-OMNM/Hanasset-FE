import React from 'react';

interface Tab {
  label: string;
  isActive: boolean;
}

interface TabsProps {
  tabs: Tab[];
  onTabClick: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick }) => {
  return (
    <div className="sticky top-0 bg-white z-10 shadow">
      <div className="flex justify-center space-x-4 py-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabClick(index)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-300 ${
              tab.isActive
                ? 'bg-hanaColor2 text-white'
                : 'bg-transparent text-gray-400  hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
