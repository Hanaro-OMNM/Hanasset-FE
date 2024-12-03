import { AiOutlineRight } from 'react-icons/ai';

interface PropertyItemProps {
  type:
    | 'home'
    | 'family'
    | 'main'
    | 'editProfile'
    | 'job'
    | 'income'
    | 'loan'
    | 'equity';
  label: string;
  value: string;
  onClick: (
    type:
      | 'home'
      | 'family'
      | 'main'
      | 'editProfile'
      | 'job'
      | 'income'
      | 'loan'
      | 'equity'
  ) => void;
  className?: string;
  labelClassName?: string;
  labelColorClassName?: string;
  valueColorClassName?: string;
}

export default function PropertyItem({
  type,
  label,
  value,
  onClick,
  className = '',
  labelClassName = '',
  labelColorClassName = 'text-hanaBlack60',
  valueColorClassName = 'text-hanaBlack80',
}: PropertyItemProps) {
  return (
    <button
      className={`w-full hover:transition-transform transform hover:scale-105 
      hover:bg-hanaGreen10 transition-all duration-300 ease-in-out focus:outline-none flex justify-between py-5 ${className}`}
      onClick={() => onClick(type)}
    >
      <span className={`text-md ${labelClassName} ${labelColorClassName}`}>
        {label}
      </span>
      <div className="flex items-center">
        <span className={`text-md font-bold ${valueColorClassName}`}>
          {value || '없음'}
        </span>
        <AiOutlineRight className="text-gray-400 text-lg ml-2" />
      </div>
    </button>
  );
}
