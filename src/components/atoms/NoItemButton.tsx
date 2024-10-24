import React from 'react';

interface NoItemButtonProps {
  text: string;
  onClick: () => void;
}

const NoItemButton: React.FC<NoItemButtonProps> = ({ text, onClick }) => {
  return (
    <div className="mt-8 flex justify-center">
      <div
        className="w-[143px] h-[18px] text-[#71727a] text-[13px] font-normal font-['Inter'] underline leading-none tracking-tight cursor-pointer"
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default NoItemButton;
