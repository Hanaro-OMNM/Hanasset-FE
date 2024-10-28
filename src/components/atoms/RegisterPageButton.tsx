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
      className={`w-full bg-white pt-5 pb-5 px-4 flex items-center shadow-md hover:shadow-lg 
      hover:bg-hanaGreen10 transition-all duration-300 ease-in-out focus:outline-none
      ${roundedTop ? 'rounded-t-lg' : ''} 
      ${roundedBottom ? 'rounded-b-lg' : ''}`}
      onClick={() => onClick(type)}
    >
      <div className="flex items-center w-full">
        <div className="text-hanaGreen text-xl w-5">
          <BsFillSendFill />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-gray-800 text-base leading-tight">
            {title}
          </div>
          <div className="text-hanaSilver80 text-xs font-normal">
            {description}
          </div>
        </div>
      </div>
    </button>
  );
}
