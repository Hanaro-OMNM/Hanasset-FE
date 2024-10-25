import { useState } from 'react';
import {
  realEstateBasicInfoList,
  realEstateImages,
  realEstateMarketSectionProps,
  realEstatePropertyDetailsProps,
  realEstatePropertyInfoProps,
  realEstateTypeInfoData,
} from '../../assets/Dummy';
import RealEstateDetailLayout from '../../components/template/RealEstateDetailLayout';
import BasicInfo from './components/BasicInfo';
import Estimate from './components/Estimate';
import ImageCarousel from './components/ImageCarousel';
import MarketSection from './components/MarketSection';
import PropertyDetails from './components/PropertyDetails';
import PropertyInfo from './components/PropertyInfo';
import Tabs from './components/Tabs';
import TypeInfo from './components/TypeInfo';

export default function RealEstateDetail() {
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
      <ImageCarousel images={realEstateImages} />
      <PropertyInfo {...realEstatePropertyInfoProps} />
      <Tabs tabs={tabData} onTabClick={handleTabClick} />

      <div id="시세">
        <MarketSection {...realEstateMarketSectionProps} />
      </div>
      <div id="타입">
        <TypeInfo {...realEstateTypeInfoData} />
      </div>
      <div id="매물정보">
        <PropertyDetails {...realEstatePropertyDetailsProps} />
      </div>
      <div id="기본정보">
        <BasicInfo infoList={realEstateBasicInfoList} />
      </div>
      <div id="예산">
        <Estimate totalAsset={28} />
      </div>
    </RealEstateDetailLayout>
  );
}
