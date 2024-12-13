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
import { parse, differenceInMonths, addMonths, format } from 'date-fns';
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
          // 숫자인지 확인
          if (typeof tickValue === 'number') {
            return tickValue === 0 ? tickValue : `${tickValue / 100000000}억`;
          }

          // 문자열인 경우
          const numericValue = parseFloat(tickValue);
          return isNaN(numericValue) || numericValue === 0
            ? numericValue
            : `${numericValue / 100000000}억`;
        },
      },
    },
  },
};

const MarketChart: React.FC<RealPriceInfo> = (realPriceInfo) => {
  function generateMonthLabels(dates1: string[], dates2: string[]): string[] {
    // 두 배열 합치기
    const allDates = [...dates1, ...dates2];

    // 가장 빠른 날짜와 가장 늦은 날짜 찾기
    const parsedDates = allDates.map((date) =>
      parse(date, 'yyyy-MM-dd', new Date())
    );
    const startDate = new Date(
      Math.min(...parsedDates.map((date) => date.getTime()))
    );
    const endDate = new Date(
      Math.max(...parsedDates.map((date) => date.getTime()))
    );

    const totalMonths = differenceInMonths(endDate, startDate);

    const interval = Math.max(1, Math.floor(totalMonths / 7)); // 9로 나눠 10개의 구간 생성

    const labels: string[] = [];
    for (let i = 0; i < 8; i++) {
      const labelDate = addMonths(startDate, i * interval);
      labels.push(format(labelDate, 'yy/MM'));
    }

    return labels;
  }

  const labels = generateMonthLabels(
    realPriceInfo.B1!.map((item: TradeInfo) => item.tradeDate),
    realPriceInfo.B2!.map((item: TradeInfo) => item.tradeDate)
  );

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
