// LoanInfoPage.tsx
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { dummyGuest } from '../assets/Dummy';
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

const LoanInfoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-430">
      <div className="top-0 absolute pl-2">
        <div className="w-430 max-w-[430px] h-svh overflow-y-auto min-h-screen bg-[#f4f6f9]">
          {/* 헤더 */}
          <div className="w-430 max-w-[430px] h-16 fixed top-0 bg-white/75 border-b-4 border-gray-200 z-10 px-4 py-2 flex items-center">
            <button className="items-center" onClick={() => navigate('/')}>
              <IoChevronBack className="text-hanaBlack80 text-xl mr-10" />
            </button>
            <h1 className="text-hanaBlack80 text-lg font-semibold ">
              맞춤 대출 상품 안내
            </h1>
          </div>

          <div className="w-full px-5 pt-20">
            <Expectation totalPrice={10} maxLoan={5} />

            <DsrInfo dsr={dummyGuest.stressDsr} />
            <LoanFoundMessage isFound={true} />
            <LoanRecommendTab hanaLoanList={loanList} beotimmogLoanList={[]} />

            <Button text="실시간 채팅 상담 예약하기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanInfoPage;
