import { useState } from 'react';
import { dummyGuest } from '../assets/Dummy';
import { dummyLoanList } from '../assets/Dummy';
import { dummyBeotimmogLoanList } from '../assets/Dummy';
import Button from '../components/atoms/Button';
import MobileHeader from '../components/atoms/MobileHeader.tsx';
import LoanDetail from './LoanDetail.tsx';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import Expectation from './LoanRecommend/components/Expectation';
import LoanFoundMessage from './LoanRecommend/components/LoanFoundMessage';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';

const profile = {
  name: '김하나',
};

const LoanInfoPage: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };
  const onBack = (): void => {
    window.history.back();
  };

  return (
    <div className="flex">
      <div className=" top-0 absolute pl-4 animate-slideInRight">
        <div className="w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-white/75 scrollbar-hide">
          <div className="px-6">
            <MobileHeader title="맞춤 대출 상품 안내" onBack={onBack} />
            <div className="font-fontMedium text-2xl">{profile.name}님의</div>
            <div className="flex">
              <div className="flex font-fontBold text-2xl">맞춤 대출 상품</div>
              <div className="font-fontMedium text-2xl"> 입니다.</div>
            </div>
            <Expectation title="예상 대출금" totalPrice={10} maxLoan={5} />
            <DsrInfo dsr={dummyGuest.stressDsr} />
            <LoanFoundMessage isFound={true} />
            <LoanRecommendTab
              hanaLoanList={dummyLoanList}
              beotimmogLoanList={dummyBeotimmogLoanList}
              onLoanDetailButtonClick={handleShowDetail}
            />
            <div className="pb-4">
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
