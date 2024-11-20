import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { realEstateData } from '../../assets/Dummy.tsx';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import RealEstateDetail from '../../pages/RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from '../../pages/RealEstateList/RealEstateCard.tsx';

type estateProps = {
  type: string;
  location: string;
  price: string;
  size: string;
  description: string;
  dealType: string;
  imageUrl: string;
};

export default function RealEstateLayout() {
  const [selectedEstate, setSelectedEstate] = useState<estateProps | null>(
    null
  );
  const [showRealEstate, setShowRealEstate] = useState(true);

  const handleCardClick = (estate: estateProps) => {
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
          {realEstateData.map((item, index) => (
            <div key={index} className="border-b flex">
              <RealEstateCard
                isStarFilled={true}
                {...item}
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
