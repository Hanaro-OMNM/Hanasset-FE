import { useState } from 'react';
import RealEstateDetailLayout from '../../components/template/RealEstateDetailLayout';
import { AdditionalEstate } from '../../types/hanaAsset';
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
    console.log(element);
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
        <MarketSection
          supplyArea={138.89}
          exclusiveArea={101.83}
          realPriceInfo={{
            B1: [
              {
                tradeDate: '2024-03-25',
                tradeYear: '2024',
                floor: 2,
                dealPrice: null,
                deposit: 730000000,
                monthlyRent: 0,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2023-11-13',
                tradeYear: '2023',
                floor: 15,
                dealPrice: null,
                deposit: 800000000,
                monthlyRent: 0,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2023-03-28',
                tradeYear: '2023',
                floor: 27,
                dealPrice: null,
                deposit: 750000000,
                monthlyRent: 0,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2018-12-19',
                tradeYear: '2018',
                floor: 33,
                dealPrice: null,
                deposit: 620000000,
                monthlyRent: 0,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2017-06-04',
                tradeYear: '2017',
                floor: 22,
                dealPrice: null,
                deposit: 570000000,
                monthlyRent: 0,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2016-10-06',
                tradeYear: '2016',
                floor: 33,
                dealPrice: null,
                deposit: 520000000,
                monthlyRent: 0,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
            ],
            B2: [
              {
                tradeDate: '2023-01-28',
                tradeYear: '2023',
                floor: 22,
                dealPrice: null,
                deposit: 250000000,
                monthlyRent: 1650000,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2022-12-03',
                tradeYear: '2022',
                floor: 33,
                dealPrice: null,
                deposit: 700000000,
                monthlyRent: 600000,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2021-02-16',
                tradeYear: '2021',
                floor: 22,
                dealPrice: null,
                deposit: 250000000,
                monthlyRent: 1800000,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2020-07-08',
                tradeYear: '2020',
                floor: 32,
                dealPrice: null,
                deposit: 400000000,
                monthlyRent: 750000,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
              {
                tradeDate: '2018-11-10',
                tradeYear: '2018',
                floor: 22,
                dealPrice: null,
                deposit: 260000000,
                monthlyRent: 1000000,
                deleteDate: null,
                isDelete: false,
                tradeCategory: null,
                registrationDate: null,
              },
            ],
          }}
        />
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
