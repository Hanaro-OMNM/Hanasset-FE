import clsx from 'clsx';
import { PiBuildingApartment } from 'react-icons/pi';
import { useState } from 'react';
import { useEffect } from 'react';
import { dummyConsultationData } from '../../assets/Dummy';
import CommonBackground from '../../components/atoms/CommonBackground';
import Swiper from '../../components/atoms/Swiper';
import { PlatformAPI } from '../../platform/PlatformAPI';
import {
  GuestInfo,
  LoanRecommendInfo,
  RealEstateInfo,
} from '../../types/hanaAssetResponse.common';
import FixedExpectation from '../GuestChatDetail/FixedExpectation';
import LoanDetail from '../LoanDetail';
import LoanRecommendTab from '../LoanRecommend/components/LoanRecommendTab';
import GuestDetailInfo from './GuestDetailInfo';
import SemiTitle from './SemiTitle';

export default function GuestInfoPage() {
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [loanRecommendInfos, setLoanRecommendInfos] = useState<
    LoanRecommendInfo[] | []
  >([]);
  const [realEsetateId, setRealEstateId] = useState(0);
  const [loanId, setLoanId] = useState<number | null>(null);
  const [realEstateInfos, setRealEstateInfos] = useState<RealEstateInfo[] | []>(
    []
  );
  // const [loanIndex, setLoanIndex] = useState(0);
  const [consultingDataShowCount, setConsultingDataShowCount] = useState(3);
  // const [showDetail, setShowDetail] = useState(false);
  // const handleShowDetail = () => {
  //   setShowDetail(true);
  // };

  const addOnClick = () => {
    setConsultingDataShowCount(
      (consultingDataShowCount) => consultingDataShowCount + 3
    );
  };

  const swiperClick = (index: number) => {
    setRealEstateId(index);
  };

  useEffect(() => {
    const fetchLoanRecommend = async () => {
      try {
        const loanRecommend = await PlatformAPI.getConsultingUserInfo();
        setGuestInfo(loanRecommend.result.user);
        setLoanRecommendInfos(loanRecommend.result.loanRecommendInfos);
        const realEstateInfoList = loanRecommendInfos.map(
          (loanRecommendInfo) => loanRecommendInfo.realEstate
        );
        setRealEstateInfos(realEstateInfoList);
      } catch (error) {
        console.error('Error fetching loan data:', error);
      }
    };
    fetchLoanRecommend();
  }, []);

  return (
    <div>
      {!loanId ? (
        <div className="flex h-screen">
          <div className="max-w-[420px] bg-gray-100 p-6 overflow-hidden">
            <div className="h-full overflow-y-auto max-h-screen scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400">
              <div className="flex flex-col gap-y-4">
                <div>
                  <SemiTitle title="손님 정보" />
                  <GuestDetailInfo
                    name={guestInfo ? guestInfo.name : ''}
                    age={guestInfo ? guestInfo.age : 0}
                    job={guestInfo ? guestInfo.jobType : ''}
                    income={guestInfo ? guestInfo.income : 0}
                    capital={guestInfo ? guestInfo.capital : 0}
                    hasHome={guestInfo ? guestInfo.hasHouse : false}
                    annualInterest={guestInfo ? guestInfo.annualInterest : 0}
                    annualPrinciple={guestInfo ? guestInfo.annualPrinciple : 0}
                    dsr={guestInfo ? guestInfo.dsr : 0}
                  />
                </div>
                {/* 매물 정보 */}
                <div>
                  <SemiTitle title="매물 정보" />
                  <div className="h-32">
                    <Swiper
                      items={realEstateInfos ? realEstateInfos : []}
                      renderItem={(realEstate) => (
                        <div className="flex flex-col gap-4 h-32 mx-1">
                          <div>
                            <button
                              onClick={() =>
                                swiperClick(
                                  realEstate ? realEstate.realEstateId : 0
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
                                    {realEstate ? realEstate.addressDetail : ''}
                                    ,{' '}
                                    {realEstate
                                      ? realEstate.exclusiveAreaSize
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
                </div>
                {/* 대출 상품 리스트 */}
                <div>
                  <SemiTitle title="대출 상품 리스트" />
                  <FixedExpectation
                    capital={guestInfo ? guestInfo.capital : 0}
                    totalPrice={realEstateInfos[realEsetateId].deposit}
                    maxLoan={5}
                  />
                  <LoanRecommendTab
                    hanaLoanList={
                      loanRecommendInfos.length > 0
                        ? loanRecommendInfos[realEsetateId].hanaLoans
                        : []
                    }
                    beotimmogLoanList={
                      loanRecommendInfos.length > 0
                        ? loanRecommendInfos[realEsetateId].beotimmokLoans
                        : []
                    }
                    onLoanDetailButtonClick={setLoanId}
                  />
                </div>
                {/* TODO: dummy -> data fetch */}
                {/* 상담 이력 */}
                <div>
                  <SemiTitle title="상담 이력" />
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2">상담 ID</th>
                        <th className="py-2">인입시간</th>
                        <th className="py-2">담당자</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyConsultationData.map((data, index) =>
                        index < consultingDataShowCount ? (
                          <tr key={index} className="border-b text-left">
                            <td className="py-2">{data.id}</td>
                            <td className="py-2">{data.time}</td>
                            <td className="py-2">{data.agent}</td>
                          </tr>
                        ) : (
                          <></>
                        )
                      )}
                    </tbody>
                  </table>

                  {/* 더 보기 */}
                  <div
                    className={clsx(
                      consultingDataShowCount < dummyConsultationData.length &&
                        'mx-4 my-2 text-hanaBlack60 text-center',
                      consultingDataShowCount >= dummyConsultationData.length &&
                        'hidden'
                    )}
                  >
                    <button onClick={addOnClick}>더 보기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex h-screen">
          <LoanDetail loanId={loanId} onHide={() => setLoanId(null)} />
        </div>
      )}
    </div>
  );
}
