import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import { assetState } from '../../recoil/asset/atom';
import { AssetState } from '../../types/hanaAsset';
import AmountForm from '../property/form/AmountForm';
import JobForm from '../property/form/JobForm';
import LoanAmountForm from '../property/form/LoanAmountForm';
import OwnPropertyForm from '../property/form/OwnPropertyForm';

interface FormConfig {
  key: string;
  component: (onBack: () => void) => JSX.Element;
  isUnValid: (state: AssetState) => boolean;
}

const forms: FormConfig[] = [
  {
    key: 'job',
    component: (onBack: () => void) => <JobForm onBack={onBack} />,
    isUnValid: (state: AssetState) => state.jobType === '없음',
  },
  {
    key: 'income',
    component: (onBack: () => void) => (
      <AmountForm formType="income" onBack={onBack} />
    ),
    isUnValid: (state: AssetState) => state.incomeAmount === -1,
  },
  {
    key: 'equity',
    component: (onBack: () => void) => (
      <AmountForm formType="equity" onBack={onBack} />
    ),
    isUnValid: (state: AssetState) => state.equityAmount === -1,
  },
  {
    key: 'home',
    component: (onBack: () => void) => <OwnPropertyForm onBack={onBack} />,
    isUnValid: (state: AssetState) => state.hasHome === null,
  },
  {
    key: 'loan',
    component: (onBack: () => void) => <LoanAmountForm onBack={onBack} />,
    isUnValid: (state: AssetState) => state.hasLoan === null,
  },
];

interface DynamicFormSwitcherProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DynamicFormSwitcher({
  setShowForm,
}: DynamicFormSwitcherProps) {
  const [asset] = useRecoilState<AssetState>(assetState);
  const [currentStep, setCurrentStep] = useState(
    forms.findIndex((form) => form.isUnValid(asset))
  );

  // `asset` 상태가 바뀔 때마다 currentStep을 다시 계산
  useEffect(() => {
    const newCurrentStep = forms.findIndex((form) => form.isUnValid(asset));
    setCurrentStep(newCurrentStep);
  }, [asset]);

  useEffect(() => {
    console.log(`현재 단계: ${currentStep}`);
    if (currentStep < 0) {
      setShowForm(false);
    }
  }, [currentStep]);

  const handleNext = () => {
    let nextStep = currentStep;
    console.log(forms.length);
    console.log(asset);
    console.log(forms[nextStep].isUnValid(asset));

    while (nextStep < forms.length - 1 && !forms[nextStep].isUnValid(asset)) {
      nextStep += 1;
    }

    if (nextStep < forms.length - 1) {
      setCurrentStep(nextStep + 1);
    } else {
      setShowForm(false);
    }
  };

  const CurrentComponent =
    forms[currentStep]?.component || (() => <div>폼이 없습니다.</div>);

  return (
    <div className="animate-fadeInRight pr-5">
      <CommonBackground className="mt-5 mb-10">
        {CurrentComponent(handleNext)}
      </CommonBackground>
    </div>
  );
}
