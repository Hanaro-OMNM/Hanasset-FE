import { useState } from 'react';
import RealEstateDetailLayout from '../../components/template/RealEstateDetailLayout';
import { AdditionalEstate } from '../../types/global';
import BasicInfo from './components/BasicInfo.tsx';
import Estimate from './components/Estimate';
import ImageCarousel from './components/ImageCarousel';
import MarketSection from './components/MarketSection';
import PropertyDetails from './components/PropertyDetails';
import PropertyInfo from './components/PropertyInfo';
import Tabs from './components/Tabs';
import TypeInfo from './components/TypeInfo';

interface RealEstateDetailProps {
  estate?: AdditionalEstate;
  onBackClick: () => void;
  isStarFilled: boolean;
}

export default function RealEstateDetail({
  estate,
  onBackClick,
  isStarFilled,
}: RealEstateDetailProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    { label: '시세', isActive: activeTab === 0 },
    { label: '타입', isActive: activeTab === 1 },
    { label: '매물정보', isActive: activeTab === 2 },
    { label: '기본정보', isActive: activeTab === 3 },
    { label: '예산', isActive: activeTab === 4 },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const element = document.getElementById(tabData[index].label);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <RealEstateDetailLayout>
      <ImageCarousel
        images={estate?.addressInfo.photos}
        onBackClick={onBackClick}
      />
      <PropertyInfo
        name={estate?.basicInfo.atclNm}
        title={estate?.basicInfo.bildNm}
        floor={estate?.priceInfo.detailInfo.spaceInfo.floorInfo.targetFloor}
        rentType={estate?.basicInfo.tradTpNm}
        price={estate?.basicInfo.prc}
        description={
          estate?.priceInfo.detailInfo.articleDetailInfo.articleDescription
        }
        isStarFilled={isStarFilled}
      />
      <Tabs tabs={tabData} onTabClick={handleTabClick} />

      <div id="시세">
        <MarketSection
          supplyArea={estate?.floorPlanInfo.supplyArea}
          exclusiveArea={estate?.floorPlanInfo.exclusiveArea}
          floor={estate?.priceInfo.detailInfo.spaceInfo.floorInfo.targetFloor}
          realPriceInfo={estate?.realPriceInfo}
        />
      </div>
      <div id="타입">
        <TypeInfo
          supplyArea={estate?.floorPlanInfo.supplyArea}
          unitsOfSameAreaNumber={estate?.floorPlanInfo.unitsOfSameArea}
          floorPlanImage={estate?.floorPlanInfo.floorPlanUrls?.BASE?.['0'][2]}
          exclusiveArea={estate?.floorPlanInfo.exclusiveArea}
          rooms={estate?.floorPlanInfo.roomCount}
          bathrooms={estate?.floorPlanInfo.bathRoomCount}
          managementFee={estate!.maintenanceInfo.yearMonthFee}
          floorPlanLink={
            'https://fin.land.naver.com/articles/' + estate?.basicInfo.atclNo
          }
        />
      </div>
      <div id="매물정보">
        <PropertyDetails
          propertyNumber={estate?.basicInfo.atclNo}
          movingInInfo={estate?.priceInfo.detailInfo.movingInInfo}
          managementFee={estate!.maintenanceInfo.yearMonthFee}
          parkingCount={estate?.addressInfo.parkingInfo.totalParkingCount}
          parkingPerHousehold={
            estate?.addressInfo.parkingInfo.parkingCountPerHousehold
          }
          direction={estate?.priceInfo.detailInfo.spaceInfo.direction}
          directionStandard={
            estate?.priceInfo.detailInfo.spaceInfo.directionStandard
          }
          totalFloors={
            estate?.priceInfo.detailInfo.spaceInfo.floorInfo.totalFloor
          }
          currentFloor={
            estate?.priceInfo.detailInfo.spaceInfo.floorInfo.targetFloor
          }
          unitsOfSameAreaNumber={estate?.floorPlanInfo.unitsOfSameArea}
        />
      </div>
      <div id="기본정보">
        <BasicInfo
          useApprovalDate={estate?.addressInfo.useApprovalDate}
          approvalElapsedYear={estate?.addressInfo.approvalElapsedYear}
          city={estate?.addressInfo.address.city}
          division={estate?.addressInfo.address.division}
          sector={estate?.addressInfo.address.sector}
          roadName={estate?.addressInfo.address.roadName}
          totalHouseholdNumber={estate?.addressInfo.totalHouseholdNumber}
          dongCount={estate?.addressInfo.dongCount}
          parkingPerHousehold={
            estate?.addressInfo.parkingInfo.parkingCountPerHousehold
          }
          parkingCount={estate?.addressInfo.parkingInfo.totalParkingCount}
          totalFloors={
            estate?.priceInfo.detailInfo.spaceInfo.floorInfo.totalFloor
          }
          entranceType={estate?.priceInfo.detailInfo.facilityInfo.entranceType}
          heatingAndCoolingSystemType={
            estate?.addressInfo.heatingAndCoolingInfo
              .heatingAndCoolingSystemType
          }
          heatingEnergyType={
            estate?.addressInfo.heatingAndCoolingInfo.heatingEnergyType
          }
          floorAreaRatio={estate?.addressInfo.buildingRatioInfo.floorAreaRatio}
          buildingRatio={
            estate?.addressInfo.buildingRatioInfo.buildingCoverageRatio
          }
          constructionCompany={estate?.addressInfo.constructionCompany}
          brokerage={estate?.brokerInfo.phone.brokerage}
        />
      </div>
      <div id="예산">
        <Estimate totalAsset={28} />
      </div>
    </RealEstateDetailLayout>
  );
}
