import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import { realEstateData } from '../../assets/Dummy.tsx';
import DropdownCombobox from '../../components/atoms/Dropdown.tsx';
import SemiTitle from '../../components/atoms/SemiTitle.tsx';
import RealEstateDetail from '../../pages/RealEstateDetail/RealEstateDetail.tsx';
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

interface RealEstateLayoutProps {
  onBackClick: () => void;
}

export default function RealEstateLayout({
  onBackClick,
}: RealEstateLayoutProps) {
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);
  const [selectedEstate, setSelectedEstate] = useState<estateProps | null>(
    null
  ); // 초기값을 null로 설정
  const [showRealEstate, setShowRealEstate] = useState(true);
  const realEstateCount = 27;

  const handleCardClick = (estate: estateProps) => {
    setSelectedEstate(estate); // 선택된 매물 정보 설정
  };

  return (
    <>
      <div className="w-[500px]">
        <div className="top-0 absolute pl-4 animate-fadeInRight">
          <div className="w-[420px] backdrop-blur-[10px] h-svh p-4 overflow-y-auto bg-white/75 scrollbar-hide">
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
          {showRealEstate && selectedEstate && (
            <RealEstateDetail
              estate={selectedEstate}
              onBackClick={() => setShowRealEstate(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}
