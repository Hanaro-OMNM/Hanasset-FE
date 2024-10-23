import { useState } from 'react';
import FormInput from '../../atoms/FormInput';
import InputLabel from '../../atoms/InputLabel';
import NoItemButton from '../../atoms/NoItemButton';

export default function ApartForm() {
  const [apartmentAddress, setApartmentAddress] = useState('');

  const handleApartmentAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApartmentAddress(event.target.value);
  };

  const handleNoApartmentClick = () => {
    // 보유 부동산이 없는 경우 처리
    console.log('No apartment button clicked');
  };

  return (
    <div className="mt-5">
      <InputLabel text="아파트 주소를 입력하세요" />
      <div>
        <FormInput
          value={apartmentAddress}
          onChange={handleApartmentAddressChange}
          placeholder="아파트 주소"
        />
      </div>

      <NoItemButton
        text="보유 부동산이 없어요"
        onClick={handleNoApartmentClick}
      />
    </div>
  );
}
