import { useState } from 'react';
import RealEstateDetailLayout from '../../components/template/RealEstateDetailLayout';
import { RealEstatePreview } from '../../types/hanaAssetResponse.common.ts';
import BasicInfo from './components/BasicInfo.tsx';
import Estimate from './components/Estimate';
import ImageCarousel from './components/ImageCarousel';
import MarketSection from './components/MarketSection';
import PropertyDetails from './components/PropertyDetails';
import PropertyInfo from './components/PropertyInfo';
import Tabs from './components/Tabs';
import TypeInfo from './components/TypeInfo';

interface RealEstateDetailProps {
  realEstate: RealEstatePreview;
  onBackClick: () => void;
  isStarFilled: boolean;
}

export default function RealEstateDetail({
  realEstate,
  isStarFilled,
  onBackClick,
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
      <ImageCarousel image={realEstate.imgUrl} onBackClick={onBackClick} />
      <PropertyInfo estate={realEstate} isStarFilled={isStarFilled} />

      <Tabs tabs={tabData} onTabClick={handleTabClick} />

      <div id="시세" className="pt-12">
        <MarketSection realEstateId={realEstate.realEstateId} />
      </div>

      <div id="타입" className="pt-12">
        <TypeInfo realEstateId={realEstate.realEstateId} />
      </div>

      <div id="매물정보" className="pt-12">
        <PropertyDetails realEstateId={realEstate.realEstateId} />
      </div>

      <div id="기본정보" className="pt-12">
        <BasicInfo realEstateId={realEstate.realEstateId} />
      </div>
      <div id="예산" className="pt-12">
        <Estimate totalAsset={28} />
      </div>
    </RealEstateDetailLayout>
  );
}
