import React from 'react';
import { TradeInfo } from '../../../types/hanaAsset';

interface MarketInfoCardProps {
  tradeInfo: TradeInfo[] | null;
  type: string;
}
const MarketInfoCard: React.FC<MarketInfoCardProps> = (marketInfoCardProps) => {
  const isJeonse = marketInfoCardProps.type === '전세';
  const latestTrade =
    marketInfoCardProps.tradeInfo && marketInfoCardProps.tradeInfo.length > 0
      ? marketInfoCardProps.tradeInfo.reduce((latest, current) => {
          // 날짜 문자열을 Date 객체로 변환하여 비교
          return new Date(current.tradeDate) > new Date(latest.tradeDate)
            ? current
            : latest;
        })
      : null;

  const latestYear = latestTrade ? latestTrade.tradeDate.slice(0, 4) : null;
  const latestMonth = latestTrade ? latestTrade.tradeDate.slice(5, 7) : null;
  const latestDay = latestTrade ? latestTrade.tradeDate.slice(8, 10) : null;

  const latestTradeDeposit = latestTrade
    ? (latestTrade.deposit / 100000000).toFixed(1) + '억'
    : null;
  const latestTradeMonthlyRent = latestTrade
    ? latestTrade.monthlyRent / 10000
    : null;

  function calculateAverage(key: keyof TradeInfo): number {
    const validItems = marketInfoCardProps.tradeInfo
      ? marketInfoCardProps.tradeInfo.filter(
          (item) => item[key] !== null && item[key] !== undefined
        )
      : null;
    const sum = validItems
      ? validItems.reduce((acc, item) => acc + (item[key] as number), 0)
      : null;
    return validItems ? sum! / validItems.length : 0;
  }

  // deposit과 monthlyRent의 평균 계산
  const averageDeposit =
    (calculateAverage('deposit') / 100000000).toFixed(2) + '억';
  const averageMonthlyRent = calculateAverage('monthlyRent') / 10000;

  return (
    <div className="w-1/2 border-r last:border-r-0 p-4">
      <h3
        className={`text-lg font-semibold ${isJeonse ? 'text-teal-600' : 'text-rose-600'}`}
      >
        {marketInfoCardProps.type}
      </h3>
      <p className="text-sm text-gray-500">최근 실거래가</p>
      <p className="text-2xl font-bold mt-2">
        {latestTradeDeposit ? (
          <div>
            {latestTradeDeposit}
            {!isJeonse ? '/' + latestTradeMonthlyRent : ''}
          </div>
        ) : (
          <div>정보 없음</div>
        )}
      </p>
      <p className="text-gray-500 mt-1 text-sm">
        {latestTrade ? (
          <div>
            {latestYear}년 {latestMonth}월 {latestDay}일{' '}
            {latestTrade && latestTrade.floor}층
          </div>
        ) : (
          <></>
        )}
      </p>
      <p className="text-sm mt-2 text-gray-600">
        {averageDeposit && averageMonthlyRent ? (
          <div>
            매물평균가{' '}
            {isJeonse
              ? averageDeposit
              : averageDeposit + '/' + averageMonthlyRent}
          </div>
        ) : (
          <></>
        )}
      </p>
    </div>
  );
};

export default MarketInfoCard;
