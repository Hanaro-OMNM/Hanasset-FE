import React, { useState } from 'react';
import FormTitle from '../../../components/atoms/FormTitle';
import Input from '../../../components/atoms/Input';
import NoItemButton from '../../../components/atoms/NoItemButton';

interface AssetInfoInputProps {
  formType: 'income' | 'loan';
  onNext: (isValid: boolean) => void;
  onBack?: () => void;
}

const AssetInfoInput: React.FC<AssetInfoInputProps> = ({
  formType,
  onNext,
  onBack,
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
    <div className="p-8">
      <FormTitle
        text={
          formType === 'income'
            ? '소득정보를 입력하세요'
            : '이미 받은 대출은 얼마인가요?'
        }
      />

      <div className="mt-10">
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
      {formType === 'loan' && (
        <NoItemButton text={'보유 대출이 없어요'} onClick={onBack} />
      )}
    </div>
  );
};

export default AssetInfoInput;
