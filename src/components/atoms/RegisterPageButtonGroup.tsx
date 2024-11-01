import PropertyItem from '../../pages/property/PropertyItem';
import CommonBackground from './CommonBackground';

interface RegisterButtonGroupProp {
  job: string;
  income: string;
  vehicleOwnership: string;
  propertyOwnership: string;
  confirmationDate: string;
  onRegister: (
    type: 'home' | 'family' | 'main' | 'editProfile' | 'job' | 'income' | 'loan'
  ) => void;
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
        label="연소득"
        value={income}
        onClick={onRegister}
      />
      <hr></hr>
      <PropertyItem
        type="family"
        label="결혼자녀유무"
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
      <hr></hr>
      <PropertyItem
        type="loan"
        label="보유 대출"
        value={propertyOwnership || '없음'}
        onClick={onRegister}
      />
    </CommonBackground>
  );
}
