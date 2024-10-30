import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ApartForm from '../../pages/property/form/ApartForm';
import ApartListForm from '../../pages/property/form/ApartListForm';
import CarForm from '../../pages/property/form/CarForm';
import ConfirmLoan from '../../pages/property/form/ConfirmLoan';
import JobForm from '../../pages/property/form/JobForm';
import SalaryForm from '../../pages/property/form/SalaryForm';
import Button from '../atoms/Button';
import CommonBackground from '../atoms/CommonBackground';

interface AssetRegisterProps {
  assetType: 'home' | 'car' | 'job' | 'income';
  onBack: () => void;
}

export default function PropertyForm({
  assetType,
  onBack,
}: AssetRegisterProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [validCarForm, setValidCarForm] = useState(false);
  const [validLoanForm, setValidLoanForm] = useState(false);
  const [validSalaryForm, setValidSalaryForm] = useState(false);

  const handleCarFormNext = (hasCar: boolean) => {
    setValidCarForm(hasCar);
  };

  const handleLoanDecision = (hasLoan: boolean) => {
    setValidLoanForm(hasLoan);
  };

  const handleSalaryFormNext = (hasSalary: boolean) => {
    setValidSalaryForm(hasSalary);
  };

  //아래 주석은 지우면 안됩니다(useEffect 관리 주석)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const forms = [
    { key: 'job', component: <JobForm />, valid: true },
    {
      key: 'income',
      component: <SalaryForm formType="income" onNext={handleSalaryFormNext} />,
      valid: validSalaryForm,
    },
    {
      key: 'car',
      component: <CarForm onNext={handleCarFormNext} />,
      valid: validCarForm,
    },
    {
      key: 'apart',
      component: <ApartForm />,
      valid: true,
    },
    { key: 'apartlist', component: <ApartListForm />, valid: true },
    {
      key: 'loan',
      component: <ConfirmLoan onNext={handleLoanDecision} />,
      valid: validLoanForm,
    },
    {
      key: 'loaninfo',
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
      case 'car':
        return forms.findIndex((form) => form.key === 'car');
      case 'home':
        return forms.findIndex((form) => form.key === 'apart');
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
    <div>
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
