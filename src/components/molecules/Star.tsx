import { CiStar } from 'react-icons/ci';
import React from 'react';

interface StarProps {
  isHighlighted: boolean;
}

const Star: React.FC<StarProps> = ({ isHighlighted }) => {
  return (
    <CiStar
      className={`w-7 h-9 ${isHighlighted ? 'text-yellow-500' : 'text-hanaColor2'}`}
    />
  );
};

export default Star;
