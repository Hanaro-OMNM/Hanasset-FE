import React, { useState } from 'react';

interface Props {
  totalAsset: number;
  maxLoan: number;
}

const AssetProgressBar: React.FC<Props> = ({ totalAsset, maxLoan }) => {
  const [capital, setCapital] = useState(totalAsset - maxLoan);

  const shortage = Math.max(totalAsset - (capital + maxLoan), 0);

  let backgroundStyle;

  if (capital < totalAsset - maxLoan) {
    backgroundStyle = `
      linear-gradient(
        to right, 
        #FBBF24 0%,                               /* 노란색 시작 */
        #FBBF24 ${(capital / totalAsset) * 100}%, /* 자본금 비율 */
        #EF4444 ${(capital / totalAsset) * 100}%, /* 빨간색 시작 */
        #EF4444 ${((totalAsset - maxLoan) / totalAsset) * 100}%, /* 부족 금액 비율 */
        #3B82F6 ${((totalAsset - maxLoan) / totalAsset) * 100}%, /* 파란색 시작 */
        #3B82F6 100%                               /* 대출금 끝 */
      )
    `;
  } else {
    backgroundStyle = `
      linear-gradient(
        to right, 
        #FBBF24 0%,                               /* 노란색 시작 */
        #FBBF24 ${(capital / totalAsset) * 100}%, /* 자본금 비율 */
        #3B82F6 ${Math.ceil((capital / totalAsset) * 100)}%, /* 파란색 시작 */
        #3B82F6 100%                               /* 대출금 끝 */
      )
    `;
  }
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapital(Number(e.target.value));
  };

  return (
    <div className="w-full p-6 space-y-6">
      <input
        type="range"
        min="0"
        max={totalAsset}
        value={capital}
        onChange={handleSliderChange}
        className="w-full h-4 rounded-full appearance-none cursor-pointer"
        style={{
          background: backgroundStyle,
          cursor: 'pointer',
          height: '5px',
        }}
      />

      {/* 정보 표시 */}
      <div className="flex justify-between text-sm font-medium">
        <div>자본금: {capital.toFixed(1)}억</div>
        <div>
          대출금: {Math.min(Number((totalAsset - capital).toFixed(1)), maxLoan)}
          억
        </div>
        <div className="text-red-500">부족: {shortage.toFixed(1)}억</div>
      </div>
    </div>
  );
};

export default AssetProgressBar;
