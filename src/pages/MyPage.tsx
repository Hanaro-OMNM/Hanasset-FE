import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Pagination from 'react-js-pagination';
import { useEffect, useState } from 'react';
import Button from '../components/atoms/Button';

export default function Main() {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  const data = {
    labels: ['자동차', '부동산', '현금', '적금'],
    datasets: [
      {
        label: '',
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
  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 8,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {},
        callbacks: {
          title: () => {
            return '각 영역 타이틀';
          },
        },
      },
    },
  };
  const handleClick = () => {
    alert('Button clicked!');
  };
  return (
    <div className="w-full p-6 bg-slate-500">
      {/*내 자산 */}
      <div>
        <div className="text-[#343c6a] text-base font-semibold font-['Inter'] mb-2">
          내 자산
        </div>
        <div className="w-[325px] h-[300px] bg-white rounded-[15px] shadow flex items-center justify-center">
          <Doughnut data={data} options={options} />
        </div>
      </div>
      {/*부동산/자동차 ==> 페이지 이동*/}
      <div>
        <div className="w-[325px] bg-white rounded-[10px] my-10 h-full">
          <button className="w-full  rounded-br-none rounded-bl-none">
            <div className=" text-[#1f2024] text-sm font-normal font-['Inter'] leading-tight">
              부동산
            </div>
            <div className="text-[#71727a] text-xs font-normal font-['Inter']  tracking-tight">
              우리집 등록하고 관리하기
            </div>
          </button>
          <hr />
          <button className="w-full rounded-tr-none rounded-tl-none">
            <div className=" text-[#1f2024] text-sm font-normal font-['Inter'] leading-tight">
              자동차
            </div>
            <div className="text-[#71727a] text-xs font-normal font-['Inter']tracking-tight">
              자동차 등록하고 관리하기
            </div>
          </button>
        </div>
      </div>
      {/*내 관심 지역 ==> 메인 지도에서 내 관심 지역으로 이동*/}
      <div>
        <div className="text-[#333b69] text-base font-semibold font-['Inter']">
          내 관심 지역
        </div>
        <div className="w-[325px] overflow-x-auto scrollbar-hide">
          <div className="m-5 flex gap-4 ">
            <div className="w-56 flex-shrink-0 bg-white rounded-[15px] shadow h-[85px] ">
              1
            </div>
            <div className="w-56 flex-shrink-0 bg-white rounded-[15px] shadow h-[85px] ">
              2
            </div>
            <div className="w-56 flex-shrink-0 bg-white rounded-[15px] shadow h-[85px] ">
              3
            </div>
            <div className="w-56 flex-shrink-0 bg-white rounded-[15px] shadow h-[85px] ">
              4
            </div>
            <div className="w-56 flex-shrink-0 bg-white rounded-[15px] shadow h-[85px] ">
              5
            </div>
            <div className="w-56 flex-shrink-0 bg-white rounded-[15px] shadow h-[85px] ">
              6
            </div>
          </div>
        </div>
      </div>
      {/*내 관심 아파트 ==> 메인 지도에서 내 관심 아파트로 이동*/}
      <div>
        <div className="text-[#333b69] text-base font-semibold font-['Inter']">
          내 관심 아파트
        </div>
        <div>
          <div className="w-[322px] h-[85px] bg-white rounded-[15px] shadow">
            1
          </div>
          <div className="w-[322px] h-[85px] bg-white rounded-[15px] shadow">
            2
          </div>
          <Button text="Click Me" onClick={handleClick} />
          <Button text="Go to Google" href="https://www.google.com" />
        </div>
      </div>
    </div>
  );
}
