import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import Button from '../../../components/atoms/Button';
import FormTitle from '../../../components/atoms/FormTitle';
import Input from '../../../components/atoms/Input';
import NoItemButton from '../../../components/atoms/NoItemButton';
import { assetState } from '../../../recoil/asset/atom';

interface AssetInfoInputProps {
  formType: 'income' | 'loan' | 'equity';
  onBack: () => void;
}

export default function AmountForm({ formType, onBack }: AssetInfoInputProps) {
  const [asset, setAsset] = useRecoilState(assetState); // Accessing assetState atom

  // Get values from assetState
  const incomeAmount = asset.incomeAmount;
  const loanAmount = asset.loanAmount;
  const equityAmount = asset.equityAmount;
  const hasLoan = asset.hasLoan;

  const initialAmount =
    formType === 'income'
      ? incomeAmount
      : formType === 'loan'
        ? loanAmount
        : equityAmount;

  const [localAmount, setLocalAmount] = useState<number>(initialAmount);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(localAmount > 0);

  useEffect(() => {
    if (formType === 'income') {
      setLocalAmount(incomeAmount);
    } else if (formType === 'loan') {
      setLocalAmount(loanAmount);
    } else {
      setLocalAmount(equityAmount);
    }
  }, [incomeAmount, loanAmount, equityAmount, formType]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Handle empty string input
    if (value === '') {
      setLocalAmount(0);
      setError(false);
      setErrorMessage('');
      setIsValid(false);
    } else {
      const numericValue = Number(value);

      if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
        setError(true);
        setErrorMessage('정수를 입력해주세요.');
        setIsValid(false);
      } else if (numericValue <= 0) {
        setError(true);
        setErrorMessage('0보다 큰 값을 입력해주세요.');
        setIsValid(false);
      } else {
        setError(false);
        setErrorMessage('');
        setIsValid(true);
        setLocalAmount(numericValue);
      }
    }
  };

  const handleNoLoan = () => {
    setLocalAmount(0);
    setAsset({ ...asset, hasLoan: false, loanAmount: 0 });
    onBack();
  };

  const handleNoEquity = () => {
    setLocalAmount(0);
    setAsset({ ...asset, equityAmount: 0 });
    onBack();
  };

  const handleSave = () => {
    if (localAmount === 0) {
      setIsValid(false);
    }

    if (isValid) {
      if (formType === 'income') {
        setAsset({ ...asset, incomeAmount: localAmount });
      } else if (formType === 'loan') {
        setAsset({
          ...asset,
          loanAmount: localAmount,
          hasLoan: localAmount > 0,
        });
      } else {
        setAsset({ ...asset, equityAmount: localAmount });
      }
      onBack();
    } else {
      alert('입력값을 올바르게 작성해주세요');
    }
  };

  return (
    <div className="p-8">
      <FormTitle
        text={
          formType === 'income'
            ? '소득정보를 입력하세요'
            : formType === 'loan'
              ? '이미 받은 대출은 얼마인가요?'
              : '자본금을 입력해주세요'
        }
      />

      <div className="mt-10">
        <Input
          name="amount"
          value={localAmount.toString()}
          onChange={handleChange}
          label={
            formType === 'income'
              ? '세전 연소득'
              : formType === 'loan'
                ? '이미 받은 대출 금액'
                : '자본금 금액'
          }
          error={error}
          errorMessage={errorMessage}
          isAmount={true}
          inputClassName="px-5 bg-hanaBlack20 rounded-md placeholder-gray-400 border-2 border-transparent"
        />
      </div>
      <div className="w-full mt-8">
        <Button text="저장" onClick={handleSave} version="ver1" />
      </div>

      {formType === 'loan' && (
        <NoItemButton text={'보유 대출이 없어요'} onClick={handleNoLoan} />
      )}

      {formType === 'equity' && (
        <NoItemButton text={'보유 자본금이 없어요'} onClick={handleNoEquity} />
      )}
    </div>
  );
}