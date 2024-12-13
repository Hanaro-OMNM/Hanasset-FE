import React from 'react';

type CloseButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className="text-white top-10 right-10 fixed" onClick={onClick}>
      ✕
    </button>
  );
};

export default CloseButton;
