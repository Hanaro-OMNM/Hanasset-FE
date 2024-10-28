interface LoanDetailProgressBarProps {
  rate: number;
}

const LoanDetailProgressBar: React.FC<LoanDetailProgressBarProps> = ({
  rate,
}) => {
  return (
    <div>
      <div className="ml-8 mr-8 bg-hanaSilver60 rounded-full h-6">
        <div
          className="bg-hanaGold80 rounded-full h-6"
          style={{
            width: `${rate}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoanDetailProgressBar;
