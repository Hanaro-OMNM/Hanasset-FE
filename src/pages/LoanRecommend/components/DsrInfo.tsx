import LoanProgressBar from '../../../components/atoms/LoanProgressBar';

interface DsrInfoProps {
  dsr: number;
}

const DsrInfo: React.FC<DsrInfoProps> = ({ dsr }) => {
  return (
    <div>
      <p className="ml-4 mt-2 mb-2 pl-2 text-hanaBlack80 font-semibold">
        현재 DSR {dsr}%
      </p>
      <LoanProgressBar rate={dsr} />
    </div>
  );
};

export default DsrInfo;
