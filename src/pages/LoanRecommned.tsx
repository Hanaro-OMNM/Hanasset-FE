import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dummyGuest } from '../assets/Dummy';
import Button from '../components/atoms/Button';
import LoanDetail from './LoanDetail.tsx';
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
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };

  return (
    <div className="flex">
      <div className="w-[430px] absolute top-0 h-full overflow-y-auto bg-[#f4f6f9]">
        <div className="flex h-12 mb-4 pl-1 bg-hanaSilver20 gap-2 items-center">
          <button className="items-center" onClick={() => navigate('/')}>
            <IoChevronBack className="text-hanaBlack80 text-xl" />
          </button>
          <h1 className="text-hanaBlack80 text-lg font-semibold ">
            맞춤 대출 상품 안내
          </h1>
        </div>

        <Expectation totalPrice={10} maxLoan={5} />
        <DsrInfo dsr={dummyGuest.stressDsr} />
        <LoanFoundMessage isFound={true} />

        <LoanRecommendTab
          hanaLoanList={loanList}
          beotimmogLoanList={[]}
          onLoanDetailButtonClick={handleShowDetail}
        />

        <Button text="실시간 채팅 상담 예약하기" />
      </div>
      {showDetail && (
        <div className="w-[430px] h-full absolute top-0 left-[490px] bg-[#f4f6f9]">
          <LoanDetail onHide={() => setShowDetail(false)} />
        </div>
      )}
    </div>
  );
};

export default LoanInfoPage;
