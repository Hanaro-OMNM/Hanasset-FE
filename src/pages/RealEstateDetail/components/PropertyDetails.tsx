import { FaBuilding, FaCompass, FaUsers } from 'react-icons/fa';
import React from 'react';
import { DirectionUtils } from '../../../utils/DirectionUtils.ts';

interface PropertyDetailsProps {
  propertyNumber: string | undefined;
  movingInInfo: MovingInInfoProps | undefined;
  managementFee: number | undefined;
  parkingCount: number | undefined;
  parkingPerHousehold: number | undefined;
  direction: string | undefined;
  directionStandard: string | undefined;
  totalFloors: string | undefined;
  currentFloor: string | undefined;
  unitsOfSameAreaNumber: number | undefined;
}

interface MovingInInfoProps {
  movingInNegotiation: boolean;
  movingInDate: string | null;
  movingInMonth: string | null;
  movingInType: string;
  contractPeriod: string | null;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  propertyNumber,
  movingInInfo,
  managementFee,
  parkingCount,
  parkingPerHousehold,
  direction,
  directionStandard,
  totalFloors,
  currentFloor,
  unitsOfSameAreaNumber,
}) => {
  const movingInValidation = movingInInfo?.movingInNegotiation
    ? '즉시입주 협의 가능'
    : '즉시입주';

  const managementFeeText = managementFee
    ? Math.floor(managementFee / 10000) + '만'
    : undefined;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">매물정보</h2>
      <div className="flex items-center mb-4">
        <div className="flex-1 text-center">
          <FaBuilding className="mx-auto mb-1 text-gray-600" size={24} />
          <p>
            {currentFloor}층 / {totalFloors}층
          </p>
        </div>
        <div className="flex-1 text-center">
          <FaCompass className="mx-auto mb-1 text-gray-600" size={24} />
          <p>
            ({directionStandard}){DirectionUtils.setDirection(direction!)}
          </p>
        </div>
        <div className="flex-1 text-center">
          <FaUsers className="mx-auto mb-1 text-gray-600" size={24} />
          <p>해당면적 {unitsOfSameAreaNumber}세대</p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <ul className="list-disc list-inside mb-4">
        <li>{propertyNumber} (매물번호)</li>
        <li>{movingInValidation}</li>
        <li>관리비 {managementFeeText} (최근 1년 관리비 평균)</li>
        <li>
          {DirectionUtils.setDirection(direction!)} ({directionStandard})
        </li>
        <li>
          총 주차 {parkingCount}대 / 세대 당 주차 {parkingPerHousehold}대
        </li>
      </ul>
    </div>
  );
};

export default PropertyDetails;
