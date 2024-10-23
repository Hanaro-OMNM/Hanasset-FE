import { Button as HeadlessButton } from '@headlessui/react';
import React from 'react';

interface ImageButtonProps {
  type?: 'button' | 'submit';
  src: string;
  onClick?: () => void;
  width?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  type,
  src,
  onClick,
  width,
}) => {
  return (
    <HeadlessButton type={type} onClick={onClick}>
      <img
        className="w-auto"
        style={{ width: width ? width : '30px' }}
        src={src}
        alt="button image"
      />
    </HeadlessButton>
  );
};

export default ImageButton;
