import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import MobileHeader from '../components/atoms/MobileHeader.tsx';
import { PlatformAPI } from '../platform/PlatformAPI.ts';
import isLoginAtom from '../recoil/isLogin';
import {
  GuestInfo,
  LoanRecommendInfo,
  RealEstateInfo,
  RealEstatePreview,
} from '../types/hanaAssetResponse.common.ts';
import LoanDetail from './LoanDetail.tsx';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import Expectation from './LoanRecommend/components/Expectation';
import LoanFoundMessage from './LoanRecommend/components/LoanFoundMessage';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';

export default function LoanInfoPage() {
  const [searchParams] = useSearchParams();
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [loanRecommendInfos, setLoanRecommendInfos] = useState<
    LoanRecommendInfo[] | null
  >(null);
  const [loanId, setLoanId] = useState<number | null>(null);
  const [realEstateInfos, setRealEstateInfos] = useState<RealEstateInfo[] | []>(
    []
  );
  const [bookmarkEstateList, setBookmarkEstateList] = useState<
    RealEstatePreview[] | null
  >(null);
  const [isLogin] = useRecoilState(isLoginAtom);

  const onBack = (): void => {
    window.history.back();
  };

  const getRealEstateInfoList = (loanRecommendInfos: LoanRecommendInfo[]) => {
    const realEstateInfoList = loanRecommendInfos.map(
      (loanRecommendInfo) => loanRecommendInfo.realEstateInfo
    );
    if (realEstateInfoList) {
      setRealEstateInfos(realEstateInfoList);
    }
  };

  const fetchLoanRecommend = async () => {
    try {
      const loanRecommend = await PlatformAPI.getLoanRecommend({
        realEstateIds: [Number(searchParams.get('realEstateIds'))],
      });
      setGuestInfo(loanRecommend.user);
      setLoanRecommendInfos(loanRecommend.loanRecommendInfos);
    } catch (error) {
      console.error('Error fetching loan data:', error);
    }
  };

  const getBookmarkRealEstates = async () => {
    try {
      const bookmarkRealEstateListResponse =
        await PlatformAPI.getBookmarkRealEstates();
      if (bookmarkRealEstateListResponse) {
        const bookmarkRealEstateList =
          bookmarkRealEstateListResponse.realEstates;
        setBookmarkEstateList(bookmarkRealEstateList);
      }
    } catch (error) {
      console.error('Error getBookmarkRealEstates:', error);
    }
  };

  const isBookmarkedRealEstate = (id: number): boolean => {
    if (!bookmarkEstateList) return false;
    return bookmarkEstateList.some((item) => item.realEstateId === id);
  };

  const addBookmark = async (id: number) => {
    try {
      const responseStatus = await PlatformAPI.addBookmarkRealEstate(id);
      if (responseStatus === 200) {
        getBookmarkRealEstates();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeBookmark = async (id: number) => {
    try {
      const responseStatus = await PlatformAPI.removeBookmarkRealEstate(id);
      if (responseStatus === 200) {
        getBookmarkRealEstates();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      if (!loanRecommendInfos) {
        fetchLoanRecommend();
      } else {
        getRealEstateInfoList(loanRecommendInfos);
      }

      if (!bookmarkEstateList) {
        getBookmarkRealEstates();
      }
    }
  }, [loanRecommendInfos, bookmarkEstateList, isLogin]);

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
            <Expectation
              title="예상 대출금"
              totalPrice={
                realEstateInfos[0] ? realEstateInfos[0].deposit / 1000_0000 : 0
              }
              maxLoan={
                realEstateInfos[0]
                  ? (realEstateInfos[0].deposit / 1000_0000) * 0.8
                  : 0
              }
            />
            <DsrInfo dsr={guestInfo ? guestInfo.dsr : 0.0} />
            <LoanFoundMessage isFound={true} />
            <LoanRecommendTab
              hanaLoanList={
                loanRecommendInfos && loanRecommendInfos.length > 0
                  ? loanRecommendInfos[0].hanaLoans
                  : []
              }
              beotimmogLoanList={
                loanRecommendInfos && loanRecommendInfos.length > 0
                  ? loanRecommendInfos[0].beotimmokLoans
                  : []
              }
              onLoanDetailButtonClick={setLoanId}
            />
            <div className="pb-4">
              {isBookmarkedRealEstate(
                Number(searchParams.get('realEstateIds'))
              ) ? (
                <button
                  className="bg-hanaRed40 text-white my-4 py-2 px-4 rounded-lg w-full hover:bg-hanaRed60"
                  onClick={() =>
                    removeBookmark(Number(searchParams.get('realEstateIds')))
                  }
                >
                  관심 매물 삭제하기
                </button>
              ) : (
                <button
                  className="bg-hanaGreen60 text-white my-4 py-2 px-4 rounded-lg w-full hover:bg-hanaColor2"
                  onClick={() =>
                    addBookmark(Number(searchParams.get('realEstateIds')))
                  }
                >
                  관심 매물 등록하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {loanId && loanId > 0 ? (
        <div className="h-full absolute top-0 left-[484px]">
          <LoanDetail
            loanId={loanId}
            name={guestInfo?.name}
            onHide={() => setLoanId(null)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
