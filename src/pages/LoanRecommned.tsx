// LoanInfoPage.tsx
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

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

// OrderButton Components
interface OrderButtonProps {
  activate: boolean;
  onClick: () => void;
  text: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  activate,
  onClick,
  text,
}) => {
  return (
    <div>
      <button
        className={clsx(
          activate && 'text-xs font-semibold',
          !activate && 'text-xs text-hanaSilver80 font-semibold'
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

// LogoImage Components
interface LogoImageProps {
  logoSrcUrl: string;
}

const LogoImage: React.FC<LogoImageProps> = ({ logoSrcUrl }) => {
  return (
    <div className="w-12 h-12 rounded-[10%]">
      <img
        className="h-full w-full rounded-md bg-hanaBlack20 object-cover"
        src={logoSrcUrl}
        alt="fin_inst_logo"
      />
    </div>
  );
};

// FinInst Components
interface FinInstProps {
  isHana: boolean;
  finInst: string;
}

const FinInst: React.FC<FinInstProps> = ({ isHana, finInst }) => {
  return (
    <h5
      className={clsx(
        isHana && 'mt-1 h-5 text-hanaBlack20 text-sm font-semibold mb-auto',
        !isHana && 'mt-1 h-5 text-hanaBlack80 text-sm font-semibold mb-auto'
      )}
    >
      {finInst}
    </h5>
  );
};

// LoanRate Components
interface LoanRateProps {
  isHana: boolean;
  rate: string;
}

const LoanRate: React.FC<LoanRateProps> = ({ isHana, rate }) => {
  return (
    <h6
      className={clsx(
        isHana && 'h-5 text-hanaGold20 text-xs font-semibold mt-auto',
        !isHana && 'h-5 text-black text-xs font-semibold mt-auto'
      )}
    >
      {rate}
    </h6>
  );
};

// LoanName Components
interface LoanNameProps {
  isHana: boolean;
  name: string;
}

const LoanName: React.FC<LoanNameProps> = ({ isHana, name }) => {
  return (
    <h6
      className={clsx(
        isHana && 'mt-1 h-5 text-hanaSilver40 text-xs font-medium align-middle',
        !isHana && 'mt-1 h-5 text-hanaSilver text-xs font-medium align-middle'
      )}
    >
      {name}
    </h6>
  );
};

// LoanAmount Components
interface LoanAmountProps {
  isHana: boolean;
  amount: string;
}

const LoanAmount: React.FC<LoanAmountProps> = ({ isHana, amount }) => {
  return (
    <h6
      className={clsx(
        isHana && 'h-5 text-hanaGold20 text-xs font-semibold',
        !isHana && 'h-5 text-black text-xs font-semibold'
      )}
    >
      {amount}
    </h6>
  );
};

// LoanCard Components
interface LoanCardProps {
  isHana: boolean;
  logoSrcUrl: string;
  finInst: string;
  name: string;
  rate: string;
  amount: string;
}

const LoanCard: React.FC<LoanCardProps> = ({
  isHana,
  logoSrcUrl,
  finInst,
  name,
  rate,
  amount,
}) => {
  return (
    <div>
      <div
        className={clsx(
          isHana && 'bg-hanaGreen80 p-4 rounded-lg shadow flex gap-2',
          !isHana && 'bg-hanaSilver20 p-4 rounded-lg shadow flex gap-2'
        )}
      >
        <LogoImage logoSrcUrl={logoSrcUrl} />

        <div className="w-24 flex-col justify-center items-center">
          <FinInst isHana={isHana} finInst={finInst} />
          <LoanRate isHana={isHana} rate={rate} />
        </div>

        <div className="flex-col justify-center">
          <LoanName isHana={isHana} name={name} />
          <LoanAmount isHana={isHana} amount={amount} />
        </div>
      </div>
    </div>
  );
};

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
      <div className="flex items-center justify-between">
        <button className="text-gray-600">뒤로가기</button>
        <h1 className="text-lg font-semibold">맞춤 상품 안내</h1>
      </div>

      {/* 자산 정보 */}
      <div className="mt-6">
        <h2 className="text-center text-gray-700">내가 가진 자산이에요</h2>
        <div className="text-center text-2xl font-bold mt-2">{assets}억</div>
        <div className="flex justify-center mt-4">
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

      <h3 className="ml-4 mt-8 mb-6 text-hanaBlack80 font-semibold">
        나에게 맞는 대출 상품을 찾았어요
      </h3>

      {/* 대출 종류 선택 */}

      <TabGroup>
        <TabList className={'flex gap-x-3'}>
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
          {/* 전세 대출 TabPanel */}
          <TabPanel>
            <div>전세 대출 리스트가 들어가야 해요</div>
          </TabPanel>
          {/* 신용 대출 TabPanel */}
          <TabPanel>
            {/* 대출 상품 리스트 */}
            <div className="mt-6 mr-4 ml-4">
              <div className="mt-4 space-y-4">
                {/* 우선 순위 선택 */}
                <div className="ml-4 flex gap-2">
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

                {/* 대출 상품 카드 */}
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
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default LoanInfoPage;
