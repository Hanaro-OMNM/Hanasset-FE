import PropertyItem from '../../pages/property/PropertyItem';
import CommonBackground from './CommonBackground';

interface RegisterButtonGroupProp {
  job: string;
  income: string;
  vehicleOwnership: string;
  propertyOwnership: string;
  confirmationDate: string;
  onRegister: (type: 'home' | 'car' | 'job' | 'income') => void;
}

export default function RegisterButtonGroup({
  job,
  income,
  vehicleOwnership,
  propertyOwnership,
  onRegister,
}: RegisterButtonGroupProp) {
  return (
    <CommonBackground className="p-5 bg-gradient-to-r from-white to-hanaGreen20">
      <PropertyItem type="job" label="직업" value={job} onClick={onRegister} />
      <hr></hr>
      <PropertyItem
        type="income"
        label="소득"
        value={income}
        onClick={onRegister}
      />
      <hr></hr>
      <PropertyItem
        type="car"
        label="보유 자동차"
        value={vehicleOwnership || '없음'}
        onClick={onRegister}
      />
      <hr></hr>
      <PropertyItem
        type="home"
        label="보유 주택"
        value={propertyOwnership || '없음'}
        onClick={onRegister}
      />
    </CommonBackground>
  );
}
