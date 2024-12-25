import React from 'react';
import PropertyStar from '../../../components/molecules/Star';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import { RealEstatePreview } from '../../../types/hanaAssetResponse.common';

interface PropertyInfoProps {
  estate: RealEstatePreview;
  isBookmarked: boolean;
  onBookmarkUpdate: () => Promise<void>;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  estate,
  isBookmarked,
  onBookmarkUpdate,
}) => {
  function convertToEok(number: number) {
    return (number / 100000000).toFixed(1) + '억';
  }

  function convertToMan(number: number) {
    return (number / 10000).toFixed(0) + '만';
  }

  const { name, deposit, price, floor, type } = estate;
  const prcResult = convertToMan(price);
  const depositResult = convertToEok(deposit);

  function handleBookmark(isBookmarked: boolean) {
    if (!isBookmarked) {
      addBookmark(estate.realEstateId);
    } else {
      removeBookmark(estate.realEstateId);
    }
  }

  const addBookmark = async (id: number) => {
    try {
      const responseStatus = await PlatformAPI.addBookmarkRealEstate(id);
      if (responseStatus === 200) {
        onBookmarkUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeBookmark = async (id: number) => {
    try {
      const responseStatus = await PlatformAPI.removeBookmarkRealEstate(id);
      if (responseStatus === 200) {
        onBookmarkUpdate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col items-center">
        <div className="flex">
          <p className="text-lg font-semibold">
            {name} {floor}층
          </p>
          <div className="absolute right-2">
            <PropertyStar
              isFilled={isBookmarked}
              onClick={() => handleBookmark(isBookmarked)}
            />
          </div>
        </div>
        {type === '전세' ? (
          <div className="flex text-sm font-bold mb-2 items-center">
            <div className="justify-center text-3xl font-bold text-hanaGreen">
              전세
            </div>
            <div className="ml-2 flex-shrink-0"> {depositResult} </div>
          </div>
        ) : (
          <div className="flex text-sm font-bold mb-2 items-center">
            <div className="justify-center text-3xl font-bold text-hanaRed80">
              월세
            </div>
            <div className="ml-2 flex-shrink-0">
              {' '}
              {depositResult}/{prcResult}{' '}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyInfo;
