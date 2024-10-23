import { useState } from 'react';
import InputLabel from '../../atoms/FormTitle';
import HintText from '../../atoms/HintText';
import Input from '../../atoms/Input';
import NoItemButton from '../../atoms/NoItemButton';

export default function CarForm() {
  const [carNumber, setCarNumber] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCarNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCarNumber(value);

    // 유효성 검사: 7자리 또는 8자리의 자동차 번호 (숫자와 알파벳 혼합)
    const isValid =
      /^[0-9]{3}[가-힣]{1}[0-9]{4}$|^[0-9]{2}[가-힣]{1}[0-9]{5}$/.test(value);
    if (!isValid) {
      setError(true);
      setErrorMessage('7자리나 8자리의 자동차 번호를 알려주세요.');
    } else {
      setError(false);
      setErrorMessage('');
    }
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
          error={error}
          errorMessage={errorMessage} // 에러 메시지 prop 전달
          className="my-custom-class"
          inputClassName="px-5 w-[303px] h-[45px] bg-[#f7f7f7] rounded-[10px] text-gray-700 placeholder-gray-400 border-2 border-transparent focus:border-[#b5b6b6] focus:outline-none"
        />
        <HintText text="7자리나 8자리의 자동차 번호를 알려주세요(공백없음)" />
      </div>
      <NoItemButton text="보유 자동차가 없어요" onClick={handleNoCarClick} />
    </div>
  );
}
