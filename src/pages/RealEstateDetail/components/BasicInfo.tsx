import React, { useEffect, useState } from 'react';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import { RealEstateBasicInfo } from '../../../types/hanaAssetResponse.common.ts';
import { HeatingAndCoolingUtils } from '../../../utils/HeatingAndCoolingUtils.ts';

interface BasicInfoProps {
  realEstateId: number;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ realEstateId }) => {
  const [realEstateBasicInfo, setRealEstateBasicInfo] =
    useState<RealEstateBasicInfo | null>(null);

  useEffect(() => {
    const fetchRealEstateBasic = async () => {
      try {
        const realEstateBasic =
          await PlatformAPI.getRealEstateBasic(realEstateId);
        const realEstateBasicInfo = realEstateBasic.result;
        setRealEstateBasicInfo(realEstateBasicInfo);
      } catch (error) {
        console.error('Error fetching real estate basic:', error);
      }
    };

    fetchRealEstateBasic();
  }, [realEstateId]);

  if (!realEstateBasicInfo) {
    return null;
  }

  const {
    address,
    unitCount,
    parkingCount,
    establishedDate,
    dongCount,
    heatingAndCoolingInfo,
    buildingRatioInfo,
    constructionCompany,
  } = realEstateBasicInfo;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">기본정보</h2>
      <ul className="list-disc list-inside">
        <li>사용승인일 {establishedDate}</li>
        <li>{address}</li>
        <li>
          {unitCount}세대 / {dongCount}개동
        </li>
        <li>
          주차 {(parkingCount / unitCount).toFixed(1)}대 / 총 {parkingCount}대
        </li>
        <li>
          {
            HeatingAndCoolingUtils.systemTypeMap[
              heatingAndCoolingInfo.systemType
            ]
          }{' '}
          {
            HeatingAndCoolingUtils.energyTypeMap[
              heatingAndCoolingInfo.energyType
            ]
          }
        </li>
        <li>
          용적률 {buildingRatioInfo.floorAreaRatio}% / 건폐율{' '}
          {buildingRatioInfo.buildingCoverageRatio}%
        </li>
        <li>{constructionCompany} (건설사)</li>
      </ul>
    </div>
  );
};

export default BasicInfo;
