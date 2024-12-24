import React, { useEffect, useState } from 'react';
import { PlatformAPI } from '../../../platform/PlatformAPI.ts';
import {
  RealEstateMarketPriceParamInfo,
  TradeInfo,
} from '../../../types/hanaAssetResponse.common.ts';
import MarketChart from './MarketChart';
import MarketInfoCard from './MarketInfoCard';
import TransactionTable from './TransactionTable';

interface MarketSectionProps {
  realEstateId: number;
}

const MarketSection: React.FC<MarketSectionProps> = ({ realEstateId }) => {
  const [realEstateMarketPriceParam, setRealEstateMarketPriceParam] =
    useState<RealEstateMarketPriceParamInfo | null>(null);
  const [jeonseMarketPrice, setJeonseMarketPrice] = useState<
    TradeInfo[] | null
  >(null);

  const [wolseMarketPrice, setWolseMarketPrice] = useState<TradeInfo[] | null>(
    null
  );

  useEffect(() => {
    const fetchRealEstateMarketPriceParam = async () => {
      try {
        const realEstateMarketPriceParam =
          await PlatformAPI.getRealEstateMarketPriceParam(realEstateId);
        const realEstateMarketPriceParamInfo =
          realEstateMarketPriceParam.result;
        setRealEstateMarketPriceParam(realEstateMarketPriceParamInfo);
      } catch (error) {
        console.error('Error fetching real estate type:', error);
      }
    };

    fetchRealEstateMarketPriceParam();
  }, [realEstateId]);

  useEffect(() => {
    const fetchRealEstateMarketPrice = async () => {
      try {
        if (realEstateMarketPriceParam) {
          const jeonseMarketPrice = await PlatformAPI.getRealEstateMarketPrice(
            realEstateMarketPriceParam,
            'B1'
          );
          const jeonseMarketPriceInfo = jeonseMarketPrice.result;
          setJeonseMarketPrice(jeonseMarketPriceInfo.list);

          const wolseMarketPrice = await PlatformAPI.getRealEstateMarketPrice(
            realEstateMarketPriceParam,
            'B2'
          );
          const wolseMarketPriceInfo = wolseMarketPrice.result;
          setWolseMarketPrice(wolseMarketPriceInfo.list);
        }
      } catch (error) {
        console.error('Error fetching real estate type:', error);
      }
    };

    fetchRealEstateMarketPrice();
  }, [realEstateMarketPriceParam]);

  const realPriceInfo = {
    B1: jeonseMarketPrice,
    B2: wolseMarketPrice,
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">시세</div>
      </div>
      <div className="flex border-t">
        <MarketInfoCard tradeInfo={jeonseMarketPrice} type="전세" />
        <MarketInfoCard tradeInfo={wolseMarketPrice} type="월세" />
      </div>
      <div className="mt-8 flex justify-center">
        <MarketChart {...realPriceInfo} />
      </div>
      <TransactionTable {...realPriceInfo} />
    </div>
  );
};

export default MarketSection;
