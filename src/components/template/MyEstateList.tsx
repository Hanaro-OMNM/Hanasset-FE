import { useState } from 'react';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import CommonBackground from '../atoms/CommonBackground';
import SemiTitle from '../atoms/SemiTitle';
import Swiper from '../atoms/Swiper';

interface MyEstateListProps {
  onBack: () => void;
}

const apartments = [
  {
    name: '롯데캐슬엠파이어',
    detail: '105동 1609호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데캐슬엠파이어',
    detail: '105동 1609호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '엠파이어',
    detail: '102동 804호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데캐슬',
    detail: '203동 301호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 444',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 5',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 6',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 7',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 8',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 9',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    name: '롯데엠파 10',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
];
const MAX_SELECTION = 3;

const itemsPerPage = 5;
const slides = Array.from(
  { length: Math.ceil(apartments.length / itemsPerPage) },
  (_, index) =>
    apartments.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
);

export default function MyEstateList({ onBack }: MyEstateListProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(apartments.length).fill(false)
  );

  const handleItemChange = (index: number, checked: boolean) => {
    const selectedCount = checkedItems.filter((item) => item).length;

    if (checked && selectedCount >= MAX_SELECTION) {
      alert(`최대 ${MAX_SELECTION}개까지만 선택 가능합니다.`);
      return;
    }

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <div>
      <div className="mt-5 mb-5 ">
        <SemiTitle>내 관심 매물</SemiTitle>
      </div>
      <CommonBackground>
        <Swiper
          items={slides}
          renderItem={(pageApartments) => (
            <div className="flex flex-col mr-1 ml-1 mb-10">
              {pageApartments.map((apartment, index) => (
                <button
                  key={index}
                  className="w-full items-start rounded-lg hover:transition-transform transform hover:scale-105"
                >
                  <label>
                    <div className="content-center flex p-5">
                      <div className="content-center">
                        <Checkbox
                          aria-label={apartment.name}
                          checked={checkedItems[index]}
                          onChange={(checked) =>
                            handleItemChange(index, checked)
                          }
                        />
                      </div>
                      <div className="pl-7">
                        <div className="text-hanaGreen text-lg text-left">
                          {apartment.name}
                        </div>
                        <div className="text-hanaBlack80 text-sm text-left">
                          {apartment.detail}
                        </div>
                        <div className="text-hanaSilver80 text-xs">
                          {apartment.address}
                        </div>
                      </div>
                    </div>
                    <hr className="ml-3 mr-3" />
                  </label>
                </button>
              ))}
            </div>
          )}
          spaceBetween={30}
          slidesPerView={1}
        />
        <div className="pb-3 pr-3 pl-3">
          <Button onClick={onBack} text="닫기" />
        </div>
      </CommonBackground>
    </div>
  );
}
