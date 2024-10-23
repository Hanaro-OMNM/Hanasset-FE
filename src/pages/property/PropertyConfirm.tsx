import React from 'react';
import Button from '../../components/atoms/Button';
import FormTitle from '../../components/atoms/FormTitle';
import PropertyItem from '../property/PropertyItem';

interface PropertyConfirmProps {
  job: string;
  income: string;
  vehicleOwnership: string;
  propertyOwnership: string;
  confirmationDate: string;
}

const PropertyConfirm: React.FC<PropertyConfirmProps> = ({
  job,
  income,
  vehicleOwnership,
  propertyOwnership,
  confirmationDate,
}) => {
  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
      <FormTitle text="입력한 정보가 맞나요?" />
      <p className="text-gray-500">{confirmationDate}에 입력</p>

      <div className="mt-4">
        <PropertyItem label="직업" value={job} />
        <PropertyItem label="소득" value={income} />
        <PropertyItem label="보유 자동차" value={vehicleOwnership || '없음'} />
        <PropertyItem label="보유 주택" value={propertyOwnership || '없음'} />
      </div>
      <Button text="대출 추천 받기" />
    </div>
  );
};

// 자체적으로 값을 대입해 테스트할 수 있는 컴포넌트(임시 test코드-삭제 예정)
const TestPropertyConfirm = () => {
  // 테스트 데이터
  const testJob = '소프트웨어 엔지니어';
  const testIncome = '5,000만원';
  const testVehicleOwnership = '자동차 있음';
  const testPropertyOwnership = '아파트 소유';
  const testConfirmationDate = '2024년 10월 23일';

  return (
    <PropertyConfirm
      job={testJob}
      income={testIncome}
      vehicleOwnership={testVehicleOwnership}
      propertyOwnership={testPropertyOwnership}
      confirmationDate={testConfirmationDate}
    />
  );
};

export default TestPropertyConfirm;
