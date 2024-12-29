import { FaLocationDot } from 'react-icons/fa6';

interface RecentCheckedButtonProps {
  //   type: 'apt' | 'one-room' | 'officetel' | '';
  onClick: () => void;
  title: string;
  query: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

const RecentCheckedButton = ({
  //   type,
  onClick,
  title,
  query,
  roundedTop = false,
  roundedBottom = false,
}: RecentCheckedButtonProps) => {
  // keyword 부분을 다른 색으로 강조하는 함수
  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text; // keyword가 빈 문자열일 경우 원본 텍스트 그대로 반환
    const parts = text.split(new RegExp(`(${keyword})`, 'gi')); // keyword를 구분자로 분리

    return parts.map((part) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span className="text-hanaGreen font-semibold">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <button
      className={`w-full  
      hover:bg-hanaGreen10 focus:outline-none
      ${roundedTop ? 'rounded-t-lg' : ''} 
      ${roundedBottom ? 'rounded-b-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center w-full py-4">
        <div className="text-hanaGreen text-xl w-5 mr-10">
          <FaLocationDot />
        </div>
        <div>
          <div className="text-gray-800 text-base leading-tight">
            {highlightKeyword(title, query)}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mb-3" />
    </button>
  );
};

export default RecentCheckedButton;
