import { AiOutlineRight } from 'react-icons/ai';

interface PropertyItemProps {
  type: 'home' | 'family' | 'job' | 'income' | 'loan';
  label: string;
  value: string;
  onClick: (type: 'home' | 'family' | 'job' | 'income' | 'loan') => void;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

export default function PropertyItem({
  type,
  label,
  value,
  onClick,
}: PropertyItemProps) {
  return (
    <button
      className={`w-full hover:transition-transform transform hover:scale-105 
      hover:bg-hanaGreen10 transition-all duration-300 ease-in-out focus:outline-none flex justify-between py-5 `}
      onClick={() => onClick(type)}
    >
      <span className="text-hanaBlack60 text-md ">{label}</span>
      <div className="flex items-center">
        <span className="text-hanaBlack80 text-md font-bold">
          {value || '없음'}
        </span>
        <AiOutlineRight className="text-gray-400 text-lg ml-2" />
      </div>
    </button>
  );
}
