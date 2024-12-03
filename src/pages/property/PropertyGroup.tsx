import { useRecoilState } from 'recoil';
// Import Asset type
import CommonBackground from '../../components/atoms/CommonBackground';
import { assetState } from '../../recoil/asset/atom';
import PropertyItem from './PropertyItem';

interface PropertyGroupProp {
  onRegister: (
    type:
      | 'home'
      | 'family'
      | 'main'
      | 'editProfile'
      | 'job'
      | 'income'
      | 'loan'
      | 'equity'
  ) => void;
}

interface AssetState {
  jobType: string; // 직업 종류
  incomeAmount: number; // 연수입
  equityAmount: number; // 자본금
  isMarried: boolean; // 결혼 상태
  hasChildren: boolean; // 자녀 여부
  hasHome: boolean; // 주택 소유 여부
  hasLoan: boolean; // 대출 여부
  annualInterest: number; // 보유대출 연이자 상환액
  annualPrincipal: number; // 보유대출 연원금 상환액
}

export default function PropertyGroup({ onRegister }: PropertyGroupProp) {
  const [asset] = useRecoilState<AssetState>(assetState);

  const jobType = asset.jobType;
  const incomeAmount = asset.incomeAmount;
  const hasChildren = asset.hasChildren;
  const isMarried = asset.isMarried;
  const hasHome = asset.hasHome;
  const hasLoan = asset.hasLoan;
  const equityAmount = asset.equityAmount;

  let familyStatus = '';
  if (isMarried) {
    familyStatus = hasChildren ? '결혼/자녀 있음' : '결혼/자녀 없음';
  } else {
    familyStatus = hasChildren ? '미혼/자녀 있음' : '미혼/자녀 없음';
  }

  return (
    <CommonBackground className="bg-white px-5">
      <PropertyItem
        type="job"
        label="직업"
        value={jobType || '없음'}
        onClick={onRegister}
        labelClassName="bg-[#E0FBF5] p-1 rounded-lg"
        labelColorClassName="text-[#00CC9C] font-fontBold w-20"
      />
      <hr />
      <PropertyItem
        type="income"
        label="연소득"
        value={incomeAmount ? `${incomeAmount.toLocaleString()}만 원` : '없음'}
        onClick={onRegister}
        labelClassName="bg-[#F9F1EC] p-1 rounded-lg"
        labelColorClassName="text-hanaRed60 font-fontBold w-24"
      />
      <hr />
      <PropertyItem
        type="equity"
        label="자본금"
        value={equityAmount ? `${equityAmount.toLocaleString()}만 원` : '없음'}
        onClick={onRegister}
        labelClassName="bg-red-100 p-1 rounded-lg"
        labelColorClassName="text-hanaRed80 font-fontBold w-24"
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
        value={hasLoan ? '있음' : '없음'}
        onClick={onRegister}
        labelClassName="bg-orange-100 p-1 rounded-lg"
        labelColorClassName="text-orange-500 font-fontBold w-24"
      />
    </CommonBackground>
  );
}
