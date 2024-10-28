import React from 'react';
import ProgressBar from '../components/ProgressBar';

interface EstimateProps {
  totalAsset: number;
}

const Estimate: React.FC<EstimateProps> = ({ totalAsset }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">예산</h2>
      <p className="text-lg mb-2">총 필요 자금 {totalAsset}억</p>
      <hr className="my-4 border-gray-300" />
      <div className="flex justify-between items-stretch mb-4">
        <div className="text-center flex-1">
          <p>자본금</p>
          <p className="text-teal-600">8.1억</p>
        </div>
        <div className="border-l border-gray-300 mx-2"></div>
        <div className="text-center flex-1">
          <p>대출금</p>
          <p className="text-teal-600">18.9억</p>
        </div>
        <div className="border-l border-gray-300 mx-2"></div>
        <div className="text-center flex-1">
          <p>취득세</p>
          <p className="text-teal-600">9,450만</p>
        </div>
        <div className="border-l border-gray-300 mx-2"></div>
        <div className="text-center flex-1">
          <p>중개보수</p>
          <p className="text-teal-600">1,890만</p>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="mb-4 flex justify-between">
        <p className="font-semibold">대출예상비용</p>
        <p className="text-teal-600">매월 약 902만</p>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="mb-4 flex justify-between">
        <p className="font-semibold">연간예상비용</p>
        <p className="text-teal-600">약 1.1억</p>
      </div>

      <hr className="my-4 border-gray-300" />
      <div className="container mx-auto">
        <ProgressBar totalAsset={totalAsset} maxLoan={18} />
      </div>

      <div className="flex justify-end items-center">
        <div className="text-right">
          <p className="text-sm text-gray-500">
            최대 대출 가능한 금액{' '}
            <span className="font-semibold text-teal-600">20.9억</span>
          </p>
          <p className="text-sm text-gray-500">단위: 원</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-teal-600 text-white my-4 py-2 px-4 rounded-lg w-full">
          대출금리 / 금액 확인하기
        </button>
      </div>
    </div>
  );
};

export default Estimate;
