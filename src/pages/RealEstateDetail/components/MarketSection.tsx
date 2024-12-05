import React from 'react';
import { RealPriceInfo } from '../../../types/global';
import MarketChart from './MarketChart';
import MarketInfoCard from './MarketInfoCard';
import TransactionTable from './TransactionTable';

interface MarketSectionProps {
  supplyArea: number | undefined;
  exclusiveArea: number | undefined;
  floor: string | undefined;
  realPriceInfo: RealPriceInfo | undefined;
}

const MarketSection: React.FC<MarketSectionProps> = ({
  supplyArea,
  exclusiveArea,
  floor,
  realPriceInfo,
}) => {
  const strSupplyArea = supplyArea! + 'm²';
  const strExclusiveArea = exclusiveArea! + 'm²';
  const jeonseMarketInfo = realPriceInfo?.B1;
  const wolseMarketInfo = realPriceInfo?.B2;
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">시세</div>
        <p className="text-xs text-gray-500">
          {strSupplyArea}/{strExclusiveArea}(평형)
        </p>
      </div>
      <div className="flex border-t">
        <MarketInfoCard
          tradeInfo={jeonseMarketInfo!}
          type="전세"
          floor={floor!}
        />
        <MarketInfoCard
          tradeInfo={wolseMarketInfo!}
          type="월세"
          floor={floor!}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <MarketChart {...realPriceInfo} />
      </div>
      <TransactionTable {...realPriceInfo} />
    </div>
  );
};

export default MarketSection;
