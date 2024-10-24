import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import LoanCard from './LoanCard';
import OrderButton from './OrderButton';

interface Loan {
  logoSrcUrl: string;
  finInst: string;
  name: string;
  rate: string;
  amount: string;
  loanDetailUrl: string;
}

interface LoanRecommendTabProps {
  loanList: Loan[];
}

const LoanRecommendTab: React.FC<LoanRecommendTabProps> = ({ loanList }) => {
  const [activate, setActivate] = useState(true);

  const orderOnClick = () => {
    console.log('정렬해요.', activate);
    setActivate((activate) => !activate);
  };

  useEffect(() => {
    console.log('우선 순위 변경 로직 동작이 필요해요');
  }, [activate]);

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
              전세 대출
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
              신용 대출
            </button>
          )}
        </Tab>
      </TabList>
      <TabPanels>
        <div className="mt-4">
          {/* 우선 순위 선택 */}
          <div className="ml-4 pl-3 flex gap-2">
            <OrderButton
              activate={activate}
              onClick={orderOnClick}
              text="금리 낮은 순"
            />
            <OrderButton
              activate={!activate}
              onClick={orderOnClick}
              text="한도 높은 순"
            />
          </div>
        </div>
        <TabPanel>
          {/* 전세 대출 리스트 */}
          <div className="mt-2 mr-4 ml-4">전세 대출 리스트가 들어가야 해요</div>
        </TabPanel>
        <TabPanel>
          {/* 신용 대출 리스트 */}
          <div className="mt-2 pr-4 pl-4 w-full flex-col">
            {loanList.map((loan: Loan, index: number) => (
              <LoanCard
                isHana={index === 0 ? true : false}
                logoSrcUrl={loan.logoSrcUrl}
                finInst={loan.finInst}
                rate={loan.rate}
                name={loan.name}
                amount={loan.amount}
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
