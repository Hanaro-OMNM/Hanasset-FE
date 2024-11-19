import { useState } from 'react';
import AmountForm from '../../pages/property/form/AmountForm';
import FamilyStatusForm from '../../pages/property/form/FamilyStatusForm';
import JobForm from '../../pages/property/form/JobForm';
import OwnPropertyForm from '../../pages/property/form/OwnPropertyForm';
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
  const [validAmountForm, setValidAmountForm] = useState(true);

  const handleAmountFormValid = (hasAmount: boolean) => {
    setValidAmountForm(hasAmount);
  };

  const forms = [
    {
      key: 'job',
      component: <JobForm onBack={onBack} />,
      valid: true,
    },
    {
      key: 'income',
      component: (
        <AmountForm
          formType="income"
          onBack={onBack}
          onValid={handleAmountFormValid}
        />
      ),
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
      component: (
        <AmountForm
          formType="loan"
          onValid={handleAmountFormValid}
          onBack={onBack}
        />
      ),
      valid: validAmountForm,
    },
  ];

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

  return (
    <div className="animate-fadeInRight pr-5">
      <MobileHeader title="자산 수정하기" onBack={onBack} />
      <CommonBackground className="mt-5 mb-10">
        {forms[currentStep].component}
      </CommonBackground>
    </div>
  );
}
