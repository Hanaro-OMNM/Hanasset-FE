import CommonBackground from '../../../components/atoms/CommonBackground';
import LoanProgressBar from '../../../components/atoms/LoanProgressBar';

interface DsrInfoProps {
  dsr: number;
}

const DsrInfo: React.FC<DsrInfoProps> = ({ dsr }) => {
  return (
    <div className="m-5">
      <CommonBackground className="p-7">
        <p className="my-2 text-hanaBlack80 font-semibold">현재 DSR {dsr}%</p>
        <LoanProgressBar rate={dsr} />
      </CommonBackground>
    </div>
  );
};

export default DsrInfo;
