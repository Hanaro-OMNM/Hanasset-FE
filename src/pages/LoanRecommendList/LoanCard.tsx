import clsx from 'clsx';

// LogoImage Components
interface LogoImageProps {
  logoSrcUrl: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ logoSrcUrl }) => {
  return (
    <div className="w-12 h-12 rounded-[10%]">
      <img
        className="h-full w-full rounded-md bg-hanaBlack20 object-cover"
        src={logoSrcUrl}
        alt="fin_inst_logo"
      />
    </div>
  );
};

// FinInst Components
interface FinInstProps {
  isHana: boolean;
  finInst: string;
}

const FinInst: React.FC<FinInstProps> = ({ isHana, finInst }) => {
  return (
    <h5
      className={clsx(
        isHana && 'mt-1 h-5 text-hanaBlack20 text-sm font-semibold mb-auto',
        !isHana && 'mt-1 h-5 text-hanaBlack80 text-sm font-semibold mb-auto'
      )}
    >
      {finInst}
    </h5>
  );
};

// LoanRate Components
interface LoanRateProps {
  isHana: boolean;
  rate: string;
}

const LoanRate: React.FC<LoanRateProps> = ({ isHana, rate }) => {
  return (
    <h6
      className={clsx(
        isHana && 'h-5 text-hanaGold20 text-xs font-semibold mt-auto',
        !isHana && 'h-5 text-black text-xs font-semibold mt-auto'
      )}
    >
      {rate}
    </h6>
  );
};

// LoanName Components
interface LoanNameProps {
  isHana: boolean;
  name: string;
}

const LoanName: React.FC<LoanNameProps> = ({ isHana, name }) => {
  return (
    <h6
      className={clsx(
        isHana && 'mt-1 h-5 text-hanaSilver40 text-xs font-medium align-middle',
        !isHana && 'mt-1 h-5 text-hanaSilver text-xs font-medium align-middle'
      )}
    >
      {name}
    </h6>
  );
};

// LoanAmount Components
interface LoanAmountProps {
  isHana: boolean;
  amount: string;
}

const LoanAmount: React.FC<LoanAmountProps> = ({ isHana, amount }) => {
  return (
    <h6
      className={clsx(
        isHana && 'h-5 text-hanaGold20 text-xs font-semibold',
        !isHana && 'h-5 text-black text-xs font-semibold'
      )}
    >
      {amount}
    </h6>
  );
};

// LoanCard Components
interface LoanCardProps {
  isHana: boolean;
  logoSrcUrl: string;
  finInst: string;
  name: string;
  rate: string;
  amount: string;
}

const LoanCard: React.FC<LoanCardProps> = ({
  isHana,
  logoSrcUrl,
  finInst,
  name,
  rate,
  amount,
}) => {
  return (
    <div>
      <button className="mb-3 w-full">
        <div
          className={clsx(
            isHana && 'bg-hanaGreen80 p-4 rounded-lg shadow flex gap-2',
            !isHana && 'bg-hanaSilver20 p-4 rounded-lg shadow flex gap-2'
          )}
        >
          <LogoImage logoSrcUrl={logoSrcUrl} />

          <div className="w-24 flex-col justify-center items-center">
            <FinInst isHana={isHana} finInst={finInst} />
            <LoanRate isHana={isHana} rate={rate} />
          </div>

          <div className="flex-col justify-center">
            <LoanName isHana={isHana} name={name} />
            <LoanAmount isHana={isHana} amount={amount} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoanCard;
