import React from 'react';
import { TradeInfo } from '../../../types/global';

interface MarketInfoCardProps {
  tradeInfo: TradeInfo[];
  type: string;
  floor: string;
}
const MarketInfoCard: React.FC<MarketInfoCardProps> = (marketInfoCardProps) => {
  const isJeonse = marketInfoCardProps.type === '전세';
  const latestTrade = marketInfoCardProps.tradeInfo.reduce(
    (latest, current) => {
      // 날짜 문자열을 Date 객체로 변환하여 비교
      return new Date(current.tradeDate) > new Date(latest.tradeDate)
        ? current
        : latest;
    }
  );

  const latestYear = latestTrade.tradeDate!.slice(0, 4);
  const latestMonth = latestTrade.tradeDate!.slice(6, 7);
  const latestDay = latestTrade.tradeDate!.slice(9, 11);

  const latestTradeDeposit =
    (latestTrade.deposit / 100000000).toFixed(1) + '억';
  const latestTradeMonthlyRent = latestTrade.monthlyRent / 10000;

  function calculateAverage(key: keyof TradeInfo): number {
    const validItems = marketInfoCardProps.tradeInfo.filter(
      (item) => item[key] !== null && item[key] !== undefined
    );
    const sum = validItems.reduce(
      (acc, item) => acc + (item[key] as number),
      0
    );
    return validItems.length > 0 ? sum / validItems.length : 0;
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
        {latestTradeDeposit}
        {!isJeonse ? '/' + latestTradeMonthlyRent : ''}
      </p>
      <p className="text-gray-500 mt-1 text-sm">
        {latestYear}년 {latestMonth}월 {latestDay}일/
        {marketInfoCardProps.floor}층
      </p>
      <p className="text-sm mt-2 text-gray-600">
        매물평균가{' '}
        {isJeonse ? averageDeposit : averageDeposit + '/' + averageMonthlyRent}
      </p>
    </div>
  );
};

export default MarketInfoCard;
