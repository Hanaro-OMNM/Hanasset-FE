import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import FormLayout from '../../components/template/FormLayout';
import ApartForm from './form/ApartForm';
import ApartListForm from './form/ApartListForm';
import FamilyStatusForm from './form/FamilyStatusForm';
import JobForm from './form/JobForm';
import OwnPropertyForm from './form/OwnPropertyForm';
import SalaryForm from './form/SalaryForm';

export default function PropertyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [validCarForm, setValidCarForm] = useState(false);
  const [validLoanForm, setValidLoanForm] = useState(false);
  const [validSalaryForm, setValidSalaryForm] = useState(false);

  // 다음 폼으로 이동하는 함수
  const handleNextStep = () => {
    const currentForm = forms[currentStep];

    if (currentForm.valid) {
      // valid가 true일 경우 다음 단계로 넘어감
      if (currentStep < forms.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        const nextStepKey = forms[nextStep].key;
        navigate(`?funnel-step=${nextStepKey}`);
      }
    } else {
      // valid가 false일 경우 알림 띄움
      alert('입력을 완료해주세요.');
    }
  };

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
      component: <FamilyStatusForm onNext={handleCarFormNext} />,
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
      component: <OwnPropertyForm onNext={handleLoanDecision} />,
      valid: validLoanForm,
    },
    {
      key: 'loaninfo',
      component: <SalaryForm formType="loan" onNext={handleSalaryFormNext} />,
      valid: validSalaryForm,
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const step = queryParams.get('funnel-step');

    const stepIndex = forms.findIndex((form) => form.key === step);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    } else {
      setCurrentStep(0);
    }
  }, [forms, location]);

  return (
    <FormLayout>
      <div className="bg-white rounded-md p-3 min-h-[90vh] mb-2 shadow-md">
        {forms[currentStep].component}
      </div>
      <Button text="다음으로" version="ver1" onClick={handleNextStep} />
    </FormLayout>
  );
}
