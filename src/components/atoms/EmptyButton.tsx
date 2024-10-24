import { Button as HeadlessButton } from '@headlessui/react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  href?: string;
}

export default function EmptyButton({
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
      className={`py-1 rounded-md text-hanaGreen w-72 mb-5 font-semibold border 
      ${disabled ? 'bg-gray-400 cursor-not-allowed border-gray-400' : 'bg-white border-hanaGreen'}`}
    >
      {href ? (
        <a href={href} className="underline text-hanaGreen">
          {text}
        </a>
      ) : (
        <>{text}</>
      )}
    </HeadlessButton>
  );
}
