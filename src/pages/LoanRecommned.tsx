// LoanInfoPage.tsx
import { useState } from 'react';
import { dummyGuest } from '../assets/Dummy';
import Button from '../components/atoms/Button';
import AssetInfo from './LoanRecommend/components/AssetInfo';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import LoanFoundMessage from './LoanRecommend/components/LoanFoundMessage';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';

// Dummy Datas
interface Loan {
  name: string;
  rate: number;
  limit: number;
  newDsr: number;
  loanDetailUrl: string;
}

const hanaYouthJeonseLoan: Loan = {
  name: '하나 청년전세론',
  rate: 4.453,
  limit: 2,
  newDsr: 20,
  loanDetailUrl: '',
};

const seoulYouthLoan: Loan = {
  name: '서울특별시 청년임차 보증금 대출',
  rate: 4.52,
  limit: 2,
  newDsr: 25,
  loanDetailUrl: '',
};

const jeonseSecurityLoan: Loan = {
  name: '전세안심금대출',
  rate: 4.71,
  limit: 2,
  newDsr: 30,
  loanDetailUrl: '',
};

const loanList: Loan[] = [
  hanaYouthJeonseLoan,
  seoulYouthLoan,
  jeonseSecurityLoan,
];

const LoanInfoPage: React.FC = () => {
  const [assets, setAssets] = useState(100); // 자산 금액을 위한 state

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* 헤더 */}
      <div className="flex h-12 mb-4 bg-hanaSilver20 items-center justify-start gap-2">
        <button>뒤로가기</button>
        <h1 className="text-hanaBlack80 text-lg font-semibold">
          맞춤 상품 안내
        </h1>
      </div>

      <AssetInfo amount={100} />

      {/* 자본금 + 대출금 조절하는 range input */}
      <div className="flex justify-center mt-4 mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={assets}
          onChange={(e) => setAssets(Number(e.target.value))}
          className="w-3/4"
        />
      </div>

      <DsrInfo dsr={dummyGuest.stressDsr} />
      <LoanFoundMessage isFound={true} />
      <LoanRecommendTab hanaLoanList={loanList} beotimmogLoanList={[]} />

      <Button text="실시간 채팅 상담 예약하기" />
    </div>
  );
};

export default LoanInfoPage;
