import { useState } from 'react';

export default function CarForm() {
  // State to hold the input value
  const [carNumber, setCarNumber] = useState('');

  // Handler to update the state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(event.target.value);
  };

  return (
    <div className="mt-5">
      <h2 className="w-[246.38px] h-[38.27px] text-[#1f2024] text-xl font-extrabold font-['Inter'] tracking-tight text-left">
        자동차 번호를 입력하세요
      </h2>
      {/* 자동차 번호 입력 */}
      <div>
        <input
          type="text"
          value={carNumber} // Bind the input value to state
          onChange={handleInputChange} // Update state on input change
          className="px-5 w-[303px] h-[45px] bg-[#f7f7f7] rounded-[10px] text-gray-700 placeholder-gray-400 border-2 border-transparent focus:border-[#b5b6b6] focus:outline-none"
          placeholder="자동차 번호"
        />

        <div className="w-[310px] h-4 text-[#71727a] text-xs font-normal font-['Inter'] leading-none tracking-tight mt-2">
          7자리나 8자리의 자동차 번호를 알려주세요
        </div>
      </div>

      {/* 보유자동차가 없을 경우 다음 혹은 메인으로 이동 */}
      <div className="mt-8 flex justify-center">
        <div className="w-[143px] h-[18px] text-[#71727a] text-[15px] font-normal font-['Inter'] underline leading-none tracking-tight cursor-pointer">
          보유 자동차가 없어요
        </div>
      </div>
    </div>
  );
}
