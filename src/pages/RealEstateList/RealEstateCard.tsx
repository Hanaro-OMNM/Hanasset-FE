import React from 'react';

interface RealEstateCardProps {
  type: string;
  location: string;
  price: string;
  size: string;
  description: string;
  dealType: string;
  imageUrl: string;
  onClick: () => void; // 클릭 핸들러 추가
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  type,
  location,
  price,
  size,
  description,
  dealType,
  imageUrl,
  onClick,
}) => {
  const truncateText = (text: string) => {
    if (text.length > 9) {
      return text.substring(0, 9) + '...';
    }
    return text;
  };
  // 텍스트 길이가 9자를 초과하면 말줄임표를 추가 (텍스트 태그별로 길이 재정의해야 함)
  return (
    <button className="flex relative" onClick={onClick}>
      <div className="pl-2 flex hover:transition-transform transform py-4 hover:bg-white hover:text-gray-600">
        <img
          className="w-[100px] h-[100px] object-cover flex-shrink-0 rounded-3xl"
          src={imageUrl}
          alt={`${type} 이미지`}
        />
        <div className="flex flex-col justify-center p-4 flex-grow min-w-0">
          {dealType === '전세' ? (
            <div className="flex text-sm font-bold mb-2 items-center">
              <div className="text-hanaGreen flex-shrink-0 text-xl">
                {dealType}
              </div>
              <div className="ml-2 flex-shrink-0"> {price} </div>
            </div>
          ) : (
            <div className="flex text-sm font-bold mb-2 items-center">
              <div className="text-hanaRed80 flex-shrink-0 text-xl">
                {dealType}
              </div>
              <div className="ml-2 flex-shrink-0"> {price} </div>
            </div>
          )}
          <div className="flex w-full min-w-0">
            {type === '아파트' ? (
              <span className="text-blue-600 pr-1 font-semibold flex-shrink-0 ">
                {type}
              </span>
            ) : (
              <span className="text-hanaRed80 pr-1 font-bold text-base flex-shrink-0">
                {type}
              </span>
            )}
            <span className="text-black text-sm truncate  content-center">
              · {truncateText(location)}
            </span>
          </div>
          <p className="text-[#b5b5b5] text-sm truncate">
            {size}, {truncateText(description)}
          </p>
        </div>
      </div>
      <hr className="border-2 solid lightgray; margin: 10px 0;" />
    </button>
  );
};

export default RealEstateCard;
