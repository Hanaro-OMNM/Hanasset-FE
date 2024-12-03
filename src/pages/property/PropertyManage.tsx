import { useState } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import MobileHeader from '../../components/atoms/MobileHeader';
import AmountForm from './form/AmountForm';
import FamilyStatusForm from './form/FamilyStatusForm';
import JobForm from './form/JobForm';
import LoanAmountForm from './form/LoanAmountForm';
import OwnPropertyForm from './form/OwnPropertyForm';

interface AssetRegisterProps {
  assetType:
    | 'home'
    | 'family'
    | 'main'
    | 'editProfile'
    | 'job'
    | 'income'
    | 'loan'
    | 'equity';
  onBack: () => void;
}

export default function PropertyForm({
  assetType,
  onBack,
}: AssetRegisterProps) {
  const [validAmountForm, setValidAmountForm] = useState(true);

  const forms = [
    {
      key: 'job',
      component: <JobForm onBack={onBack} />,
      valid: true,
    },
    {
      key: 'income',
      component: <AmountForm formType="income" onBack={onBack} />,
      valid: validAmountForm,
    },
    {
      key: 'equity',
      component: <AmountForm formType="equity" onBack={onBack} />,
      valid: validAmountForm,
    },
    {
      key: 'family',
      component: <FamilyStatusForm onBack={onBack} />,
      valid: true,
    },
    {
      key: 'home',
      component: <OwnPropertyForm onBack={onBack} />,
      valid: true,
    },
    {
      key: 'loan',
      component: <LoanAmountForm onBack={onBack} />,
      valid: validAmountForm,
    },
  ];

  const getInitialStep = (assetType: AssetRegisterProps['assetType']) => {
    switch (assetType) {
      case 'job':
        return forms.findIndex((form) => form.key === 'job');
      case 'income':
        return forms.findIndex((form) => form.key === 'income');
      case 'equity':
        return forms.findIndex((form) => form.key === 'equity');
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

  return (
    <div className="animate-fadeInRight pr-5">
      <MobileHeader title="자산 수정하기" onBack={onBack} />
      <CommonBackground className="mt-5 mb-10">
        {forms[currentStep].component}
      </CommonBackground>
    </div>
  );
}
