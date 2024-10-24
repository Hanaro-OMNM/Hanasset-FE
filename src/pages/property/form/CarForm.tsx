import { useState } from 'react';
import InputLabel from '../../../components/atoms/FormTitle';
import HintText from '../../../components/atoms/HintText';
import Input from '../../../components/atoms/Input';
import NoItemButton from '../../../components/atoms/NoItemButton';

interface CarFormProps {
  onNext: (hasCar: boolean) => void;
}

export default function CarForm({ onNext }: CarFormProps) {
  const [carNumber, setCarNumber] = useState<string>('');
  const [error, setError] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      onNext(false);
    } else {
      setError(false);
      setErrorMessage('');
      onNext(true);
    }
  };

  const handleNoCarClick = () => {
    console.log('no car');
  };

  return (
    <div className="p-4">
      <InputLabel text="자동차 번호를 입력하세요" />
      <div className="mt-5">
        <Input
          value={carNumber}
          onChange={handleCarNumberChange}
          placeholder="자동차 번호"
          name="carNumber"
          error={error}
          errorMessage={errorMessage}
          className="my-custom-class"
          inputClassName="px-5 bg-hanaBlack20 rounded-md placeholder-gray-400 border-2 border-transparent "
        />
        <HintText text="7자리나 8자리의 자동차 번호를 알려주세요(공백없음)" />
      </div>
      <NoItemButton text="보유 자동차가 없어요" onClick={handleNoCarClick} />
    </div>
  );
}
