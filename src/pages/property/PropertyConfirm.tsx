import React from 'react';
import Button from '../../components/atoms/Button';
import FormTitle from '../../components/atoms/FormTitle';
import PropertyItem from '../property/PropertyItem';

// PropertyItem 컴포넌트 import

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
        <PropertyItem label="보유 자동차" value={vehicleOwnership} />
        <PropertyItem label="보유 주택" value={propertyOwnership} />
      </div>

      <Button text="대출 추천 받기" />
    </div>
  );
};

export default PropertyConfirm;
