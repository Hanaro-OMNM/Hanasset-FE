import { useState } from 'react';
import ApartForm from '../../pages/property/form/ApartForm';
import ApartListForm from '../../pages/property/form/ApartListForm';
import FamilyStatusForm from '../../pages/property/form/FamilyStatusForm';
import JobForm from '../../pages/property/form/JobForm';
import OwnPropertyForm from '../../pages/property/form/OwnPropertyForm';
import SalaryForm from '../../pages/property/form/SalaryForm';
import Button from '../atoms/Button';
import CommonBackground from '../atoms/CommonBackground';
import SemiTitle from '../atoms/SemiTitle';

interface AssetRegisterProps {
  assetType: 'home' | 'family' | 'job' | 'income' | 'loan';
  onBack: () => void;
}

export default function PropertyForm({
  assetType,
  onBack,
}: AssetRegisterProps) {
  const [isMarried, setIsMarried] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);

  const [validLoanForm, setValidLoanForm] = useState(false);
  const [validSalaryForm, setValidSalaryForm] = useState(false);

  // FamilyStatusForm 컴포넌트에서 전달받은 결혼 여부와 자녀 유무를 업데이트
  const handleFamilyStatusNext = (married: boolean, children: boolean) => {
    setIsMarried(married);
    setHasChildren(children);
  };

  const handleLoanDecision = (hasLoan: boolean) => {
    setValidLoanForm(hasLoan);
  };

  const handleSalaryFormNext = (hasSalary: boolean) => {
    setValidSalaryForm(hasSalary);
  };

  //아래 주석은 지우면 안됩니다(useEffect 관리 주석)
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
      valid: isMarried,
    },
    {
      key: 'apart',
      component: <ApartForm />,
      valid: true,
    },
    { key: 'apartlist', component: <ApartListForm />, valid: true },
    {
      key: 'loan',
      component: <SalaryForm formType="loan" onNext={handleSalaryFormNext} />,
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
        return forms.findIndex((form) => form.key === 'apart');
      case 'loan':
        return forms.findIndex((form) => form.key === 'loan');
      default:
        return 0;
    }
  };

  const [currentStep, setCurrentStep] = useState(getInitialStep(assetType));

  // 다음 폼으로 이동하는 함수
  const handleNextStep = () => {
    const currentForm = forms[currentStep];

    if (currentForm.valid) {
      onBack();
    } else {
      alert('입력을 완료해주세요.');
    }
  };

  return (
    <div className="mt-10">
      <SemiTitle>자산 입력받기</SemiTitle>
      <CommonBackground className="mb-10">
        {forms[currentStep].component}
      </CommonBackground>
      <Button
        text="메인화면으로 돌아가기"
        onClick={handleNextStep}
        version="ver2"
      />
    </div>
  );
}
