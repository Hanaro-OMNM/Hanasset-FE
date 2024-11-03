import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import LoanCard from './LoanCard';

// Dummy Datas
interface Loan {
  name: string;
  rate: number;
  limit: number;
  newDsr: number;
  loanDetailUrl: string;
}

interface LoanRecommendTabProps {
  hanaLoanList: Loan[];
  beotimmogLoanList: Loan[];
  onLoanDetailButtonClick: () => void;
}

// 대출 리스트 정렬 순서 및 최소 개수 전처리
const loanListPreProcessing = (loanList: Loan[]) => {
  // 금리 낮은 순으로 정렬
  loanList.sort((a, b) => a.rate - b.rate);

  const emptyLoan: Loan = {
    name: '-',
    rate: 100,
    limit: 0,
    newDsr: 100,
    loanDetailUrl: '',
  };

  while (loanList.length < 3) {
    loanList.push(emptyLoan);
  }

  return loanList;
};

const LoanRecommendTab: React.FC<LoanRecommendTabProps> = ({
  hanaLoanList,
  beotimmogLoanList,
  onLoanDetailButtonClick,
}) => {
  const [showCount, setShowCount] = useState(3);
  const onClick = () => {
    setShowCount((showCount) => showCount + 3);
  };

  // 대출 리스트 전처리
  hanaLoanList = loanListPreProcessing(hanaLoanList);
  beotimmogLoanList = loanListPreProcessing(beotimmogLoanList);

  return (
    <TabGroup className={'mb-4'}>
      <TabList className="flex gap-3 justify-center">
        {/* 대출 종류 선택 */}
        <Tab className="ml-4 mb-4 w-40 h-12 bg-hanaSilver40 text-hanaBlack80 font-semibold rounded-2xl">
          {({ selected }) => (
            <button
              className={clsx(
                selected &&
                  'w-40 h-12 bg-hanaGreen text-hanaSilver20 text-center rounded-2xl'
              )}
            >
              하나은행 대출
            </button>
          )}
        </Tab>
        <Tab className="mr-4 w-40 h-12 bg-hanaSilver40 text-hanaBlack80 font-semibold rounded-2xl">
          {({ selected }) => (
            <button
              className={clsx(
                selected &&
                  'w-40 h-12 bg-hanaGreen text-hanaSilver20 rounded-2xl'
              )}
            >
              버팀목 대출
            </button>
          )}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* 하나은행 대출 리스트 */}
          <div className="mt-4 px-4 w-full flex-col">
            {hanaLoanList.map((loan: Loan, index: number) => (
              <LoanCard
                key={index}
                isBest={index === 0 ? true : false}
                isShow={index < showCount ? true : false}
                name={loan.name}
                rate={loan.rate}
                limit={loan.limit}
                newDsr={loan.newDsr}
                loanDetailUrl={loan.loanDetailUrl}
                onLoanDetailButtonClick={onLoanDetailButtonClick}
              />
            ))}
          </div>
          {/* 더 보기 */}
          <div
            className={clsx(
              showCount < hanaLoanList.length &&
                'mx-4 mb-4 text-hanaBlack60 text-center',
              showCount >= hanaLoanList.length && 'hidden'
            )}
          >
            <button onClick={onClick}>더 보기</button>
          </div>
        </TabPanel>
        <TabPanel>
          {/* 버팀목 대출 리스트 */}
          {/* 하나은행 대출 리스트 */}
          <div className="mt-4 px-4 w-full flex-col">
            {beotimmogLoanList.map((loan: Loan, index: number) => (
              <LoanCard
                key={index}
                isBest={index === 0 ? true : false}
                isShow={index < showCount ? true : false}
                name={loan.name}
                rate={loan.rate}
                limit={loan.limit}
                newDsr={loan.newDsr}
                loanDetailUrl={loan.loanDetailUrl}
                onLoanDetailButtonClick={onLoanDetailButtonClick}
              />
            ))}
          </div>
          {/* 더 보기 */}
          <div
            className={clsx(
              showCount < beotimmogLoanList.length &&
                'mx-4 mb-4 text-hanaBlack60 text-center',
              showCount >= beotimmogLoanList.length && 'hidden'
            )}
          >
            <button onClick={onClick}>더 보기</button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default LoanRecommendTab;
