import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import { realEstateData } from '../../assets/Dummy.tsx';
import DropdownCombobox from '../../components/atoms/Dropdown.tsx';
import SemiTitle from '../../components/atoms/SemiTitle.tsx';
import RealEstateCard from './RealEstateCard';

const sortItems = [
  '최신순',
  '낮은가격순',
  '높은가격순',
  '넓은면적순',
  '좁은면적순',
];

export default function RealEstateList() {
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);

  const realEstateCount = 27;

  return (
    <div className="w-[420px] bg-white">
      {/* 위 div는 나중에 메인에 붙이면서 변경 */}
      <div>
        {/* 이건 nav랑 연결되어야 하는 것인가?*/}
        <div className="flex items-center mb-4">
          <FiChevronLeft className="w-[30px] h-[30px] mr-4" />
          <div className="flex-1 text-center">
            <div className="text-black text-2xl font-bold font-['Noto Sans KR'] tracking-tight">
              영등포구 여의도동
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="">
            <SemiTitle>{realEstateCount}개의 매물</SemiTitle>
          </div>
          <DropdownCombobox
            items={sortItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            comboboxClassName="border-gray-300"
            optionClassName="hover:bg-gray-200"
          />
        </div>
        <div className="flex-grow min-h-0 overflow-y-auto">
          {realEstateData.map((item, index) => (
            <RealEstateCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
