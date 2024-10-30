import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import { realEstateData } from '../../../assets/Dummy.tsx';
import RealEstateDetail from '../../../pages/RealEstateDetail/RealEstateDetail.tsx';
import DropdownCombobox from '../../atoms/Dropdown.tsx';
import SemiTitle from '../../atoms/SemiTitle.tsx';
import RealEstateCard from './RealEstateCard.tsx';

const sortItems = [
  '최신순',
  '낮은가격순',
  '높은가격순',
  '넓은면적순',
  '좁은면적순',
];

interface RealEstateLayoutProps {
  onBackClick: () => void;
}

export default function RealEstateLayout({
  onBackClick,
}: RealEstateLayoutProps) {
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);
  const [selectedEstate, setSelectedEstate] = useState(null); // 선택된 매물 상태 추가
  const [showRealEstate, setShowRealEstate] = useState(true);
  const realEstateCount = 27;

  const handleCardClick = (estate: any) => {
    setSelectedEstate(estate); // 선택된 매물 정보 설정
  };

  console.log(showRealEstate);

  return (
    <>
      <div className="w-[420px] top-0 left-2 absolute h-full bg-white/75 backdrop-blur-[10px] p-4 flex flex-col min-h-0">
        <div className="flex items-center mb-4">
          <button onClick={onBackClick}>
            <FiChevronLeft className="w-[30px] h-[30px] mr-4" />
          </button>
          <div className="flex-1 text-center mr-4">
            <div className="text-black text-xl font-bold font-['Noto Sans KR'] tracking-tight">
              영등포구 여의도동
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center">
            <SemiTitle>{realEstateCount}개의 매물</SemiTitle>
          </div>
          <DropdownCombobox
            items={sortItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            comboboxClassName="border-gray-300 w-[130px] bg-white/75 backdrop-blur-[10px]"
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
      {showRealEstate && selectedEstate && (
        <RealEstateDetail
          estate={selectedEstate}
          onBackClick={() => setShowRealEstate(false)}
        />
      )}
    </>
  );
}
