import { useState } from 'react';
import InputLabel from '../../../components/atoms/FormTitle';
import Input from '../../../components/atoms/Input';
import NoItemButton from '../../../components/atoms/NoItemButton';

export default function ApartForm() {
  const [apartmentAddress, setApartmentAddress] = useState('');

  const handleApartmentAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApartmentAddress(event.target.value);
  };

  const handleNoApartmentClick = () => {
    console.log('no Car');
  };

  return (
    <div className="p-4">
      <InputLabel text="아파트 주소를 입력하세요" />
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

      <NoItemButton
        text="보유 부동산이 없어요"
        onClick={handleNoApartmentClick}
      />
    </div>
  );
}
