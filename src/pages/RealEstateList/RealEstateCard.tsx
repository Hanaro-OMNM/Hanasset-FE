import React from 'react';

interface RealEstateCardProps {
  type: string;
  location: string;
  price: string;
  size: string;
  description: string;
  dealType: string;
  imageUrl: string;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  type,
  location,
  price,
  size,
  description,
  dealType,
  imageUrl,
}) => {
  const truncateText = (text: string) => {
    if (text.length > 9) {
      return text.substring(0, 9) + '...';
    }
    return text;
  };
  // 텍스트 길이가 9자를 초과하면 말줄임표를 추가 (텍스트 태그별로 길이 재정의해야 함)
  return (
    <div className="flex w-full bg-white relative font-sans">
      <img
        className="w-[240px] h-[210px] object-cover pb-2 flex-shrink-0"
        src={imageUrl}
        alt={`${type} 이미지`}
      />
      <div className="flex flex-col justify-center p-4 flex-grow min-w-0">
        {dealType === '매매' ? (
          <div className="flex text-sm font-bold mb-2 items-center">
            <div className="text-[#008485] flex-shrink-0">{dealType}</div>
            <div className="ml-2 flex-shrink-0"> {price} </div>
          </div>
        ) : (
          <div className="flex text-sm font-bold mb-2 items-center">
            <div className="text-red-500 flex-shrink-0">{dealType}</div>
            <div className="ml-2 flex-shrink-0"> {price} </div>
          </div>
        )}
        <div className="flex w-full min-w-0">
          {type === '아파트' ? (
            <span className="text-blue-600 pr-1 font-bold text-base flex-shrink-0">
              {type}
            </span>
          ) : (
            <span className="text-red-500 pr-1 font-bold text-base flex-shrink-0">
              {type}
            </span>
          )}
          <span className="text-black text-sm truncate">
            · {truncateText(location)}
          </span>
        </div>
        <p className="text-[#b5b5b5] text-sm truncate">
          {size}, {truncateText(description)}
        </p>
      </div>
    </div>
  );
};

export default RealEstateCard;
