import { AiOutlineCalendar, AiOutlineRight } from 'react-icons/ai';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import React from 'react';
import CommonBackground from '../atoms/CommonBackground';
import SemiTitle from '../atoms/SemiTitle';

const consultationHistory = [
  { title: '롯데캐슬엠파이어', date: '2024.10.27 19:07' },
  { title: '광장아파트', date: '2024.10.27 19:07' },
  { title: '푸르지오벨라르테', date: '2024.10.27 19:07' },
  { title: '비둘기 아파트', date: '2024.10.27 19:07' },
];

const MyChatLayout: React.FC = () => {
  return (
    <div className="p-6 bg-hanaSilver40 min-h-screen min-w-[420px]">
      {/* Upcoming Consultation Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex items-center">
          <span className=" text-hanaGreen mr-2">
            <FaRegCalendarCheck />
          </span>
          <h2 className="text-lg font-semibold text-hanaGreen">
            진행 예정인 상담
          </h2>
        </div>
        <p className="text-xs text-hanaGreen60 mb-4">
          채팅방은 예약 시간이 되면 활성화 됩니다.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <AiOutlineCalendar className="w-6 h-6 text-yellow-500 mr-3" />
            <div>
              <p className="font-semibold text-gray-800">롯데캐슬엠파이어</p>
              <p className="text-sm text-gray-600">
                2024년 10월 28일 13시 20분
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">View details</span>
            <PiPaperPlaneRightFill />
          </button>
        </div>
      </div>

      <SemiTitle>지난 상담 내역</SemiTitle>
      <CommonBackground className="p-5">
        {consultationHistory.map((consultation, index) => (
          <div
            key={index}
            className="border-b last:border-none py-4 flex items-center justify-between hover:transition-transform transform hover:scale-105"
          >
            <button className="w-full text-left">
              <h3 className="text-md">{consultation.title}</h3>
              <p className="text-xs text-gray-500">
                마지막 상담: {consultation.date}
              </p>
            </button>
            <AiOutlineRight className="text-gray-400 text-xl" />
          </div>
        ))}
      </CommonBackground>
    </div>
  );
};

export default MyChatLayout;
