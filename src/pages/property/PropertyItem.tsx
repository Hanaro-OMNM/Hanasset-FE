import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface PropertyItemProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export default function PropertyItem({
  label,
  value,
  onClick,
}: PropertyItemProps) {
  return (
    <div
      className="flex justify-between items-center py-4 cursor-pointer"
      onClick={onClick}
    >
      <span className="text-hanaBlack60 text-sm ">{label}</span>
      <div className="flex items-center">
        <span className="text-hanaBlack80 text-md font-bold">
          {value || '없음'}
        </span>
        <MdOutlineKeyboardArrowRight className="ml-2 text-gray-600" />
      </div>
    </div>
  );
}
