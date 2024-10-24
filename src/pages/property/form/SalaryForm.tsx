import React, { useState } from 'react';
import FormTitle from '../../../components/atoms/FormTitle';
import Input from '../../../components/atoms/Input';

interface AssetInfoInputProps {
  formType: 'income' | 'loan'; // 'income' 또는 'loan' 중 하나로 설정
  onNext: (isValid: boolean) => void;
}

const AssetInfoInput: React.FC<AssetInfoInputProps> = ({
  formType,
  onNext,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<boolean>(true);
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
      setErrorMessage('0보다 큰 정수를 입력해주세요.');
      onNext(false);
    } else {
      setError(false);
      setErrorMessage('');
      onNext(true);
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
      />
      <div className="mt-5">
        <Input
          name="amount"
          value={amount}
          onChange={handleChange}
          label={formType === 'income' ? '세전 연소득' : '이미 받은 대출 금액'}
          error={error}
          errorMessage={errorMessage}
          isAmount={true}
          inputClassName="px-5 bg-hanaBlack20 rounded-md placeholder-gray-400 border-2 border-transparent"
        />
      </div>
    </div>
  );
};

export default AssetInfoInput;
