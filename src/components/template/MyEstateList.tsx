import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import CommonBackground from '../atoms/CommonBackground';
import Swiper from '../atoms/Swiper';

interface MyEstateListProps {
  onBack: () => void;
}

const apartments = [
  {
    id: 1,
    name: '엠파이어1',
    detail: '105동 1609호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 2,
    name: '엠파이어2',
    detail: '105동 1609호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 3,
    name: '엠파이어3',
    detail: '102동 804호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 4,
    name: '엠파이어 4',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 5,
    name: '롯데엠파 5',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 6,
    name: '롯데엠파 6',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 7,
    name: '롯데엠파 7',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 8,
    name: '롯데엠파 8',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 9,
    name: '롯데엠파 9',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 10,
    name: '롯데엠파 10',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 11,
    name: '롯데엠파 11',
    detail: '501동 1702호',
    address: '서울 성수동 아차산로 111',
  },
  {
    id: 12,
    name: '롯데엠파 12',
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
  const navigate = useNavigate();
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
    <div className="animate-fadeInRight">
      <div className="flex h-12 mb-2 pl-1 gap-2 items-center">
        <button className="items-center" onClick={onBack}>
          <IoChevronBack className="text-hanaBlack80 text-xl" />
        </button>
        <h1 className="text-hanaBlack80 text-lg font-fontMedium">
          내 관심 매물
        </h1>
      </div>
      <div className="p-6">
        <CommonBackground>
          <Swiper
            items={slides}
            renderItem={(pageApartments) => (
              <div className="mb-8">
                {pageApartments.map((apartment) => (
                  <button
                    key={apartment.id}
                    className="w-full items-start rounded-lg hover:transition-transform transform hover:scale-105"
                  >
                    <label>
                      <div className="content-center flex p-5">
                        <div className="content-center">
                          <Checkbox
                            aria-label={apartment.name}
                            checked={checkedItems[apartment.id]}
                            onChange={(checked) =>
                              handleItemChange(apartment.id, checked)
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
          <div className="p-2">
            <Button
              onClick={() => navigate('/loan-reservation')}
              text="상담 예약하기"
            />
          </div>
        </CommonBackground>
      </div>
    </div>
  );
}
