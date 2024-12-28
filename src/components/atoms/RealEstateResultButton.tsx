import { FaBuilding } from 'react-icons/fa';

interface RealEstateResultButtonProps {
  onClick: () => void;
  title: string;
  keyword: string;
  address: string;
  complexId: number;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

const RealEstateResultButton = ({
  onClick,
  title,
  keyword,
  address,
  complexId,
  roundedTop = false,
  roundedBottom = false,
}: RealEstateResultButtonProps) => {
  const handleClick = () => {
    onClick(); // setCenter 호출
  };

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
      onClick={handleClick}
    >
      <div className="flex justify-between items-center w-full py-4">
        <div className="text-hanaGreen text-xl w-5 mr-3">
          <FaBuilding />
        </div>
        <div>
          <div className="w-44 text-gray-800 text-base leading-tight overflow-hidden overflow-ellipsis whitespace-nowrap">
            {title}
          </div>
        </div>
        <div>
          <div className="w-20 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
            {highlightKeyword(address, keyword)}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mb-3" />
    </button>
  );
};

export default RealEstateResultButton;
