import { useRecoilValue } from 'recoil';
import CommonBackground from '../../components/atoms/CommonBackground';
import {
  jobTypeState,
  incomeAmountState,
  hasChildrenState,
  isMarriedState,
  hasHomeState,
  loanAmountState,
  hasLoanState,
} from '../../recoil/asset/atom';
import PropertyItem from './PropertyItem';

interface PropertyGroupProp {
  onRegister: (
    type: 'home' | 'family' | 'main' | 'editProfile' | 'job' | 'income' | 'loan'
  ) => void;
}

export default function PropertyGroup({ onRegister }: PropertyGroupProp) {
  const job = useRecoilValue(jobTypeState);
  const income = useRecoilValue(incomeAmountState);
  const hasChildren = useRecoilValue(hasChildrenState);
  const isMarried = useRecoilValue(isMarriedState);
  const hasHome = useRecoilValue(hasHomeState);
  const loanAmount = useRecoilValue(loanAmountState);
  const hasLoan = useRecoilValue(hasLoanState);

  let familyStatus = '';
  if (isMarried) {
    familyStatus = hasChildren ? '결혼/자녀 있음' : '결혼/자녀 없음';
  } else {
    familyStatus = hasChildren ? '미혼/자녀 있음' : '미혼/자녀 없음';
  }

  return (
    <CommonBackground className="bg-white pl-5 pr-5">
      <PropertyItem
        type="job"
        label="직업"
        value={job || '없음'}
        onClick={onRegister}
        labelClassName="bg-[#E0FBF5] p-1 rounded-lg"
        labelColorClassName="text-[#00CC9C] font-fontBold w-20"
      />
      <hr />
      <PropertyItem
        type="income"
        label="연소득"
        value={income ? `${income.toLocaleString()}만 원` : '없음'}
        onClick={onRegister}
        labelClassName="bg-[#F9F1EC] p-1 rounded-lg"
        labelColorClassName="text-hanaRed60 font-fontBold w-24"
      />
      <hr />
      <PropertyItem
        type="family"
        label="결혼자녀유무"
        value={familyStatus}
        onClick={onRegister}
        labelClassName="bg-purple-100 p-1 rounded-lg"
        labelColorClassName="text-purple-500 font-fontBold w-24"
      />
      <hr />
      <PropertyItem
        type="home"
        label="보유 주택"
        value={hasHome ? '있음' : '없음'}
        onClick={onRegister}
        labelClassName="bg-blue-100 p-1 rounded-lg"
        labelColorClassName="text-blue-500 font-fontBold w-24"
      />
      <hr />
      <PropertyItem
        type="loan"
        label="보유 대출"
        value={hasLoan ? `${loanAmount.toLocaleString()}만 원` : '없음'}
        onClick={onRegister}
        labelClassName="bg-orange-100 p-1 rounded-lg"
        labelColorClassName="text-orange-500 font-fontBold w-24"
      />
    </CommonBackground>
  );
}
