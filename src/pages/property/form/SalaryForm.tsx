import React, { useState } from 'react';
import FormTitle from '../../atoms/FormTitle';
import Input from '../../atoms/Input';

interface AssetInfoInputProps {
  formType: 'income' | 'loan'; // 'income' 또는 'loan' 중 하나로 설정
}

const AssetInfoInput: React.FC<AssetInfoInputProps> = ({ formType }) => {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);

    // 유효성 검사: 0보다 큰 정수인지 확인
    const numericValue = Number(value);
    if (
      isNaN(numericValue) ||
      numericValue <= 0 ||
      !Number.isInteger(numericValue)
    ) {
      setError(true);
      setErrorMessage('0보다 큰 정수를 입력해주세요.'); // 에러 메시지 설정
    } else {
      setError(false);
      setErrorMessage('');
    }
  };

  return (
    <div className="p-4">
      <FormTitle
        text={
          formType === 'income'
            ? '소득정보를 입력하세요'
            : '이미 받은 대출은 얼마인가요?'
        }
      />{' '}
      {/* 제목 레이블 */}
      <div className="mt-5">
        <Input
          name="amount"
          value={amount}
          onChange={handleChange}
          label={formType === 'income' ? '세전 연소득' : '이미 받은 대출 금액'} // 레이블 변경
          error={error}
          errorMessage={errorMessage} // 에러 메시지 prop 전달
          isAmount={true} // 금액 여부 설정
          inputClassName="px-5 w-[270px] h-[45px] bg-[#f7f7f7] rounded-[10px] text-gray-700 placeholder-gray-400 border-2 border-transparent focus:border-[#b5b6b6] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default AssetInfoInput;
