import { FaLocationDot } from 'react-icons/fa6';

interface RecentCheckedButtonProps {
  //   type: 'apt' | 'one-room' | 'officetel' | '';
  //   onClick: (type: 'home' | 'car') => void;
  title: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

const RecentCheckedButton = ({
  //   type,
  //   onClick,
  title,
  roundedTop = false,
  roundedBottom = false,
}: RecentCheckedButtonProps) => {
  return (
    <button
      className={`w-full  
      hover:bg-hanaGreen10 focus:outline-none
      ${roundedTop ? 'rounded-t-lg' : ''} 
      ${roundedBottom ? 'rounded-b-lg' : ''}`}
      onClick={() => {}}
    >
      <div className="flex items-center w-full py-4">
        <div className="text-hanaGreen text-xl w-5 mr-10">
          <FaLocationDot />
        </div>
        <div className="">
          <div className="text-gray-800 text-base leading-tight">{title}</div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mb-3" />
    </button>
  );
};

export default RecentCheckedButton;
