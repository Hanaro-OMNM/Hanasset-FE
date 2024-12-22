import React, { useEffect, useState } from 'react';
import { PlatformAPI } from '../../../platform/PlatformAPI';
import { RealEstateTypeInfo } from '../../../types/hanaAssetResponse.common';

interface TypeInfoProps {
  realEstateId: number;
}

const TypeInfo: React.FC<TypeInfoProps> = ({ realEstateId }) => {
  const [realEstateType, setRealEstateType] =
    useState<RealEstateTypeInfo | null>(null);

  useEffect(() => {
    const fetchRealEstateType = async () => {
      try {
        const realEstateType =
          await PlatformAPI.getRealEstateType(realEstateId);
        const realEstateTypeInfo = realEstateType.result;
        setRealEstateType(realEstateTypeInfo);
      } catch (error) {
        console.error('Error fetching real estate type:', error);
      }
    };

    fetchRealEstateType();
  }, [realEstateId]);

  if (!realEstateType) {
    return null;
  }

  const {
    name,
    supplyAreaSize,
    exclusiveAreaSize,
    managementFee,
    roomCount,
    bathroomCount,
    floorPlanImgUrl,
    floorPlanLink,
  } = realEstateType;

  const strSupplyArea = supplyAreaSize.toFixed(2) + 'm²';
  const strExclusiveArea = exclusiveAreaSize.toFixed(2) + 'm²';

  function roundToN(num: number, n: number) {
    return Math.round(num * 10 ** n) / 10 ** n;
  }

  const exclusiveRatePer =
    (roundToN(exclusiveAreaSize / supplyAreaSize, 4) * 100).toFixed(2) + '%';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">타입</h2>
      <div className="flex items-start mb-4">
        <div className="flex-1">
          <p className="text-lg">• {name + 'm²'}</p>
          <img
            src={floorPlanImgUrl}
            alt="Floor Plan"
            className="w-auto h-auto"
          />
          <div className="flex justify-center text-xs text-gray-600 mb-2">
            <div className="flex flex-col text-center">
              <p>공급/전용</p>
              <p className="font-bold">
                {strSupplyArea}/{strExclusiveArea}
              </p>
            </div>
            <span className="border-r border-gray-300 mx-5"></span>
            <div className="flex flex-col">
              <p>방/욕실</p>
              <p className="font-bold">
                {roomCount}개/{bathroomCount}개
              </p>
            </div>
            <span className="border-r border-gray-300 mx-5"></span>
            <div className="flex flex-col">
              <p>전용률</p>
              <p className="font-bold">{exclusiveRatePer}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-2 rounded text-center">
        <p>
          연 평균 관리비{' '}
          <span className="font-bold">
            {new Intl.NumberFormat('ko-KR').format(managementFee!)}
          </span>
          원
        </p>
      </div>
      <div className="text-right mt-2">
        <a
          href={floorPlanLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          네이버부동산 평면도
        </a>
      </div>
    </div>
  );
};

export default TypeInfo;
