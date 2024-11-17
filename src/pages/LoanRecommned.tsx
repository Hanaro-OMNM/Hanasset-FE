import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dummyGuest } from '../assets/Dummy';
import { dummyLoanList } from '../assets/Dummy';
import { dummyBeotimmogLoanList } from '../assets/Dummy';
import Button from '../components/atoms/Button';
import LoanDetail from './LoanDetail.tsx';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import Expectation from './LoanRecommend/components/Expectation';
import LoanFoundMessage from './LoanRecommend/components/LoanFoundMessage';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';

const profile = {
  name: '김하나',
};

const LoanInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };

  return (
    <div className="flex">
      <div className="w-[500px]">
        <div className=" top-0 absolute pl-4 animate-slideInRight">
          <div className="w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-white/75 scrollbar-hide">
            <div className="flex h-12 mb-4 pl-1 gap-2 items-center">
              <button className="items-center" onClick={() => navigate('/')}>
                <IoChevronBack className="text-hanaBlack80 text-xl" />
              </button>
              <h1 className="text-hanaBlack80 text-lg font-semibold ">
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
            <Expectation title="예상 대출금" totalPrice={10} maxLoan={5} />
            <DsrInfo dsr={dummyGuest.stressDsr} />
            <LoanFoundMessage isFound={true} />
            <LoanRecommendTab
              hanaLoanList={dummyLoanList}
              beotimmogLoanList={dummyBeotimmogLoanList}
              onLoanDetailButtonClick={handleShowDetail}
            />
            <div className="pl-6 pr-6 pb-4">
              <Button text="관심 매물 등록하기" />
            </div>
          </div>
        </div>
      </div>
      {showDetail && (
        <div className="w-[420px] h-full absolute top-0 left-[490px]">
          <LoanDetail onHide={() => setShowDetail(false)} />
        </div>
      )}
    </div>
  );
};

export default LoanInfoPage;
