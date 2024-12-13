// components/atoms/UserGuide.tsx
import React from 'react';

const UserGuide: React.FC = () => (
  <div className="w-full text-xs text-hanaBlack60 bg-white flex flex-col p-3 rounded-md mb-5">
    <ul className="list-disc pl-5">
      <li>선택 가능한 상담은 신청 당일부터 영업일 기준 5일 이내입니다.</li>
      <li>30분 단위로 신청 가능하며, 신청한 시간은 기본적으로 확정됩니다.</li>
      <li>예약이 마감된 날짜 및 시간은 선택할 수 없습니다.</li>
      <li>채팅예약 당일에는 예약건을 취소할 수 없습니다.</li>
      <li>신중히 상담 예약을 진행해주시기 바랍니다.</li>
    </ul>
  </div>
);

export default UserGuide;
