import React, { useState } from 'react';
import ApartListForm from '../../pages/property/form/ApartListForm';
import FamilyStatusForm from '../../pages/property/form/FamilyStatusForm';
import JobForm from '../../pages/property/form/JobForm';
import OwnPropertyForm from '../../pages/property/form/OwnPropertyForm';
import SalaryForm from '../../pages/property/form/SalaryForm';
import Button from '../atoms/Button';
import CommonBackground from '../atoms/CommonBackground';
import MobileHeader from '../atoms/MobileHeader';

interface AssetRegisterProps {
  assetType:
    | 'home'
    | 'family'
    | 'main'
    | 'editProfile'
    | 'job'
    | 'income'
    | 'loan';
  onBack: () => void;
}

export default function PropertyForm({
  assetType,
  onBack,
}: AssetRegisterProps) {
  const [isMarried, setIsMarried] = useState(true);
  const [hasChildren, setHasChildren] = useState(true);

  const [validLoanForm, setValidLoanForm] = useState(false);
  const [validSalaryForm, setValidSalaryForm] = useState(false);

  const handleFamilyStatusNext = (married: boolean, children: boolean) => {
    console.log(isMarried);
    console.log(hasChildren);
    setIsMarried(married);
    setHasChildren(children);
  };

  //아직 의미 x 함수 (수정 예정)
  const handleLoanDecision = (hasLoan: boolean) => {
    console.log(validLoanForm);
    setValidLoanForm(hasLoan);
  };

  const handleSalaryFormNext = (hasSalary: boolean) => {
    setValidSalaryForm(hasSalary);
  };

  const forms = [
    { key: 'job', component: <JobForm />, valid: true },
    {
      key: 'income',
      component: <SalaryForm formType="income" onNext={handleSalaryFormNext} />,
      valid: validSalaryForm,
    },
    {
      key: 'family',
      component: <FamilyStatusForm onNext={handleFamilyStatusNext} />,
      valid: true,
    },
    {
      key: 'home',
      component: <OwnPropertyForm onNext={handleLoanDecision} />,
      valid: true,
    },
    { key: 'apartlist', component: <ApartListForm />, valid: true },
    {
      key: 'loan',
      component: (
        <SalaryForm
          formType="loan"
          onNext={handleSalaryFormNext}
          onBack={onBack}
        />
      ),
      valid: validSalaryForm,
    },
  ];

  // assetType에 따라 currentStep의 초기 값을 설정
  const getInitialStep = (assetType: AssetRegisterProps['assetType']) => {
    switch (assetType) {
      case 'job':
        return forms.findIndex((form) => form.key === 'job');
      case 'income':
        return forms.findIndex((form) => form.key === 'income');
      case 'family':
        return forms.findIndex((form) => form.key === 'family');
      case 'home':
        return forms.findIndex((form) => form.key === 'home');
      case 'loan':
        return forms.findIndex((form) => form.key === 'loan');
      default:
        return 0;
    }
  };

  const [currentStep, setCurrentStep] = useState(getInitialStep(assetType));

  const handleNextStep = () => {
    const currentForm = forms[currentStep];

    //의미 없는 코드(오류방지용)
    setCurrentStep(getInitialStep(assetType));

    if (currentForm.valid) {
      onBack();
    } else {
      alert('입력을 완료해주세요.');
    }
  };

  return (
    <div className="px-5 animate-fadeInRight">
      <MobileHeader title="자산 수정하기" onBack={onBack} />
      <CommonBackground className="mt-5 mb-10">
        {forms[currentStep].component}
        <div className="px-5 pb-5">
          <Button text="저장" onClick={handleNextStep} version="ver1" />
        </div>
      </CommonBackground>
    </div>
  );
}
