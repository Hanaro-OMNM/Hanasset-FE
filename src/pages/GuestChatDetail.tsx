import { PiBuildingApartment } from 'react-icons/pi';
import { useState } from 'react';
import { dummyLoanGroup } from '../assets/Dummy';
import { dummyRealEstateList } from '../assets/Dummy';
import { dummyGuest } from '../assets/Dummy';
import CommonBackground from '../components/atoms/CommonBackground';
import Swiper from '../components/atoms/Swiper';
import LoanDetail from './LoanDetail';
import DsrInfo from './LoanRecommend/components/DsrInfo';
import Expectation from './LoanRecommend/components/Expectation';
import LoanRecommendTab from './LoanRecommend/components/LoanRecommendTab';
import SemiTitle from './consultant/SemiTitle';

const GuestChatDetail: React.FC = () => {
  const [loanIndex, setLoanIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const swiperClick = (index: number) => {
    setLoanIndex(index);
    console.log(loanIndex, index);
  };

  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-4 animate-slideInRight">
        {showDetail ? (
          <LoanDetail onHide={() => setShowDetail(false)} />
        ) : (
          <div className="w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-2 overflow-y-auto bg-white/75 scrollbar-hide">
            {/* 매물 정보 */}
            <div>
              <SemiTitle title="매물 정보" />
              <Swiper
                items={dummyRealEstateList}
                renderItem={(realEstate) => (
                  <div className="flex flex-col gap-4 h-32 mr-1 ml-1">
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

            {/* 대출 상품 리스트 */}
            <div>
              <SemiTitle title="대출 상품 리스트" />
              <Expectation totalPrice={10} maxLoan={5} />
              <DsrInfo dsr={dummyGuest.stressDsr} />
              <LoanRecommendTab
                hanaLoanList={dummyLoanGroup[loanIndex]}
                beotimmogLoanList={[]}
                onLoanDetailButtonClick={handleShowDetail}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestChatDetail;