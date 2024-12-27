import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import { assetState } from '../../recoil/asset/atom';
import AmountForm from '../property/form/AmountForm';
import JobForm from '../property/form/JobForm';
import LoanAmountForm from '../property/form/LoanAmountForm';
import OwnPropertyForm from '../property/form/OwnPropertyForm';

interface AssetState {
  jobType: string; // 직업 종류
  incomeAmount: number; // 연수입
  equityAmount: number; // 자본금
  hasHome: boolean; // 주택 소유 여부
  hasLoan: boolean; // 대출 여부
  annualInterest: number; // 보유대출 연이자 상환액
  annualPrincipal: number; // 보유대출 연원금 상환액
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
    key: 'home',
    component: (onBack: () => void) => <OwnPropertyForm onBack={onBack} />,
    isUnValid: (state: AssetState) => state.hasHome === false,
  },
  {
    key: 'loan',
    component: (onBack: () => void) => <LoanAmountForm onBack={onBack} />,
    isUnValid: (state: AssetState) => state.hasLoan === false,
  },
];
interface DynamicFormSwitcherProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DynamicFormSwitcher({
  showForm,
  setShowForm,
}: DynamicFormSwitcherProps) {
  const [asset] = useRecoilState<AssetState>(assetState);
  const [currentStep, setCurrentStep] = useState(
    forms.findIndex((form) => form.isUnValid(asset))
  );

  useEffect(() => {
    console.log(`현재 단계: ${currentStep}`);
    if (currentStep < 0) {
      setShowForm(false);
    }
  }, []);

  const handleNext = () => {
    let nextStep = currentStep;
    console.log(forms.length);

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
