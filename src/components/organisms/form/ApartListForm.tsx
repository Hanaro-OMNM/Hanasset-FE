import React, { useState } from 'react';
import FormTitle from '../../atoms/FormTitle';
// Atomic 컴포넌트 FormTitle
import Input from '../../atoms/Input';
// Atomic 컴포넌트 Input
import FormRadio from '../../molecules/FormRadio';

// 제네릭 FormRadio 불러오기

// 아파트 리스트를 위한 타입 정의
interface Apartment {
  name: string;
  info: string;
}

const apartments: Apartment[] = [
  {
    name: '여의도 금호 리첸시아',
    info: '서울특별시 영등포구 여의동로 213',
  },
  {
    name: '삼성동 아이파크',
    info: '서울특별시 강남구 삼성로 512',
  },
  {
    name: '반포 자이',
    info: '서울특별시 서초구 반포대로 100',
  },
];
//aprt선택후 apartmentInfo가 전달되도록 prop을 바꿔야함
// const apartInfoList: Apartment[] = [
//   { name: '18평 (전용 35.93m)', info: '9억 6,000만원' },
//   { name: '18평 (전용 35.93m)', info: '9억 6,000만원' },
//   { name: '18평 (전용 35.93m)', info: '9억 6,000만원' },
//   { name: '18평 (전용 35.93m)', info: '9억 6,000만원' },
// ];

export default function ApartListForm() {
  const [selectedApartment, setSelectedApartment] = useState<Apartment>(
    apartments[0]
  );
  const [apartmentAddress, setApartmentAddress] = useState('');

  const handleApartmentAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApartmentAddress(event.target.value);
  };

  const handleApartmentChange = (selected: Apartment) => {
    setSelectedApartment(selected);
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <div className="w-full">
        <FormTitle text="아파트 주소를 입력하세요" /> {/* 제목 레이블 */}
        <div>
          <Input
            value={apartmentAddress}
            onChange={handleApartmentAddressChange}
            placeholder="아파트 주소"
            name="apartmentAddress"
            className="my-custom-class"
            inputClassName="px-5 w-[303px] h-[45px] bg-[#f7f7f7] rounded-[10px] text-gray-700 placeholder-gray-400 border-2 border-transparent focus:border-[#b5b6b6] focus:outline-none"
          />
        </div>
        <div className="mt-5">
          <FormRadio
            items={apartments}
            label="아파트 선택"
            selectedItem={selectedApartment}
            onChange={handleApartmentChange}
            display={(item) => (
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs ">{item.info}</p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
