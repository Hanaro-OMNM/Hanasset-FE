// import LoanRecommendTab from '../LoanRecommendComponents/LoanRecommendTab';

export default function GestInfo() {
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

  return (
    <div className="max-w-[420px] min-h-screen bg-gray-100 p-6">
      <h2 className="text-lg font-bold mt-4">손님정보</h2>

      <p className="text-sm mb-1">이름: 이순님</p>

      <h2 className="text-lg font-bold mt-4">매물정보</h2>
      <hr className="border-t border-gray-300 my-2" />
      <p className="text-sm mb-1">전세: 32억</p>
      <p className="text-sm mb-1">아파트: 서초푸르지오(써밋)</p>
      <p className="text-sm mb-1">101동 1701호, 100.97㎡</p>
      <p className="text-sm mb-1">서울특별시 성동구 왕십리로 16</p>

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
        <button className="bg-teal-600 text-white py-2 px-4 rounded-full">
          더보기
        </button>
      </div>
    </div>
  );
}
