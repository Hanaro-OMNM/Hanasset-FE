import React from 'react';
import Star from '../../components/molecules/Star';
import { RealEstatePreview } from '../../types/hanaAssetResponse.common.ts';

interface RealEstateCardProps {
  estate: RealEstatePreview;
  onClick: () => void;
  isStarFilled: boolean;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  estate,
  onClick,
  isStarFilled,
}) => {
  const truncateArticleName = (text: string) => {
    if (text.length > 9) {
      return text.substring(0, 9) + '...';
    }
    return text;
  };

  const truncateDescriptionText = (text: string | undefined | null) => {
    if (text) {
      if (text.length > 30) {
        return text.substring(0, 30) + '...';
      }
      return text;
    } else {
      return '등록된 매물 설명이 없습니다.';
    }
  };
  // 텍스트 길이가 9자를 초과하면 말줄임표를 추가 (텍스트 태그별로 길이 재정의해야 함)

  function convertToEok(number: number) {
    return (number / 100000000).toFixed(1) + '억';
  }

  function convertToMan(number: number) {
    return (number / 10000).toFixed(1) + '만';
  }

  const prcResult = estate ? convertToMan(estate.price) : undefined;
  const depositResult = estate ? convertToEok(estate.deposit) : undefined;

  return (
    <button className="flex" onClick={onClick}>
      <div className="pl-2 flex hover:transition-transform transform py-4 hover:text-gray-600">
        <img
          className="w-[100px] h-[100px] object-cover flex-shrink-0 rounded-3xl"
          src={
            estate.imgUrl
              ? 'https://landthumb-phinf.pstatic.net/' + estate.imgUrl
              : 'https://placehold.co/100x100'
          }
          alt={`${estate.imgUrl ? estate.name : '임시'} 이미지`}
        />
        <div className="flex flex-col justify-center p-4 flex-grow min-w-0 w-64">
          {estate.type === '전세' ? (
            <div className="flex text-sm font-bold mb-2 items-center">
              <div className="text-hanaGreen flex-shrink-0 text-xl">전세</div>
              <div className="ml-2 flex-shrink-0"> {depositResult} </div>
            </div>
          ) : (
            <div className="flex text-sm font-bold mb-2 items-center">
              <div className="text-hanaRed80 flex-shrink-0 text-xl">월세</div>
              <div className="ml-2 flex-shrink-0">
                {' '}
                {depositResult}/{prcResult}{' '}
              </div>
            </div>
          )}
          <div className="flex w-full min-w-0">
            {estate.rentType === 'A01' ? (
              <span className="text-blue-600 pr-1 font-semibold flex-shrink-0 ">
                아파트 {estate.floor}층
              </span>
            ) : (
              <div>
                {estate.rentType === 'B01' ? (
                  <span className="text-hanaRed80 pr-1 font-bold text-base flex-shrink-0">
                    오피스텔
                  </span>
                ) : (
                  <span className="text-hanaRed80 pr-1 font-bold text-base flex-shrink-0">
                    상가
                  </span>
                )}
              </div>
            )}
            <span className="text-black text-sm truncate content-center">
              · {truncateArticleName(estate.name)}
            </span>
          </div>
          <p className="text-[#b5b5b5] text-sm text-start">
            {truncateDescriptionText(estate.description)}
          </p>
        </div>
      </div>
      <Star isFilled={isStarFilled} />
      <hr className="border-2 solid lightgray; margin: 10px 0;" />
    </button>
  );
};

export default RealEstateCard;
