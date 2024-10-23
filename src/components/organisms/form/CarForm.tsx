import { useState } from 'react';
import InputLabel from '../../atoms/FormTitle';
import HintText from '../../atoms/HintText';
import Input from '../../atoms/Input';
import NoItemButton from '../../atoms/NoItemButton';

// Input 컴포넌트 가져오기

export default function CarForm() {
  const [carNumber, setCarNumber] = useState('');

  const handleCarNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCarNumber(event.target.value);
  };

  const handleNoCarClick = () => {
    console.log('No car button clicked');
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <InputLabel text="자동차 번호를 입력하세요" />
      <div className="mt-5">
        <Input
          value={carNumber}
          onChange={handleCarNumberChange}
          placeholder="자동차 번호"
          name="carNumber"
          className="my-custom-class"
          inputClassName="px-5 w-[303px] h-[45px] bg-[#f7f7f7] rounded-[10px] text-gray-700 placeholder-gray-400 border-2 border-transparent focus:border-[#b5b6b6] focus:outline-none"
        />
        <HintText text="7자리나 8자리의 자동차 번호를 알려주세요" />
      </div>
      <NoItemButton text="보유 자동차가 없어요" onClick={handleNoCarClick} />
    </div>
  );
}
