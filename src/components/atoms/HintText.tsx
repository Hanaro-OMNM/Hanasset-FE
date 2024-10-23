import React from 'react';

interface HintTextProps {
  text: string;
}

const HintText: React.FC<HintTextProps> = ({ text }) => {
  return (
    <div className="w-[310px] h-4 text-[#71727a] text-xs font-normal font-['Inter'] leading-none tracking-tight mt-2">
      {text}
    </div>
  );
};

export default HintText;
