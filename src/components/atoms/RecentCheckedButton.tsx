import { FaLocationDot } from 'react-icons/fa6';

interface RecentCheckedButtonProps {
  //   type: 'apt' | 'oneroom' | 'officetel' | '';
  //   onClick: (type: 'home' | 'car') => void;
  title: string;
  description: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

const RecentCheckedButton = ({
  //   type,
  //   onClick,
  title,
  description,
  roundedTop = false,
  roundedBottom = false,
}: RecentCheckedButtonProps) => {
  return (
    <button
      className={`w-full hover:transition-transform transform hover:scale-105 
      hover:bg-hanaGreen10 transition-all duration-100 ease-in-out focus:outline-none
      ${roundedTop ? 'rounded-t-lg' : ''} 
      ${roundedBottom ? 'rounded-b-lg' : ''}`}
      onClick={() => {}}
    >
      <div className="flex items-center w-full p-4">
        <div className="text-hanaGreen text-xl w-5">
          <FaLocationDot />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-gray-800 text-base leading-tight">{title}</div>
          <div className="text-hanaSilver80 text-xs font-normal">
            {description}
          </div>
        </div>
      </div>
    </button>
  );
};

export default RecentCheckedButton;
