// LoanInfoPage.tsx
import { IoChevronBack } from 'react-icons/io5';
import { dummyGuest } from '../assets/Dummy';
import Money from '../assets/img/money.jpg';
import Button from '../components/atoms/Button';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import Expectation from './LoanRecommend/components/Expectation';
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
const profile = {
  name: '김하나',
};
const LoanInfoPage: React.FC = () => {
  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-4 animate-slideInRight">
        <div className="w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-white/75 scrollbar-hide">
          {/* 헤더 */}
          <div className="flex h-12 mb-4 pl-8 bg-hanaSilver20 items-center justify-start gap-2">
            <button>
              <IoChevronBack className="text-hanaBlack80 text-xl" />
            </button>
            <h1 className="text-hanaBlack text-xl font-fontMedium pl-6 ">
              맞춤 대출 상품 안내
            </h1>
          </div>
          <div className="font-fontMedium text-2xl pl-6">
            {profile.name}님의
          </div>
          <div className="pl-6 flex">
            <div className="flex font-fontBold text-2xl">맞춤 대출 상품</div>
            <div className="font-fontMedium text-2xl "> 입니다.</div>
          </div>
          <Expectation totalPrice={10} maxLoan={5} />
          <DsrInfo dsr={dummyGuest.stressDsr} />
          <LoanFoundMessage isFound={true} />

          <LoanRecommendTab hanaLoanList={loanList} beotimmogLoanList={[]} />
          <div className="pl-6 pr-6 pb-4">
            <Button text="실시간 채팅 상담 예약하기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanInfoPage;
