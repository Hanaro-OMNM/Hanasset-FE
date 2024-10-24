// components/DoughnutChart.tsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
  data?: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  options?: object;
}

export default function DoughnutChart({ data, options }: DoughnutChartProps) {
  const defaultData = {
    labels: ['자동차', '부동산', '현금', '적금'],
    datasets: [
      {
        data: [12, 15, 3, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 16, 86, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const defaultOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 8,
          },
        },
      },
      tooltip: {
        callbacks: {
          title: () => '각 영역 타이틀',
        },
      },
    },
  };

  return (
    <Doughnut data={data || defaultData} options={options || defaultOptions} />
  );
}
