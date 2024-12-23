import clsx from 'clsx';
import { PiBuildingApartment } from 'react-icons/pi';
import { useState } from 'react';
import { dummyGuest } from '../../assets/Dummy';
import { dummyLoanGroup } from '../../assets/Dummy';
import { dummyConsultationData } from '../../assets/Dummy';
import { dummyRealEstateList } from '../../assets/Dummy';
import { dummyBeotimmogLoanGroup } from '../../assets/Dummy';
import CommonBackground from '../../components/atoms/CommonBackground';
import Swiper from '../../components/atoms/Swiper';
import FixedExpectation from '../GuestChatDetail/FixedExpectation';
import LoanDetail from '../LoanDetail';
import LoanRecommendTab from '../LoanRecommend/components/LoanRecommendTab';
import GuestDetailInfo from './GuestDetailInfo';
import SemiTitle from './SemiTitle';

export default function GuestInfo() {
  const [loanIndex, setLoanIndex] = useState(0);
  const [consultingDataShowCount, setConsultingDataShowCount] = useState(3);
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const addOnClick = () => {
    setConsultingDataShowCount(
      (consultingDataShowCount) => consultingDataShowCount + 3
    );
  };

  const swiperClick = (index: number) => {
    setLoanIndex(index);
  };

  return (
    <div>
      {!showDetail ? (
        <div className="flex h-screen">
          <div className="max-w-[420px] bg-gray-100 p-6 overflow-hidden">
            <div className="h-full overflow-y-auto max-h-screen scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400">
              <div className="flex flex-col gap-y-4">
                <div>
                  <SemiTitle title="손님 정보" />
                  <GuestDetailInfo
                    name={dummyGuest.name}
                    age={dummyGuest.age}
                    job={dummyGuest.job}
                    income={dummyGuest.income}
                    family={dummyGuest.family}
                    home={dummyGuest.home}
                    loan={dummyGuest.loan}
                    dsr={dummyGuest.dsr}
                  />
                </div>

                {/* 매물 정보 */}
                <div>
                  <SemiTitle title="매물 정보" />
                  <div className="h-32">
                    <Swiper
                      items={dummyRealEstateList}
                      renderItem={(realEstate) => (
                        <div className="flex flex-col gap-4 h-32 mx-1">
                          <div>
                            <button
                              onClick={() => swiperClick(realEstate.id)}
                              className="w-full transition-transform transform hover:scale-105"
                            >
                              <CommonBackground className="flex items-center p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                                <PiBuildingApartment className="text-2xl text-hanaGreen" />
                                <div className="ml-4 text-hanaBlack font-medium text-left">
                                  {realEstate.name} ({realEstate.rentType})
                                  <div className="text-sm text-hanaBlack80">
                                    {realEstate.location}, {realEstate.size}
                                    <br />
                                    {realEstate.address}
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
                    capital={dummyGuest.capital}
                    totalPrice={dummyRealEstateList[loanIndex].price}
                    maxLoan={5}
                  />
                  <LoanRecommendTab
                    hanaLoanList={dummyLoanGroup[loanIndex]}
                    beotimmogLoanList={dummyBeotimmogLoanGroup[loanIndex]}
                    onLoanDetailButtonClick={handleShowDetail}
                  />
                </div>

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
          <LoanDetail onHide={() => setShowDetail(false)} />
        </div>
      )}
    </div>
  );
}
