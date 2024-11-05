import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { realEstateData } from '../../assets/Dummy.tsx';
import DropdownCombobox from '../../components/atoms/Dropdown.tsx';
import MobileHeader from '../../components/atoms/MobileHeader.tsx';
import RealEstateDetail from '../RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from './RealEstateCard.tsx';

type estateProps = {
  type: string;
  location: string;
  price: string;
  size: string;
  description: string;
  dealType: string;
  imageUrl: string;
};

const sortItems = [
  '최신순',
  '낮은가격순',
  '높은가격순',
  '넓은면적순',
  '좁은면적순',
];

export default function RealEstateLayout() {
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);
  const [selectedEstate, setSelectedEstate] = useState<estateProps | null>(
    null
  ); // 초기값을 null로 설정
  const [showRealEstate, setShowRealEstate] = useState(true);
  const realEstateCount = 27;

  const handleCardClick = (estate: estateProps) => {
    setSelectedEstate(estate); // 선택된 매물 정보 설정
  };

  const navigate = useNavigate();

  return (
    <div className="w-[500px]">
      <div className="top-0 absolute pl-4 animate-slideInRight">
        <div className="w-[420px] px-2 pt-2 bg-white/75 absolute backdrop-blur-[10px] left-4 overflow-y-auto h-screen scrollbar-hide">
          <MobileHeader
            title="영등포구 영등포동"
            onBack={() => navigate('/')}
          />
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center font-bold ml-1">
              <div>{realEstateCount}개의 매물</div>
            </div>
            <DropdownCombobox
              items={sortItems}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              comboboxClassName="border-gray-300 w-[130px] bg-white"
              optionClassName="hover:bg-gray-200"
            />
          </div>
          <div className="flex-grow min-h-0 overflow-y-auto">
            {realEstateData.map((item, index) => (
              <div key={index} className="border-b">
                {/* 카드 클릭 시 handleCardClick 호출 */}
                <RealEstateCard
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
      </div>
      {showRealEstate && selectedEstate && (
        <RealEstateDetail
          estate={selectedEstate}
          onBackClick={() => setShowRealEstate(false)}
        />
      )}
    </div>
  );
}
