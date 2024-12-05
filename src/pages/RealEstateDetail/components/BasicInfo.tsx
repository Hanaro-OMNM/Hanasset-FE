import React from 'react';
import { EntranceYpeUtils } from '../../../utils/EntranceYpeUtils.ts';
import { HeatingAndCoolingUtils } from '../../../utils/HeatingAndCoolingUtils.ts';

interface BasicInfoProps {
  useApprovalDate: string | undefined;
  approvalElapsedYear: number | undefined;
  city: string | undefined;
  division: string | undefined;
  sector: string | undefined;
  roadName: string | undefined;
  totalHouseholdNumber: number | undefined;
  dongCount: number | undefined;
  parkingPerHousehold: number | undefined;
  parkingCount: number | undefined;
  totalFloors: string | undefined;
  entranceType: string | null | undefined;
  heatingAndCoolingSystemType: string | undefined;
  heatingEnergyType: string | undefined;
  floorAreaRatio: number | undefined;
  buildingRatio: number | undefined;
  brokerage: string | null | undefined;
  constructionCompany: string | undefined;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  useApprovalDate,
  approvalElapsedYear,
  city,
  division,
  sector,
  roadName,
  totalHouseholdNumber,
  dongCount,
  parkingPerHousehold,
  parkingCount,
  totalFloors,
  entranceType,
  heatingAndCoolingSystemType,
  heatingEnergyType,
  floorAreaRatio,
  buildingRatio,
  brokerage,
  constructionCompany,
}) => {
  const year = useApprovalDate!.slice(0, 4);
  const month = useApprovalDate!.slice(4, 6);
  const day = useApprovalDate!.slice(6, 8);

  function formatCityName(cityName: string): string {
    const cityMapping: { [key: string]: string } = {
      서울시: '서울특별시',
      대전시: '대전광역시',
      부산시: '부산광역시',
      대구시: '대구광역시',
      인천시: '인천광역시',
      광주시: '광주광역시',
      울산시: '울산광역시',
      세종시: '세종특별자치시',
    };

    return cityMapping[cityName] || cityName;
  }

  const cityName = formatCityName(city!);
  const approvalFormattedDate = `${year}.${month}.${day}`;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">기본정보</h2>
      <ul className="list-disc list-inside">
        <li>
          사용승인일 {approvalFormattedDate} ({approvalElapsedYear}년차)
        </li>
        <li>
          {cityName} {division} {sector} {roadName}
        </li>
        <li>
          {totalHouseholdNumber}세대 / {dongCount}개동
        </li>
        <li>
          주차 {parkingPerHousehold}대 / 총 {parkingCount}대
        </li>
        <li>최고 {totalFloors}층</li>
        <li>{EntranceYpeUtils.entranceTypeMap[entranceType!]} (현관구조)</li>
        <li>
          {HeatingAndCoolingUtils.systemTypeMap[heatingAndCoolingSystemType!]}{' '}
          {HeatingAndCoolingUtils.energyTypeMap[heatingEnergyType!]}
        </li>
        <li>
          용적률 {floorAreaRatio}% / 건폐율 {buildingRatio}%
        </li>
        <li>{constructionCompany} (건설사)</li>
        <li>관리사무소 {brokerage}</li>
      </ul>
    </div>
  );
};

export default BasicInfo;
