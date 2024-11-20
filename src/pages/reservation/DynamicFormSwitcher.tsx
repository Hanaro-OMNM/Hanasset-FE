import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import { assetState } from '../../recoil/asset/atom';
import AmountForm from '../property/form/AmountForm';
import FamilyStatusForm from '../property/form/FamilyStatusForm';
import JobForm from '../property/form/JobForm';
import OwnPropertyForm from '../property/form/OwnPropertyForm';

interface AssetState {
  jobType: string;
  incomeAmount: number;
  equityAmount: number;
  isMarried: boolean;
  hasChildren: boolean;
  hasHome: boolean;
  hasLoan: boolean;
  loanAmount: number;
}

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
    isUnValid: (state: AssetState) => state.incomeAmount === 0,
  },
  {
    key: 'equity',
    component: (onBack: () => void) => (
      <AmountForm formType="equity" onBack={onBack} />
    ),
    isUnValid: (state: AssetState) => state.equityAmount === 0,
  },
  {
    key: 'family',
    component: (onBack: () => void) => <FamilyStatusForm onBack={onBack} />,
    isUnValid: (state: AssetState) =>
      state.isMarried === false && state.hasChildren === false,
  },
  {
    key: 'home',
    component: (onBack: () => void) => <OwnPropertyForm onBack={onBack} />,
    isUnValid: (state: AssetState) => state.hasHome === false,
  },
  {
    key: 'loan',
    component: (onBack: () => void) => (
      <AmountForm formType="loan" onBack={onBack} />
    ),
    isUnValid: (state: AssetState) => state.hasLoan === false,
  },
];

export default function DynamicFormSwitcher() {
  const [asset] = useRecoilState<AssetState>(assetState);
  const [currentStep, setCurrentStep] = useState(
    forms.findIndex((form) => form.isUnValid(asset))
  );
  const nav = useNavigate();

  useEffect(() => {
    console.log(`현재 단계: ${currentStep}`);
  }, [currentStep]);

  const handleNext = () => {
    let nextStep = currentStep;
    console.log(forms.length);

    while (nextStep < forms.length - 1 && !forms[nextStep].isUnValid(asset)) {
      nextStep += 1;
    }

    if (nextStep < forms.length - 1) {
      setCurrentStep(nextStep + 1);
    } else {
      alert('상담이 정상적으로 예약되었습니다.');
      nav('/consulting');
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
