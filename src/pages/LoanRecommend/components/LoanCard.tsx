import clsx from 'clsx';

// LoanName Components
interface LoanNameProps {
  isBest: boolean;
  name: string;
}

const LoanName: React.FC<LoanNameProps> = ({ isBest, name }) => {
  return (
    <h6
      className={clsx(
        isBest && 'mb-1 text-hanaBlack20 text-lg font-semibold text-left',
        !isBest && 'mb-1 text-hanaBlack80 text-lg font-semibold text-left'
      )}
    >
      {name}
    </h6>
  );
};

// LoanRate Components
interface LoanRateProps {
  isBest: boolean;
  rate: number;
}

const LoanRate: React.FC<LoanRateProps> = ({ isBest, rate }) => {
  return (
    <h6
      className={clsx(
        isBest && 'h-5 text-hanaGold20 text-xs font-semibold mt-auto',
        !isBest && 'h-5 text-hanaBlack60 text-xs font-semibold mt-auto'
      )}
    >
      {`${rate}%`}
    </h6>
  );
};

// LoanLimit Components
interface LoanLimitProps {
  isBest: boolean;
  limit: number;
}

const LoanLimit: React.FC<LoanLimitProps> = ({ isBest, limit }) => {
  return (
    <h6
      className={clsx(
        isBest && 'h-5 text-hanaGold20 text-xs font-semibold',
        !isBest && 'h-5 text-hanaBlack60 text-xs font-semibold'
      )}
    >
      {`${limit}억원`}
    </h6>
  );
};

// LoanNewDsr Components
interface LoanNewDsrProps {
  isBest: boolean;
  newDsr: number;
}

const LoanNewDsr: React.FC<LoanNewDsrProps> = ({ isBest, newDsr }) => {
  return (
    <h6
      className={clsx(
        isBest && 'h-5 text-hanaGold20 text-xs font-semibold',
        !isBest && 'h-5 text-hanaBlack60 text-xs font-semibold'
      )}
    >
      {`DSR ${newDsr}%`}
    </h6>
  );
};

// LoanCard Components
interface LoanCardProps {
  isBest: boolean;
  isShow: boolean;
  name: string;
  rate: number;
  limit: number;
  newDsr: number;
  loanDetailUrl: string;
  onLoanDetailButtonClick: () => void;
}

const LoanCard: React.FC<LoanCardProps> = ({
  isBest,
  isShow,
  name,
  rate,
  limit,
  newDsr,
  onLoanDetailButtonClick,
}) => {
  return (
    <div className={clsx(!isShow && 'hidden')}>
      <button className="mb-3 w-full" onClick={onLoanDetailButtonClick}>
        <div
          className={clsx(
            isBest && 'bg-hanaGreen80 p-4 rounded-lg shadow',
            !isBest && 'bg-hanaSilver20 p-4 rounded-lg shadow'
          )}
        >
          <div className="flex-col">
            <LoanName isBest={isBest} name={name} />
            <div className="mt-1 pt-1 flex justify-between">
              <LoanRate isBest={isBest} rate={rate} />
              <LoanLimit isBest={isBest} limit={limit} />
              <LoanNewDsr isBest={isBest} newDsr={newDsr} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoanCard;
