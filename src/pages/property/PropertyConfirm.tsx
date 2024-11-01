import FormTitle from '../../components/atoms/FormTitle';
import RegisterButtonGroup from '../../components/atoms/RegisterPageButtonGroup';

interface PropertyConfirmProps {
  job: string;
  income: string;
  vehicleOwnership: string;
  propertyOwnership: string;
  confirmationDate: string;
}

export default function PropertyConfirm({
  confirmationDate,
}: PropertyConfirmProps) {
  return (
    <div className="bg-white rounded-md p-7 mb-2 shadow-md">
      <FormTitle text="입력한 정보가 맞나요?" />
      <p className="text-gray-500">{confirmationDate}에 입력</p>

      <div className="mt-4">
        <RegisterButtonGroup
          job={''}
          income={''}
          vehicleOwnership={''}
          propertyOwnership={''}
          confirmationDate={''}
          onRegister={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
}
