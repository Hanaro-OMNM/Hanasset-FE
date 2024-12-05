import React from 'react';

interface ManualTitleProps {
  text: string;
}

const ManualTitle: React.FC<ManualTitleProps> = ({ text }) => {
  return (
    <span className="fixed font-fontMedium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-ManualColor1 via-ManualColor2 to-ManualColor3">
      {text}
    </span>
  );
};

export default ManualTitle;
