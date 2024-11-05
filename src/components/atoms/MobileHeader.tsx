import { IoChevronBack } from 'react-icons/io5';
import React from 'react';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

const MobileHeader: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex h-12 mb-4 gap-2 items-center">
      <button className="flex justify-center" onClick={onBack}>
        <IoChevronBack className="text-hanaBlack80 text-xl" />
      </button>
      <h1 className="text-hanaBlack80 text-lg font-semibold">{title}</h1>
    </div>
  );
};

export default MobileHeader;
