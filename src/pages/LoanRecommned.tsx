// LoanInfoPage.tsx
import { useState } from 'react';
import AssetInfo from './LoanRecommendComponents/AssetInfo';
import LoanFoundMessage from './LoanRecommendComponents/LoanFoundMessage';
import LoanRecommendTab from './LoanRecommendComponents/LoanRecommendTab';

// Dummy Datas
interface Loan {
  logoSrcUrl: string;
  finInst: string;
  name: string;
  rate: string;
  amount: string;
  loanDetailUrl: string;
}

const hanaBankLoan: Loan = {
  logoSrcUrl: 'https://www.hanafn.com/assets/img/ko/info/img-hana-symbol.png',
  finInst: '하나은행',
  name: '하나신용대출',
  rate: '8.4%',
  amount: '1,300만원',
  loanDetailUrl: '',
};

const kbCardLoan: Loan = {
  logoSrcUrl: 'https://www.kbfg.com/kor/images/about/pc/img_symbol_logo.jpg',
  finInst: 'KB국민카드',
  name: 'KB국민이지플러스',
  rate: '14.3%',
  amount: '2,200만원',
  loanDetailUrl: '',
};

const kbBankLoan: Loan = {
  logoSrcUrl: 'https://www.kbfg.com/kor/images/about/pc/img_symbol_logo.jpg',
  finInst: 'KB국민은행',
  name: 'KB비상금대출',
  rate: '12.5%',
  amount: '2,000만원',
  loanDetailUrl: '',
};

const loanList: Loan[] = [hanaBankLoan, kbCardLoan, kbBankLoan];

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

      <LoanFoundMessage isFound={true} />
      <LoanRecommendTab loanList={loanList} />
    </div>
  );
};

export default LoanInfoPage;
