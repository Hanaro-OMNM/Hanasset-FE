import React, { useState } from 'react';
import PropertyStar from '../../../components/molecules/Star';

interface PropertyInfoProps {
  name: string | undefined;
  title: string | undefined;
  floor: string | undefined;
  rentType: string | undefined;
  price: number | undefined;
  description: string | null | undefined;
  isStarFilled: boolean;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  name,
  title,
  floor,
  rentType,
  price,
  description,
  isStarFilled,
}) => {
  function convertToEok(number: number) {
    return (number / 10000).toFixed(1) + '억';
  }

  const prcResult = price ? convertToEok(price) : undefined;

  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 50; // 최대 표시 글자 수

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedText =
    description!.length > MAX_LENGTH
      ? description!.slice(0, MAX_LENGTH) + '...'
      : description;

  return (
    <>
      <div className="w-full ml-96">
        <PropertyStar isFilled={isStarFilled} />
      </div>
      <div className="p-4 flex flex-col justify-center items-center">
        <p className="text-lg font-semibold">
          {name} {title} {floor}층
        </p>
        <p
          className={`text-3xl font-bold ${rentType === '전세' ? 'text-hanaColor2' : 'text-red-600'}`}
        >
          <span>{rentType}</span>{' '}
          <span className="text-black">{prcResult}</span>
        </p>
        <div className="relative">
          {/* 설명 텍스트 */}
          <p className="pt-2 px-10 text-sm text-gray-500">
            {isExpanded ? description : truncatedText}
            {/* 더보기/접기 버튼 */}
            {description!.length > MAX_LENGTH && (
              <button
                onClick={toggleExpand}
                className="ml-2 text-blue-500 text-sm underline"
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default PropertyInfo;
