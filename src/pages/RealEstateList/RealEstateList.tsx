import { FiChevronLeft } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { realEstateData } from '../../assets/Dummy.tsx';
import DropdownCombobox from '../../components/atoms/Dropdown.tsx';
import SemiTitle from '../../components/atoms/SemiTitle.tsx';
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
    <div className="w-430">
      <div className="top-0 absolute pl-2">
        <div className="w-430 max-w-[430px] h-svh bg-white/75 backdrop-blur-[10px] overflow-y-auto">
          {/* 헤더 */}
          <div className="w-430 max-w-[430px] h-16 fixed top-0 bg-white border-b-4 border-gray-200 z-10 px-4 py-2 flex items-center">
            <button className="items-center" onClick={() => navigate('/')}>
              <IoChevronBack className="text-hanaBlack80 text-xl mr-10" />
            </button>
            <h1 className="text-hanaBlack80 text-lg font-semibold ">
              맞춤 대출 상품 안내
            </h1>
          </div>

          <div className="flex justify-between items-center my-2 px-5 pt-20">
            <div className="flex items-center font-bold ">
              <SemiTitle>{realEstateCount}개의 매물</SemiTitle>
            </div>
            <DropdownCombobox
              items={sortItems}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              comboboxClassName="border-gray-300 w-[130px] bg-white/75"
              optionClassName="hover:bg-gray-200"
            />
          </div>

          <div className="flex-grow min-h-0 overflow-y-auto px-2">
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
  );
}
