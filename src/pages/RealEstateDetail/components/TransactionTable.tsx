import React, { useState } from 'react';
import { RealPriceInfo } from '../../../types/hanaAsset';

const TransactionTable: React.FC<RealPriceInfo> = (realPriceInfo) => {
  const [filter, setFilter] = useState<'전세' | '월세' | '전체'>('전체');
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const jeonseTransactions = realPriceInfo!.B1!.map((item) => {
    return { ...item, type: '전세' };
  });

  const wolseTransactions = realPriceInfo!.B2!.map((item) => {
    return { ...item, type: '월세' };
  });

  const totalTransactions = jeonseTransactions.concat(wolseTransactions);

  const sortedTransactions = totalTransactions.sort((a, b) => {
    const dateA = new Date(a.tradeDate).getTime(); // tradeDate를 Date 객체로 변환 후 시간값 추출
    const dateB = new Date(b.tradeDate).getTime();
    return dateB - dateA; // 오름차순 정렬 (내림차순은 dateB - dateA)
  });

  const filteredTransactions = sortedTransactions.filter(
    (transaction) => filter === '전체' || transaction.type === filter
  );

  return (
    <div className="p-4 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">실거래가</h2>
        <div className="flex gap-2">
          {['전체', '전세', '월세'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${
                  filter === type
                    ? 'bg-hanaColor2 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => setFilter(type as '전세' | '월세' | '전체')}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 거래 내역 테이블 */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-4 py-2">계약일</th>
            <th className="border px-4 py-2">거래</th>
            <th className="border px-4 py-2">가격</th>
            <th className="border px-4 py-2">층</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredTransactions
            .slice(0, visibleCount)
            .map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 animate-fadeInUp">
                <td className="border px-4 py-2 text-center">
                  {transaction.tradeDate}
                </td>
                <td className="border px-4 py-2 text-center">
                  {transaction.type}
                </td>
                <td className="border px-4 py-2 text-center">
                  {transaction.type === '전세'
                    ? (transaction.deposit / 100000000).toFixed(1) + '억'
                    : (transaction.deposit / 100000000).toFixed(1) +
                      `억/${transaction.monthlyRent / 10000}`}
                </td>
                <td className="border px-4 py-2 text-right">
                  {transaction.floor}층
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* 더 보기 버튼 */}
      {visibleCount < filteredTransactions.length && (
        <button
          className="mt-3 mx-auto block text-hanaColor2 font-semibold hover:underline transition-all duration-200"
          onClick={handleLoadMore}
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default TransactionTable;
