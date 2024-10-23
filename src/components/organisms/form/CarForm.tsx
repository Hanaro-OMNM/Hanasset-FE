import { useState } from 'react';
import FormInput from '../../atoms/FormInput';
import HintText from '../../atoms/HintText';
import InputLabel from '../../atoms/InputLabel';
import NoItemButton from '../../atoms/NoItemButton';

export default function CarForm() {
  const [carNumber, setCarNumber] = useState('');

  const handleCarNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCarNumber(event.target.value);
  };

  const handleNoCarClick = () => {
    // 보유 자동차가 없는 경우 처리
    console.log('No car button clicked');
  };

  return (
    <div className="mt-5">
      <InputLabel text="자동차 번호를 입력하세요" />
      <div>
        <FormInput
          value={carNumber}
          onChange={handleCarNumberChange}
          placeholder="자동차 번호"
        />
        <HintText text="7자리나 8자리의 자동차 번호를 알려주세요" />
      </div>

      <NoItemButton text="보유 자동차가 없어요" onClick={handleNoCarClick} />
    </div>
  );
}
