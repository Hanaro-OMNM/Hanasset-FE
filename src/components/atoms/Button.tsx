import { Button as HeadlessButton } from '@headlessui/react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  href?: string;
}

export default function Button({
  type = 'submit',
  onClick,
  disabled = false,
  text,
  href,
}: ButtonProps) {
  return (
    <HeadlessButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-semibold text-white transition 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-blue-700'}`}
    >
      {href ? (
        <a href={href} className="underline text-white">
          {text}
        </a>
      ) : (
        <>{text}</>
      )}
    </HeadlessButton>
  );
}
