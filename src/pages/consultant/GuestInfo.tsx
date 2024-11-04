import { PiBuildingApartment } from 'react-icons/pi';
import CommonBackground from '../../components/atoms/CommonBackground';
import Swiper from '../../components/atoms/Swiper';

// import LoanRecommendTab from '../LoanRecommendComponents/LoanRecommendTab';

export default function GuestInfo() {
  interface Loan {
    logoSrcUrl: string;
    finInst: string;
    name: string;
    rate: string;
    amount: string;
    loanDetailUrl: string;
  }

  const hanaBankLoan: Loan = {
    logoSrcUrl: 'https://www.hanafn.com/assets/img/ko/info/img-hana-symbol.png',
    finInst: '하나은행',
    name: '하나신용대출',
    rate: '8.4%',
    amount: '1,300만원',
    loanDetailUrl: '',
  };

  const kbCardLoan: Loan = {
    logoSrcUrl: 'https://www.kbfg.com/kor/images/about/pc/img_symbol_logo.jpg',
    finInst: 'KB국민카드',
    name: 'KB국민이지플러스',
    rate: '14.3%',
    amount: '2,200만원',
    loanDetailUrl: '',
  };

  const kbBankLoan: Loan = {
    logoSrcUrl: 'https://www.kbfg.com/kor/images/about/pc/img_symbol_logo.jpg',
    finInst: 'KB국민은행',
    name: 'KB비상금대출',
    rate: '12.5%',
    amount: '2,000만원',
    loanDetailUrl: '',
  };

  const loanList: Loan[] = [hanaBankLoan, kbCardLoan, kbBankLoan];

  const dummyConsultationData = [
    { id: 'V123AWE1', time: '2024.10.27 19:07:23', agent: '이인수' },
    { id: 'V123AWE2', time: '2024.10.28 14:22:10', agent: '김철수' },
    { id: 'V123AWE3', time: '2024.10.29 09:15:45', agent: '박영희' },
    { id: 'V123AWE4', time: '2024.10.30 11:30:00', agent: '최민수' },
  ];

  interface RealEstate {
    name: string;
    rentType: '전세' | '월세';
    location: string;
    size: string;
    address: string;
  }

  const realEstateList: RealEstate[] = [
    {
      name: '서초푸르지오(써밋)',
      rentType: '전세',
      location: '103동 1201호',
      size: '100.97㎡',
      address: '서울특별시 성동구 왕십리로 16',
    },
    {
      name: '트리마제',
      rentType: '월세',
      location: '104동 1502호',
      size: '85.42㎡',
      address: '서울특별시 성동구 왕십리로 16',
    },
    {
      name: '올림픽파크포레온',
      rentType: '전세',
      location: '105동 1803호',
      size: '120.50㎡',
      address: '서울특별시 성동구 왕십리로 16',
    },
  ];

  const itemsPerPage = 1;
  const slides: RealEstate[][] = Array.from(
    { length: Math.ceil(realEstateList.length / itemsPerPage) },
    (_, index) =>
      realEstateList.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
  );

  return (
    <div className="flex h-screen">
      <div className="max-w-[420px] bg-gray-100 p-6 overflow-hidden">
        <div className="h-full overflow-y-auto max-h-screen scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400">
          <h2 className="text-lg font-bold mt-4">손님정보</h2>
          <hr className="border-t border-gray-300 my-2" />
          <p className="text-sm mb-1">이름: 이순님</p>
          <h2 className="text-lg font-bold mt-4">매물정보</h2>

          <hr className="border-t border-gray-300 my-2" />
          <div className="h-32">
            <Swiper
              items={slides}
              renderItem={(pageRealEstateList) => (
                <div className="flex flex-col gap-4 h-52 mr-1 ml-1">
                  {pageRealEstateList.map((realEstate, index) => (
                    <button
                      key={index}
                      className="w-full transition-transform transform hover:scale-105"
                    >
                      <CommonBackground className="flex items-center p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                        <PiBuildingApartment className="text-2xl text-hanaGreen" />
                        <div className="ml-4 text-gray-800 font-medium text-left">
                          {realEstate.name} ({realEstate.rentType})
                          <div className="text-sm text-gray-600">
                            {realEstate.location}, {realEstate.size}
                            <br />
                            {realEstate.address}
                          </div>
                        </div>
                      </CommonBackground>
                    </button>
                  ))}
                </div>
              )}
              spaceBetween={30}
              slidesPerView={1}
            />
          </div>

          <h2 className="text-xl font-bold mt-4">대출 상품 리스트</h2>
          <hr className="border-t border-gray-300 my-2" />
          {/* <LoanRecommendTab loanList={loanList} /> */}
          <h2 className="text-xl font-bold mt-4">상담이력</h2>
          <hr className="border-t border-gray-300 my-2" />
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">상담 ID</th>
                <th className="py-2">인입시간</th>
                <th className="py-2">담당자</th>
              </tr>
            </thead>
            <tbody>
              {dummyConsultationData.map((data, index) => (
                <tr key={index} className="border-b text-left">
                  <td className="py-2">{data.id}</td>
                  <td className="py-2">{data.time}</td>
                  <td className="py-2">{data.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button className="bg-hanaGreen80 text-white py-2 px-4 rounded-full">
              더보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
