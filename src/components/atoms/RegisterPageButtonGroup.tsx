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
    <CommonBackground className="bg-white pl-5 pr-5">
      <PropertyItem
        type="job"
        label="직업"
        value={job}
        onClick={onRegister}
        labelClassName="bg-[#E0FBF5] p-1 rounded-lg"
        labelColorClassName="text-[#00CC9C] font-fontBold w-20"
      />
      <hr></hr>
      <PropertyItem
        type="income"
        label="연소득"
        value={income}
        onClick={onRegister}
        labelClassName="bg-[#F9F1EC] p-1 rounded-lg"
        labelColorClassName="text-hanaRed60 font-fontBold w-24"
      />
      <hr></hr>
      <PropertyItem
        type="family"
        label="결혼자녀유무"
        value={vehicleOwnership || '없음'}
        onClick={onRegister}
        labelClassName="bg-purple-100 p-1 rounded-lg"
        labelColorClassName="text-purple-500 font-fontBold w-24"
      />
      <hr></hr>
      <PropertyItem
        type="home"
        label="보유 주택"
        value={propertyOwnership || '없음'}
        onClick={onRegister}
        labelClassName="bg-blue-100 p-1 rounded-lg"
        labelColorClassName="text-blue-500 font-fontBold w-24"
      />
      <hr></hr>
      <PropertyItem
        type="loan"
        label="보유 대출"
        value={propertyOwnership || '없음'}
        onClick={onRegister}
        labelClassName="bg-orange-100 p-1 rounded-lg"
        labelColorClassName="text-orange-500 font-fontBold w-24"
      />
    </CommonBackground>
  );
}
