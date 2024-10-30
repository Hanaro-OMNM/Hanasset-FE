import { FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import { realEstateData } from '../../../assets/Dummy.tsx';
import DropdownCombobox from '../../atoms/Dropdown.tsx';
import SemiTitle from '../../components/atoms/SemiTitle.tsx';
import RealEstateCard from './RealEstateCard.tsx';

const sortItems = [
  '최신순',
  '낮은가격순',
  '높은가격순',
  '넓은면적순',
  '좁은면적순',
];

export default function RealEstateLayout() {
  const [selectedItem, setSelectedItem] = useState(sortItems[0]);

  const realEstateCount = 27;

  return (
    <div className="w-[420px] top-0 absolute pl-2 h-full md:w-2/3 lg:w-1/3 bg-white rounded-xl shadow border-2 p-4 flex flex-col min-h-0">
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
          comboboxClassName="border-gray-300 w-full"
          optionClassName="hover:bg-gray-200"
        />
      </div>
      <div className="flex-grow min-h-0 overflow-y-auto">
        {realEstateData.map((item, index) => (
          <RealEstateCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
