import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Expectation from '../../LoanRecommend/components/Expectation';

interface EstimateProps {
  deposit: number;
}

const Estimate: React.FC<EstimateProps> = ({ deposit }) => {
  const navigate = useNavigate();
  const [predictedAmount, setPredictedAmount] = useState(0);

  const totalAsset =
    deposit >= 100000000
      ? (deposit / 100000000).toFixed(1) + '억'
      : (deposit / 10000).toFixed(0) + '만';

  const monthlyPredictedAmount = (
    (predictedAmount * 100000000 * 0.04) /
    120000
  ).toFixed(0);
  const yearlyPredictedAmount = (
    (predictedAmount * 100000000 * 0.04) /
    10000
  ).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">예산</h2>
      <p className="text-lg mb-2">총 필요 자금 {totalAsset} 원</p>
      <hr className="my-4 border-gray-300" />

      <div className="mb-4 flex justify-between">
        <p className="font-semibold">대출예상비용</p>
        <p className="text-teal-600">매월 약 {monthlyPredictedAmount}만원</p>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="mb-4 flex justify-between">
        <p className="font-semibold">연간예상비용</p>
        <p className="text-teal-600">약 {yearlyPredictedAmount}만원</p>
      </div>

      <hr className="my-4 border-gray-300" />
      <div className="container mx-auto">
        <Expectation
          totalPrice={deposit / 10000000}
          maxLoan={Number(((deposit / 10000000) * 0.8).toFixed(0))}
          setPredictedAmount={setPredictedAmount}
        />
      </div>

      <div className="flex justify-end items-center">
        <div className="text-right">
          <p className="text-sm text-gray-500">
            최대 대출 가능한 금액{' '}
            <span className="font-semibold text-teal-600">
              {((deposit / 100000000) * 0.8).toFixed(1)}억원
            </span>
          </p>
          <p className="text-sm text-gray-500">단위: 원</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/loan-recommend')}
          className="bg-hanaGreen60 text-white my-4 py-2 px-4 rounded-lg w-full hover:bg-hanaColor2"
        >
          대출금리 / 금액 확인하기
        </button>
      </div>
    </div>
  );
};

export default Estimate;
