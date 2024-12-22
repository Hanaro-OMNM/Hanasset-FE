import { FaBuilding, FaCompass, FaUsers } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import { RealEstateDetailInfo } from '../../../types/hanaAssetResponse.common.ts';
import { DirectionUtils } from '../../../utils/DirectionUtils.ts';
import { EntranceYpeUtils } from '../../../utils/EntranceYpeUtils.ts';

interface PropertyDetailsProps {
  realEstateId: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ realEstateId }) => {
  const [realEstateDetailInfo, setRealEstateDetailInfo] =
    useState<RealEstateDetailInfo | null>(null);

  useEffect(() => {
    const fetchRealEstateDetail = async () => {
      try {
        const realEstateDetail =
          await PlatformAPI.getRealEstateDetail(realEstateId);
        const realEstateDetailInfo = realEstateDetail.result;
        setRealEstateDetailInfo(realEstateDetailInfo);
      } catch (error) {
        console.error('Error fetching real estate detail:', error);
      }
    };

    fetchRealEstateDetail();
  }, [realEstateId]);

  if (!realEstateDetailInfo) {
    return null;
  }

  const { unitCount, entranceType, floorInfo, directionInfo } =
    realEstateDetailInfo;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">매물정보</h2>
      <div className="flex items-center mb-4">
        <div className="flex-1 text-center">
          <FaBuilding className="mx-auto mb-1 text-gray-600" size={24} />
          <p>
            {floorInfo.target}층 / {floorInfo.total}층
          </p>
        </div>
        <div className="flex-1 text-center">
          <FaCompass className="mx-auto mb-1 text-gray-600" size={24} />
          <p>
            ({directionInfo.standard})
            {DirectionUtils.setDirection(directionInfo.facing)}
          </p>
        </div>
        <div className="flex-1 text-center">
          <FaUsers className="mx-auto mb-1 text-gray-600" size={24} />
          <p>해당면적 {unitCount}세대</p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <ul className="list-disc list-inside mb-4">
        <li>{EntranceYpeUtils.entranceTypeMap[entranceType]} (현관구조)</li>

        <li>
          {DirectionUtils.setDirection(directionInfo.facing)} (
          {directionInfo.standard})
        </li>
      </ul>
    </div>
  );
};

export default PropertyDetails;
