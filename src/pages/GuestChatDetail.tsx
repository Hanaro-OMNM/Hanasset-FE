import { PiBuildingApartment } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../components/atoms/CommonBackground';
import Swiper from '../components/atoms/Swiper';
import { PlatformAPI } from '../platform/PlatformAPI';
import chatroomIdState from '../recoil/chatroomId/atom';
import isLoginAtom from '../recoil/isLogin';
import {
  GuestInfo,
  LoanRecommendInfo,
  RealEstateInfo,
} from '../types/hanaAssetResponse.common';
import FixedExpectation from './GuestChatDetail/FixedExpectation';
import LoanDetail from './LoanDetail';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';
import SemiTitle from './chat/SemiTitle';

const GuestChatDetail: React.FC = () => {
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [loanRecommendInfos, setLoanRecommendInfos] = useState<
    LoanRecommendInfo[] | null
  >(null);
  const [realEstateId, setRealEstateId] = useState(0);
  const [loanId, setLoanId] = useState<number | null>(null);
  const [realEstateInfos, setRealEstateInfos] = useState<
    RealEstateInfo[] | null
  >(null);
  const chatroomId = useRecoilValue(chatroomIdState);
  const [isLogin] = useRecoilState(isLoginAtom);
  const swiperClick = (index: number) => {
    setRealEstateId(index);
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
      const loanRecommend = await PlatformAPI.getConsultingUserInfo(
        chatroomId!
      );
      setGuestInfo(loanRecommend.user);
      setLoanRecommendInfos(loanRecommend.loanRecommendInfos);
    } catch (error) {
      console.error('Error fetching loan data:', error);
    }
  };
  useEffect(() => {
    if (isLogin) {
      if (!loanRecommendInfos) {
        fetchLoanRecommend();
      } else {
        getRealEstateInfoList(loanRecommendInfos);
      }
    }
  }, [loanRecommendInfos, isLogin]);
  console.log(guestInfo);
  return (
    <div className="top-0 absolute animate-slideInRight">
      {loanId ? (
        <div className="absolute left-[420px]">
          <LoanDetail loanId={loanId} onHide={() => setLoanId(null)} />
        </div>
      ) : (
        <div className="w-[420px] backdrop-blur-[10px] absolute px-4 top-0 h-screen left-[420px] overflow-y-auto bg-gray-50/90 scrollbar-hide">
          {/* 매물 정보 */}
          <div>
            <SemiTitle title="매물 정보" />
            <Swiper
              items={realEstateInfos ? realEstateInfos : []}
              renderItem={(realEstate) => (
                <div className="flex flex-col gap-4 h-32 mr-1 ml-1">
                  <div>
                    <button
                      onClick={() =>
                        swiperClick(
                          realEstate && realEstateInfos
                            ? realEstateInfos.findIndex(
                                (realEstateInfo) =>
                                  realEstateInfo.realEstateId ===
                                  realEstate.realEstateId
                              )
                            : 0
                        )
                      }
                      className="w-full transition-transform transform hover:scale-105"
                    >
                      <CommonBackground className="flex items-center p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                        <PiBuildingApartment className="text-2xl text-hanaGreen" />
                        <div className="ml-4 text-hanaBlack font-medium text-left">
                          {realEstate ? realEstate.name : ''} (
                          {realEstate ? realEstate.rentType : ''})
                          <div className="text-sm text-hanaBlack80">
                            {realEstate ? realEstate.address : ''}
                            <br />
                            {realEstate ? realEstate.addressDetail : ''},
                            {' 전용면적: '}
                            {realEstate
                              ? Math.round(realEstate.exclusiveAreaSize * 100) /
                                100
                              : 0}
                          </div>
                        </div>
                      </CommonBackground>
                    </button>
                  </div>
                </div>
              )}
              spaceBetween={30}
              slidesPerView={1}
            />
          </div>
          {/* 대출 상품 리스트 */}
          <div>
            <SemiTitle title="대출 상품 리스트" />
            <FixedExpectation
              capital={guestInfo ? guestInfo.capital / 1000 : 0}
              totalPrice={
                realEstateInfos && realEstateInfos[realEstateId]
                  ? realEstateInfos[realEstateId].deposit / 1000_0000
                  : 0
              }
              maxLoan={
                realEstateInfos && realEstateInfos[realEstateId]
                  ? (realEstateInfos[realEstateId].deposit / 1000_0000) * 0.8
                  : 0
              }
            />
            <DsrInfo dsr={guestInfo ? guestInfo.dsr : 0.0} />
            <LoanRecommendTab
              hanaLoanList={
                loanRecommendInfos
                  ? loanRecommendInfos[realEstateId].hanaLoans
                  : []
              }
              beotimmogLoanList={
                loanRecommendInfos
                  ? loanRecommendInfos[realEstateId].beotimmokLoans
                  : []
              }
              onLoanDetailButtonClick={setLoanId}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default GuestChatDetail;
