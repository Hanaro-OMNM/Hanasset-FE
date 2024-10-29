import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
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
}) => {
  // 대출 리스트 전처리
  hanaLoanList = loanListPreProcessing(hanaLoanList);
  beotimmogLoanList = loanListPreProcessing(beotimmogLoanList);

  return (
    <TabGroup>
      <TabList className={'flex gap-3'}>
        {/* 대출 종류 선택 */}
        <Tab className="ml-4 w-40 h-12 bg-hanaSilver40 text-hanaBlack80 font-semibold rounded-2xl">
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
          <div className="mt-4 pr-4 pl-4 w-full flex-col">
            {hanaLoanList.map((loan: Loan, index: number) => (
              <LoanCard
                key={index}
                isBest={index === 0 ? true : false}
                name={loan.name}
                rate={loan.rate}
                limit={loan.limit}
                newDsr={loan.newDsr}
                loanDetailUrl={loan.loanDetailUrl}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          {/* 버팀목 대출 리스트 */}
          {/* 하나은행 대출 리스트 */}
          <div className="mt-4 pr-4 pl-4 w-full flex-col">
            {beotimmogLoanList.map((loan: Loan, index: number) => (
              <LoanCard
                key={index}
                isBest={index === 0 ? true : false}
                name={loan.name}
                rate={loan.rate}
                limit={loan.limit}
                newDsr={loan.newDsr}
                loanDetailUrl={loan.loanDetailUrl}
              />
            ))}
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default LoanRecommendTab;
