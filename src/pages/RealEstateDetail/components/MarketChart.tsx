import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';
import { RealPriceInfo, TradeInfo } from '../../../types/global';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (tickValue: string | number) {
          return `${tickValue}억`;
        },
      },
    },
  },
};

const labels = [
  '21.10',
  '22.01',
  '22.04',
  '22.07',
  '22.10',
  '23.01',
  '23.04',
  '23.07',
  '23.10',
  '24.01',
  '24.04',
  '24.07',
  '24.10',
];

const MarketChart: React.FC<RealPriceInfo> = (realPriceInfo) => {
  const data = {
    labels,
    datasets: [
      {
        label: '전세',
        data: realPriceInfo.B1!.map((item: TradeInfo) => item.deposit)!,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: '월세',
        data: realPriceInfo.B2!.map((item: TradeInfo) => item.deposit)!,
        borderColor: 'rgba(234, 88, 12, 1)',
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(234, 88, 12, 0.7)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default MarketChart;
