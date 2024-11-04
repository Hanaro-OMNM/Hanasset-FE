import React from 'react';

interface NoItemButtonProps {
  text: string;
  onClick?: () => void;
}

const NoItemButton: React.FC<NoItemButtonProps> = ({ text, onClick }) => {
  return (
    <div className="mt-8 flex justify-center">
      <div
        className="w-30 h-10 text-gray-400 text-xs font-normal underline  cursor-pointer items-center justify-self-center"
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default NoItemButton;
