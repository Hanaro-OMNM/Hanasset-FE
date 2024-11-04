import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import PropertyConfirm from './PropertyConfirm';

const TestPropertyConfirm = () => {
  const navigate = useNavigate();

  const testJob = '소프트웨어 엔지니어';
  const testIncome = '5,000만원';
  const testVehicleOwnership = '자동차 있음';
  const testPropertyOwnership = '아파트 소유';
  const testConfirmationDate = '2024년 10월 23일';

  const handleSubmit = () => {
    console.log('대출 추천 요청이 완료되었습니다.');
    navigate('/some-other-page');
  };

  return (
    <div>
      <PropertyConfirm
        job={testJob}
        income={testIncome}
        vehicleOwnership={testVehicleOwnership}
        propertyOwnership={testPropertyOwnership}
        confirmationDate={testConfirmationDate}
      />
      <Button text="대출 추천 받기" onClick={handleSubmit} />
    </div>
  );
};

export default TestPropertyConfirm;
