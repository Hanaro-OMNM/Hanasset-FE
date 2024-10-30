import { useNavigate } from 'react-router-dom';
import FormTitle from '../../components/atoms/FormTitle';
import RegisterButtonGroup from '../../components/atoms/RegisterPageButtonGroup';
import PropertyItem from './PropertyItem';

interface PropertyConfirmProps {
  job: string;
  income: string;
  vehicleOwnership: string;
  propertyOwnership: string;
  confirmationDate: string;
}

export default function PropertyConfirm({
  job,
  income,
  vehicleOwnership,
  propertyOwnership,
  confirmationDate,
}: PropertyConfirmProps) {
  const navigate = useNavigate();
  const handleEditJob = () => {
    navigate('/property-form?funnel-step=job');
  };

  const handleEditIncome = () => {
    navigate('/property-form?funnel-step=income');
  };

  const handleEditVehicle = () => {
    navigate('/property-form?funnel-step=car');
  };

  const handleEditProperty = () => {
    navigate('/property-form?funnel-step=apart');
  };

  return (
    <div className="bg-white rounded-md p-7 min-h-[90vh] mb-2 shadow-md">
      <FormTitle text="입력한 정보가 맞나요?" />
      <p className="text-gray-500">{confirmationDate}에 입력</p>

      <div className="mt-4">
        <RegisterButtonGroup
          job={''}
          income={''}
          vehicleOwnership={''}
          propertyOwnership={''}
          confirmationDate={''}
          onRegister={function (
            type: 'home' | 'family' | 'job' | 'income' | 'loan'
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
}
