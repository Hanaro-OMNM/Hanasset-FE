interface DetailInformtationProps {
  capital: number;
  totalPrice: number;
  maxLoan: number;
}
const DetailInformtation: React.FC<DetailInformtationProps> = ({
  capital,
  totalPrice,
  maxLoan,
}) => {
  return (
    <div className="flex justify-around mt-4 font-fontLight">
      <div className="flex-col text-hanaBlack80 text-center">
        <div className="text-sm text-hanaSilver80">자본금</div>
        <div>{Math.round(capital * 10) / 10}천만 원</div>
      </div>
      <div className="flex-col text-hanaBlack80 text-center">
        <div className="text-sm text-hanaSilver80">대출금</div>
        <div>
          {Math.round(Math.min(totalPrice - capital, maxLoan) * 10) / 10}천만 원
        </div>
      </div>
      <div className="flex-col text-hanaBlack80 text-center">
        <div className="text-sm text-hanaSilver80">필요 자금</div>
        <div>{Math.round(totalPrice * 10) / 10}천만 원</div>
      </div>
    </div>
  );
};

export default DetailInformtation;
