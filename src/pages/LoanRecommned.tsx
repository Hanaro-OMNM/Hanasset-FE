import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';
import MobileHeader from '../components/atoms/MobileHeader.tsx';
import { PlatformAPI } from '../platform/PlatformAPI.ts';
import {
  GuestInfo,
  LoanRecommendInfo,
} from '../types/hanaAssetResponse.common.ts';
import LoanDetail from './LoanDetail.tsx';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import Expectation from './LoanRecommend/components/Expectation';
import LoanFoundMessage from './LoanRecommend/components/LoanFoundMessage';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';

const LoanInfoPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [loanRecommendInfos, setLoanRecommendInfos] = useState<
    LoanRecommendInfo[] | []
  >([]);

  useEffect(() => {
    const fetchLoanRecommend = async () => {
      try {
        const loanRecommend = await PlatformAPI.getLoanRecommend({
          realEstateIds: [Number(searchParams.get('realEstateIds'))],
        });
        setGuestInfo(loanRecommend.result.user);
        setLoanRecommendInfos(loanRecommend.result.loanRecommendInfos);
      } catch (error) {
        console.error('Error fetching loan data:', error);
      }
    };
    fetchLoanRecommend();
  }, [searchParams]);

  const [loanId, setLoanId] = useState<number | null>(null);

  const onBack = (): void => {
    window.history.back();
  };

  return (
    <div className="flex">
      <div className="top-0 absolute pl-4 animate-slideInRight">
        <div className="w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-gray-50/90 scrollbar-hide">
          <div className="px-6">
            <MobileHeader title="맞춤 대출 상품 안내" onBack={onBack} />
            <div className="font-fontMedium text-2xl mt-5">
              {guestInfo?.name}님의
            </div>
            <div className="flex">
              <div className="flex font-fontBold text-2xl">맞춤 대출 상품</div>
              <div className="font-fontMedium text-2xl"> 이에요.</div>
            </div>
            <Expectation title="예상 대출금" totalPrice={10} maxLoan={5} />
            <DsrInfo dsr={guestInfo ? guestInfo.dsr : 0.0} />
            <LoanFoundMessage isFound={true} />
            <LoanRecommendTab
              hanaLoanList={
                loanRecommendInfos.length > 0
                  ? loanRecommendInfos[0].hanaLoans
                  : []
              }
              beotimmogLoanList={
                loanRecommendInfos.length > 0
                  ? loanRecommendInfos[0].beotimmokLoans
                  : []
              }
              onLoanDetailButtonClick={setLoanId}
            />
            <div className="pb-4">
              <Button text="관심 매물 등록하기" />
            </div>
          </div>
        </div>
      </div>
      {loanId && (
        <div className="h-full absolute top-0 left-[484px]">
          <LoanDetail loanId={loanId} onHide={() => setLoanId(null)} />
        </div>
      )}
    </div>
  );
};

export default LoanInfoPage;
