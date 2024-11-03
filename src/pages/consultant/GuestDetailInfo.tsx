import DsrInfo from '../LoanRecommend/components/DsrInfo';

interface GuestDetailInfoProps {
  name: string;
  age: number;
  dsr: number;
}

const GuestDetailInfo: React.FC<GuestDetailInfoProps> = ({
  name,
  age,
  dsr,
}) => {
  return (
    <div className="flex flex-col px-2 text-hanaBlack80 font-semibold gap-y-2">
      <p className="">이름: {name}</p>
      <p className="">나이: {age}</p>
      <DsrInfo dsr={dsr} />
    </div>
  );
};

export default GuestDetailInfo;
