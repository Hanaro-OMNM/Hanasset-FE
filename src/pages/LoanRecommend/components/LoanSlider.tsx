import clsx from 'clsx';
import { useState } from 'react';

interface LoanSliderProps {
  totalPrice: number;
  maxLoan: number; // 최대 대출 가능 금액
}
const LoanSlider: React.FC<LoanSliderProps> = ({ totalPrice, maxLoan }) => {
  // 자본금, 대출금, 부족 금액 계산
  const [capital, setCapital] = useState(totalPrice - maxLoan);
  const shortage = Math.max(0, totalPrice - (capital + maxLoan));

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
    <div className="w-full mb-4 p-6">
      <p className="text-hanaBlack80 font-semibold">예상 대출금</p>
      {/* 부족금 경고 말풍선 */}

      {/* Slider */}
      <input
        type="range"
        min="0"
        max={totalPrice}
        value={capital}
        onChange={(e) => setCapital(Number(e.target.value))}
        className="w-full accent-hanaGreen h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: backgroundStyle,
          cursor: 'pointer',
        }}
      />

      {/* 정보 표시 */}
      <div className="flex justify-end gap-4 mt-4  font-semibold">
        <div
          className={clsx(
            shortage > 0 &&
              'bg-hanaRed40 w-48 h-8 text-hanaGold20 text-xs font-semibold rounded-md p-2 shadow-lg',
            shortage === 0 && 'hidden '
          )}
          style={{ left: `${(capital / totalPrice) * 100}%` }}
        >
          앗 대출 한도를 넘었어요 &nbsp;
          {/* <div className="text-red-500">부족: </div> */}
          <span className="text-hanaRed font-extrabold">
            {shortage.toFixed(1)}억
          </span>
        </div>
        <div className="flex-col text-hanaBlack80 text-center">
          <div className="text-sm text-hanaSilver80">자본금</div>
          <div className="">{capital.toFixed(1)}억</div>
        </div>
        <div className="flex-col text-hanaBlack80 text-center">
          <div className="text-sm text-hanaSilver80">대출금</div>
          <div className="">
            {Math.min(Number(totalPrice - capital), maxLoan).toFixed(1)}억
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoanSlider;
