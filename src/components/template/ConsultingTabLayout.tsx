import { AiOutlineRight } from 'react-icons/ai';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import React, { useState } from 'react';
import ChatApp from '../../pages/chat/ChatApp';
import CommonBackground from '../atoms/CommonBackground';
import SemiTitle from '../atoms/SemiTitle';
import UpcomingConsultingComponent from '../molecules/UpcomingConsulting';

// Define the consulting type
type Consulting = {
  title: string;
  date: string;
};

const ConsultingTabLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'main' | 'chat'>('main');

  const consultingHistory: Consulting[] = [
    { title: '롯데캐슬엠파이어', date: '2024.10.27 19:07' },
    { title: '광장아파트', date: '2024.10.27 19:07' },
    { title: '푸르지오벨라르테', date: '2024.10.27 19:07' },
    { title: '비둘기 아파트', date: '2024.10.27 19:07' },
  ];

  const upcomingConsulting: Consulting = {
    title: '롯데캐슬엠파이어',
    date: '2024.10.27 19:07',
  };

  const handleConsultingClick = () => {
    setCurrentPage('chat'); // Switch to chat page
  };

  const handleBackToMain = () => {
    setCurrentPage('main'); // Switch back to main page
  };

  return (
    <div className="w-[500px]">
      <div className="top-0 absolute pl-2">
        <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[10px]">
          {currentPage === 'main' ? (
            <>
              <h1 className="text-xl font-bold flex justify-center p-10">
                상담현황 확인하기
              </h1>

              <div className="mb-8">
                <div className="flex items-center">
                  <span className="text-hanaGreen mr-2">
                    <FaRegCalendarCheck />
                  </span>
                  <h2 className="text-lg font-semibold text-hanaGreen">
                    진행 예정인 상담
                  </h2>
                </div>
                <p className="text-xs text-hanaGreen60 mb-4">
                  채팅방은 예약 시간이 되면 활성화 됩니다.
                </p>

                <div
                  className="bg-white shadow-sm p-4 rounded-lg flex items-center justify-between cursor-pointer"
                  onClick={handleConsultingClick} // Click event to open chat
                >
                  <UpcomingConsultingComponent
                    upcomingConsulting={upcomingConsulting}
                  />
                  <button className="text-gray-400">
                    <span className="sr-only">View details</span>
                    <PiPaperPlaneRightFill />
                  </button>
                </div>
              </div>

              <SemiTitle>지난 상담 내역</SemiTitle>
              <CommonBackground className="p-5">
                {consultingHistory.map((consulting, index) => (
                  <div
                    key={index}
                    className="border-b last:border-none py-4 flex items-center justify-between hover:transition-transform transform hover:scale-105"
                  >
                    <button className="w-full text-left">
                      <h3 className="text-md font-semibold text-hanaBlack">
                        {consulting.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        상담 일시: {consulting.date}
                      </p>
                    </button>
                    <AiOutlineRight className="text-gray-400 text-xl" />
                  </div>
                ))}
              </CommonBackground>
            </>
          ) : (
            // Render ChatApp when currentPage is 'chat'
            <div className="w-full">
              <ChatApp accessor={'guest'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultingTabLayout;
