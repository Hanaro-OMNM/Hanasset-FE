import { BsFillSendFill } from 'react-icons/bs';

interface RegisterButtonProps {
  type: 'home' | 'car';
  onClick: (type: 'home' | 'car') => void;
  title: string;
  description: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

export default function RegisterButton({
  type,
  onClick,
  title,
  description,
  roundedTop = false,
  roundedBottom = false,
}: RegisterButtonProps) {
  return (
    <button
      className={`focus:bg-gray-300 focus:outline-0 w-full bg-white pt-4 pb-4 
      hover:border-gray-300 active:border-gray-300
      ${roundedTop ? 'rounded-t-[10px]' : ''} 
      ${roundedBottom ? 'rounded-b-[10px]' : ''}`}
      onClick={() => onClick(type)}
    >
      <div className="flex">
        <div className="content-center pl-3">
          <BsFillSendFill />
        </div>
        <div className="justify-center w-full pr-3">
          <div className="text-black text-sm font-normal font-['Inter'] leading-tight">
            {title}
          </div>
          <div className="text-hanaSilver80 text-xs font-normal font-['Inter'] tracking-tight">
            {description}
          </div>
        </div>
      </div>
    </button>
  );
}
