import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import Button from '../../../components/atoms/Button';
import FormTitle from '../../../components/atoms/FormTitle';
import Input from '../../../components/atoms/Input';
import NoItemButton from '../../../components/atoms/NoItemButton';
import {
  incomeAmountState,
  loanAmountState,
  hasLoanState,
  equityAmountState, // 자본금 상태 임포트
} from '../../../recoil/asset/atom';

interface AssetInfoInputProps {
  formType: 'income' | 'loan' | 'equity'; // equity 타입 추가
  onValid: (isValid: boolean) => void;
  onBack: () => void;
}

export default function AmountForm({
  formType,
  onValid,
  onBack,
}: AssetInfoInputProps) {
  const [incomeAmount, setIncomeAmount] = useRecoilState(incomeAmountState);
  const [loanAmount, setLoanAmount] = useRecoilState(loanAmountState);
  const [hasLoan, setHasLoan] = useRecoilState(hasLoanState);
  const [equityAmount, setEquityAmount] = useRecoilState(equityAmountState); // 자본금 상태 추가

  const initialAmount =
    formType === 'income'
      ? incomeAmount
      : formType === 'loan'
        ? loanAmount
        : equityAmount; // formType에 따라 자본금 상태도 처리

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

    // 입력값이 빈 문자열일 경우 0으로 설정
    if (value === '') {
      setLocalAmount(0);
      setError(false);
      setErrorMessage('');
      setIsValid(false);
      onValid(false);
    } else {
      const numericValue = Number(value);

      if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
        setError(true);
        setErrorMessage('정수를 입력해주세요.');
        setIsValid(false);
        onValid(false);
      } else if (numericValue <= 0) {
        setError(true);
        setErrorMessage('0보다 큰 값을 입력해주세요.');
        setIsValid(false);
        onValid(false);
      } else {
        setError(false);
        setErrorMessage('');
        setIsValid(true);
        setLocalAmount(numericValue);
        onValid(true);
      }
    }
  };

  // 대출이 없을 때 처리
  const handleNoLoan = () => {
    setLocalAmount(0);
    setHasLoan(false);
    setLoanAmount(0);
    onBack();
  };

  // 자본금이 없을 때 처리
  const handleNoEquity = () => {
    setLocalAmount(0);
    setEquityAmount(0);
    onBack();
  };

  const handleSave = () => {
    if (localAmount === 0) {
      setIsValid(false);
    }

    if (isValid) {
      if (formType === 'income') {
        setIncomeAmount(localAmount);
      } else if (formType === 'loan') {
        setLoanAmount(localAmount);
        setHasLoan(localAmount > 0);
      } else {
        setEquityAmount(localAmount); // 자본금 상태 업데이트
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
              : '자본금을 입력해주세요' // equity 타입일 때 텍스트 변경
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
                : '자본금 금액' // equity 타입일 때 라벨 변경
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

      {/* 자본금이 없을 경우 버튼 추가 */}
      {formType === 'equity' && (
        <NoItemButton text={'보유 자본금이 없어요'} onClick={handleNoEquity} />
      )}
    </div>
  );
}
