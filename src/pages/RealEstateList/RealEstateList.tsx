import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import centerAtom from '../../recoil/center/index.ts';
import {
  RealEstateList,
  RealEstatePreview,
} from '../../types/hanaAssetResponse.common.ts';
import RealEstateDetail from '../RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from './RealEstateCard.tsx';

export default function RealEstateLayout() {
  const location = useLocation();
  const state = location.state as RealEstateList; // 전달받은 state 객체

  const center = useRecoilValue(centerAtom);
  const [currAddr, setCurrentAddr] = useState<string>('');
  const [selectedEstate, setSelectedEstate] =
    useState<RealEstatePreview | null>(null);
  const [showRealEstate, setShowRealEstate] = useState(true);
  const realEstateCount = state.result.count;

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await fetch(
          `api/map-reversegeocode/v2/gc?coords=${center.lng},${center.lat}&output=json`,
          {
            method: 'GET',
            headers: {
              'x-ncp-apigw-api-key-id': `${import.meta.env.VITE_MAP_CLIENT_ID}`,
              'x-ncp-apigw-api-key': `${import.meta.env.VITE_MAP_CLIENT_SECRET}`,
            },
          }
        );
        const data = await response.json();
        const { area1, area2, area3 } = data.results[0].region;
        const address = `${area1.name} ${area2.name} ${area3.name}`;
        setCurrentAddr(address);
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    };

    fetchAddressData();
  }, [center]);

  const handleCardClick = (estate: RealEstatePreview) => {
    setSelectedEstate(estate); // 선택된 매물 정보 설정
  };

  const navigate = useNavigate();

  return (
    <div className="top-0 absolute pl-4 animate-slideInRight">
      <div className="w-[420px] px-2 pt-2 bg-gray-50/90 absolute backdrop-blur-[10px] left-4 overflow-y-auto h-screen scrollbar-hide">
        <MobileHeader title={currAddr} onBack={() => navigate('/')} />
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center font-bold ml-1">
            <div>{realEstateCount}개의 매물</div>
          </div>
        </div>
        <div className="flex-grow min-h-0 overflow-y-auto">
          {state.result.realEstates.map((item, index) => (
            <div key={index} className="border-b">
              <RealEstateCard
                estate={item}
                isStarFilled={false}
                onClick={() => {
                  handleCardClick(item);
                  setShowRealEstate(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {showRealEstate && selectedEstate && (
        <RealEstateDetail
          realEstate={selectedEstate}
          isStarFilled={false}
          onBackClick={() => setShowRealEstate(false)}
        />
      )}
    </div>
  );
}
