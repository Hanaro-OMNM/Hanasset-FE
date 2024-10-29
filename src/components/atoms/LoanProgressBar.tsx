interface LoanProgressBarProps {
  rate: number;
}

const LoanProgressBar: React.FC<LoanProgressBarProps> = ({ rate }) => {
  return (
    <div>
      <div className="ml-6 mr-6 mb-4 bg-hanaSilver60 rounded-full h-4">
        <div
          className="bg-hanaGold80 rounded-full h-4"
          style={{
            width: `${rate}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoanProgressBar;
