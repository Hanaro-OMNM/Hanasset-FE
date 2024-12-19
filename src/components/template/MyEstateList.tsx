import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addDetailEstateData } from '../../assets/Dummy.tsx';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import RealEstateDetail from '../../pages/RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from '../../pages/RealEstateList/RealEstateCard.tsx';
import { AdditionalEstate } from '../../types/hanaAsset';

export default function RealEstateLayout() {
  const [selectedEstate, setSelectedEstate] = useState<AdditionalEstate | null>(
    null
  );
  const [showRealEstate, setShowRealEstate] = useState(true);

  const handleCardClick = (estate: AdditionalEstate) => {
    setSelectedEstate(estate);
  };

  const navigate = useNavigate();

  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="w-[420px] px-2 pt-2 bg-gray-50/90 absolute backdrop-blur-[10px] left-4 overflow-y-auto h-screen scrollbar-hide">
        <MobileHeader
          title="내 관심 매물"
          onBack={() => navigate('/my-page')}
        />
        <div className="flex-grow min-h-0 overflow-y-auto">
          {addDetailEstateData.map((item, index) => (
            <div key={index} className="border-b flex">
              <RealEstateCard
                estate={item}
                isStarFilled={true}
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
          isStarFilled={true}
          estate={selectedEstate}
          onBackClick={() => setShowRealEstate(false)}
        />
      )}
    </div>
  );
}
