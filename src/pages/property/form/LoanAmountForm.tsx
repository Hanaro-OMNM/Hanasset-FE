import { useRecoilState } from 'recoil';
import React, { useState, useEffect } from 'react';
import Button from '../../../components/atoms/Button';
import FormTitle from '../../../components/atoms/FormTitle';
import Input from '../../../components/atoms/Input';
import NoItemButton from '../../../components/atoms/NoItemButton';
import { assetState } from '../../../recoil/asset/atom';

interface AssetInfoInputProps {
  onBack: () => void;
}

export default function LoanAmountForm({ onBack }: AssetInfoInputProps) {
  const [asset, setAsset] = useRecoilState(assetState);
  const { annualInterest, annualPrincipal, hasLoan } = asset;

  const [localAnnualInterest, setLocalAnnualInterest] =
    useState<number>(annualInterest);
  const [localAnnualPrincipal, setLocalAnnualPrincipal] =
    useState<number>(annualPrincipal);

  const [interestError, setInterestError] = useState<boolean>(false);
  const [interestErrorMessage, setInterestErrorMessage] = useState<string>('');

  const [principalError, setPrincipalError] = useState<boolean>(false);
  const [principalErrorMessage, setPrincipalErrorMessage] =
    useState<string>('');

  useEffect(() => {
    setLocalAnnualInterest(annualInterest);
    setLocalAnnualPrincipal(annualPrincipal);
  }, [annualInterest, annualPrincipal]);

  const validateInput = (
    value: string,
    fieldName: 'interest' | 'principal'
  ): number | null => {
    const numericValue = Number(value);

    if (value === '') {
      if (fieldName === 'interest') {
        setInterestError(false);
        setInterestErrorMessage('');
      } else {
        setPrincipalError(false);
        setPrincipalErrorMessage('');
      }
      return 0; // 빈 값은 기본값 0 처리
    }

    if (isNaN(numericValue) || numericValue < 0) {
      const errorMessage =
        fieldName === 'interest'
          ? '이자는 0 이상의 숫자여야 합니다.'
          : '원금은 0 이상의 정수여야 합니다.';

      if (fieldName === 'interest') {
        setInterestError(true);
        setInterestErrorMessage(errorMessage);
      } else {
        setPrincipalError(true);
        setPrincipalErrorMessage(errorMessage);
      }
      return null;
    }

    if (fieldName === 'principal' && !Number.isInteger(numericValue)) {
      setPrincipalError(true);
      setPrincipalErrorMessage('원금은 정수만 입력 가능합니다.');
      return null;
    }

    if (fieldName === 'interest') {
      setInterestError(false);
      setInterestErrorMessage('');
    } else {
      setPrincipalError(false);
      setPrincipalErrorMessage('');
    }

    return numericValue;
  };

  const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = validateInput(value, 'interest');

    if (numericValue !== null) {
      setLocalAnnualInterest(numericValue);
    }
  };

  const handlePrincipalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const numericValue = validateInput(value, 'principal');

    if (numericValue !== null) {
      setLocalAnnualPrincipal(numericValue);
    }
  };

  const handleNoLoan = () => {
    setLocalAnnualInterest(0);
    setLocalAnnualPrincipal(0);
    setAsset({
      ...asset,
      hasLoan: false,
      annualInterest: 0,
      annualPrincipal: 0,
    });
    onBack();
  };

  const handleSave = () => {
    //논의 필요
    /* 둘 중 하나만 0인 경우 에러 처리 */
    if (
      (localAnnualInterest === 0 && localAnnualPrincipal > 0) ||
      (localAnnualInterest > 0 && localAnnualPrincipal === 0)
    ) {
      alert(
        '연이자 상환액과 연원금 상환액은 동시에 존재하거나 둘 다 0이어야 합니다.'
      );
      return;
    }

    if (
      !interestError &&
      !principalError &&
      (localAnnualInterest > 0 || localAnnualPrincipal > 0)
    ) {
      setAsset({
        ...asset,
        hasLoan: true,
        annualInterest: localAnnualInterest,
        annualPrincipal: localAnnualPrincipal,
      });
      onBack();
    } else {
      alert('입력값을 올바르게 작성해주세요');
    }
  };

  return (
    <div className="p-8">
      <FormTitle text="보유 대출에 대한 정보를 입력해주세요" />

      <div className="mt-10">
        <Input
          name="annualInterest"
          value={localAnnualInterest.toString()}
          onChange={handleInterestChange}
          label="보유 대출 연이자 상환액"
          error={interestError}
          errorMessage={interestErrorMessage}
          isAmount={true}
          inputClassName="px-5 bg-hanaBlack20 rounded-md placeholder-gray-400 border-2 border-transparent"
        />
      </div>
      <div className="mt-4">
        <Input
          name="annualPrincipal"
          value={localAnnualPrincipal.toString()}
          onChange={handlePrincipalChange}
          label="보유 대출 연원금 상환액"
          error={principalError}
          errorMessage={principalErrorMessage}
          isAmount={true}
          inputClassName="px-5 bg-hanaBlack20 rounded-md placeholder-gray-400 border-2 border-transparent"
        />
      </div>
      <div className="w-full mt-8">
        <Button text="저장" onClick={handleSave} version="ver1" />
      </div>

      <NoItemButton text="보유 대출이 없어요" onClick={handleNoLoan} />
    </div>
  );
}
