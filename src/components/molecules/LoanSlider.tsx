interface LoanSliderProps {
  capital: number;
  totalPrice: number;
  maxLoan: number;
  onChange: (capital: number) => void;
}

const LoanSlider: React.FC<LoanSliderProps> = ({
  capital,
  totalPrice,
  maxLoan,
  onChange,
}) => {
  let backgroundStyle;

  if (capital < totalPrice - maxLoan) {
    backgroundStyle = `
      linear-gradient(
        to right, 
        #008485 0%,                               /* 노란색 시작 */
        #008485 ${(capital / totalPrice) * 100}%, /* 자본금 비율 */
        #E90061 ${(capital / totalPrice) * 100}%, /* 빨간색 시작 */
        #E90061 ${((totalPrice - maxLoan) / totalPrice) * 100}%, /* 부족 금액 비율 */
        #B49F85 ${((totalPrice - maxLoan) / totalPrice) * 100}%, /* 파란색 시작 */
        #B49F85 100%                               /* 대출금 끝 */
      )
    `;
  } else {
    backgroundStyle = `
      linear-gradient(
        to right, 
        #008485 0%,                               /* 노란색 시작 */
        #008485 ${(capital / totalPrice) * 100}%, /* 자본금 비율 */
        #B49F85 ${Math.ceil((capital / totalPrice) * 100)}%, /* 파란색 시작 */
        #B49F85 100%                               /* 대출금 끝 */
      )
    `;
  }
  return (
    <div>
      <input
        type="range"
        min="0"
        max={totalPrice}
        value={capital}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-hanaGreen h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: backgroundStyle,
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default LoanSlider;
