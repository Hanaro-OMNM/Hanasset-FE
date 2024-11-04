import DsrInfo from '../LoanRecommend/components/DsrInfo';

interface GuestDetailInfoProps {
  name: string;
  age: number;
  job: string;
  income: number;
  family: boolean;
  home: boolean;
  loan: number;
  dsr: number;
}

const GuestDetailInfo: React.FC<GuestDetailInfoProps> = ({
  name,
  age,
  job,
  income,
  family,
  home,
  loan,
  dsr,
}) => {
  return (
    <div className="flex flex-col gap-y-4 px-2 text-hanaBlack80 text-xl font-semibold">
      <div>
        <p>기본 정보</p>
        <div className="flex flex-col gap-y-2 px-4 text-base">
          <p className="">이름: {name}</p>
          <p className="">나이: {age}</p>
          <p className="">직업: {job}</p>
          <p className="">연소득: {income.toLocaleString()}만원</p>
          <p className="">결혼자녀유무: {family ? '있음' : '없음'} </p>
          <p className="">보유 주택: {home ? '있음' : '없음'}</p>
          <p className="">보유 대출: {loan > 0 ? '있음' : '없음'}</p>
        </div>
      </div>

      <div>
        <p>신용 정보</p>
        <div className="text-base">
          <DsrInfo dsr={dsr} />
        </div>
      </div>
    </div>
  );
};

export default GuestDetailInfo;
