import { IoChevronBack } from 'react-icons/io5';
import { dummyGuest } from '../assets/Dummy';
import { dummyLoanDetail } from '../assets/Dummy';
import LoanProgressBar from '../components/atoms/LoanProgressBar';
import InstructionCard from './LoanDetail/Components/InstructionCard';
import LoanDetailAccentInfo from './LoanDetail/Components/LoanDetailAccentInfo';
import LoanDetailCard from './LoanDetail/Components/LoanDetailCard';
import LoanDetailDisclosure from './LoanDetail/Components/LoanDetailDisclosure';
import LoanDetailHint from './LoanDetail/Components/LoanDetailHint';

const LoanDetail: React.FC = () => {
  return (
    <div className="w-430">
      <div className="top-0 absolute pl-2">
        <div className="w-430 max-w-[430px] h-svh min-h-screen bg-[#f4f6f9] overflow-y-auto">
          {/* 헤더 */}
          <div className="w-430 max-w-[430px] h-16 fixed top-0 bg-white/75 border-b-4 border-gray-200 z-10 px-4 py-2 flex items-center">
            <button>
              <IoChevronBack className="text-hanaBlack80 text-xl mr-10" />
            </button>
            <h1 className="text-hanaBlack80 text-lg font-semibold">
              대출 상세 정보
            </h1>
          </div>

          <div className="w-full pt-16">
            {/* 대출 정보 카드 */}
            <LoanDetailCard
              type={dummyLoanDetail.type}
              name={dummyLoanDetail.name}
              outline={dummyLoanDetail.outline}
            />

            {/* 대출 한 눈에 보여야 하는 정보 */}
            <LoanDetailAccentInfo
              title={'oo님의 금리'}
              content={`${dummyLoanDetail.rate}%`}
            />
            <LoanDetailAccentInfo
              title={'최대 한도'}
              content={`${dummyLoanDetail.amount}억원`}
            />
            <LoanDetailHint content="예상 금리와 한도예요. 서류 제출과정에서 신용 및 손님의 정보가 변동되면 금리와 한도가 변경될 수 있어요. 자세한 내용은 하나은행 홈페이지나 대출 상담을 통해 확인해주세요." />
            <LoanDetailAccentInfo
              title={'스트레스 DSR'}
              content={`${dummyGuest.stressDsr}%`}
            />
            <LoanProgressBar rate={dummyGuest.stressDsr} />
            {/* 스트레스 DSR 설명 */}
            <InstructionCard
              title={'스트레스 DSR이란?'}
              content={
                '스트레스 DSR에 대한 설명이 필요해요. 스트레스 DSR에 대한 설명이 필요해요. 스트레스 DSR에 대한 설명이 필요해요. 스트레스 DSR에 대한 설명이 필요해요. 스트레스 DSR에 대한 설명이 필요해요. '
              }
            />

            {/* 대출 상세 정보 */}
            {/* 상품특징 */}
            <LoanDetailDisclosure
              title={'상품특징'}
              content={dummyLoanDetail.detail}
            />
            {/* 대출대상 */}
            <LoanDetailDisclosure
              title={'대출대상'}
              content={dummyLoanDetail.targetGuest}
            />
            {/* 대상주택 */}
            <LoanDetailDisclosure
              title={'대상주택'}
              content={dummyLoanDetail.targetHouse}
            />
            {/* 대출기간 */}
            <LoanDetailDisclosure
              title={'대출기간'}
              content={dummyLoanDetail.period}
            />
            {/* 상환방식 */}
            <LoanDetailDisclosure
              title={'상환방식'}
              content={dummyLoanDetail.paybackMethod}
            />
            {/* 이자계산방법 */}
            <LoanDetailDisclosure
              title={'이자계산방법'}
              content={dummyLoanDetail.rateCalculateMethod}
            />
            {/* 대출 받으러 가기 버튼 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
