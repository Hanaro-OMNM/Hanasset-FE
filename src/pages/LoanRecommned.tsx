// LoanInfoPage.tsx
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import LoanCard from './LoanRecommendList/LoanCard';
import OrderButton from './LoanRecommendList/OrderButton';

// Dummy Datas
interface Loan {
  logoSrcUrl: string;
  finInst: string;
  name: string;
  rate: string;
  amount: string;
}

const hanaBankLoan: Loan = {
  logoSrcUrl: 'https://www.hanafn.com/assets/img/ko/info/img-hana-symbol.png',
  finInst: '하나은행',
  name: '하나신용대출',
  rate: '8.4%',
  amount: '1,300만원',
};

const kbCardLoan: Loan = {
  logoSrcUrl: 'https://www.kbfg.com/kor/images/about/pc/img_symbol_logo.jpg',
  finInst: 'KB국민카드',
  name: 'KB국민이지플러스',
  rate: '14.3%',
  amount: '2,200만원',
};

const kbBankLoan: Loan = {
  logoSrcUrl: 'https://www.kbfg.com/kor/images/about/pc/img_symbol_logo.jpg',
  finInst: 'KB국민은행',
  name: 'KB비상금대출',
  rate: '12.5%',
  amount: '2,000만원',
};

const loanList: Loan[] = [hanaBankLoan, kbCardLoan, kbBankLoan];

const LoanInfoPage: React.FC = () => {
  const [assets, setAssets] = useState(100); // 자산 금액을 위한 state
  const [activate, setActivate] = useState(true);

  const onClick = () => {
    console.log('정렬해요.', activate);
    setActivate((activate) => !activate);
  };

  useEffect(() => {
    console.log('우선 순위 변경 로직 동작이 필요해요');
  }, [activate]);

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      {/* 헤더 */}
      <div className="flex h-12 mb-4 bg-hanaSilver20 items-center justify-start gap-2">
        <button>뒤로가기</button>
        <h1 className="text-hanaBlack80 text-lg font-semibold">
          맞춤 상품 안내
        </h1>
      </div>

      {/* 자산 정보 */}
      <div className="mt-6">
        <p className="text-right mb-2 pr-4 font-semibold text-hanaBlack80">
          내가 가진 자산이에요
        </p>
        <p className="text-right mb-2 text-sm pr-8 font-semibold  text-hanaBlack60">
          {assets}억
        </p>
        <div className="flex justify-center mt-4 mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={assets}
            onChange={(e) => setAssets(Number(e.target.value))}
            className="w-3/4"
          />
        </div>
      </div>

      <p className="ml-4 mt-2 mb-6 pl-2 text-hanaBlack80 font-semibold">
        나에게 맞는 대출 상품을 찾았어요
      </p>

      {/* 대출 종류 선택 */}
      <TabGroup>
        <TabList className={'flex gap-3'}>
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
                onClick={onClick}
                text="금리 낮은 순"
              />
              <OrderButton
                activate={!activate}
                onClick={onClick}
                text="한도 높은 순"
              />
            </div>
          </div>
          <TabPanel>
            {/* 전세 대출 리스트 */}
            <div className="mt-2 mr-4 ml-4">
              전세 대출 리스트가 들어가야 해요
            </div>
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
                />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default LoanInfoPage;
