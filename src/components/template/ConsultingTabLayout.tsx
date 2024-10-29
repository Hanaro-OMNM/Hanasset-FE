import { AiOutlineRight } from 'react-icons/ai';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { IoMdCalendar } from 'react-icons/io';
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

const ConsultingTabLayout: React.FC = () => {
  /*
    ConsultingTabLayout이란?
    
    : Navbar에서 "상담" 버튼 눌렀을 때 나오는 사이드바 부분입니다. 
    ConsultantLayout이랑 혼동 주의! 

  */

  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-2">
        <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[10px]">
          <h1 className="text-xl font-bold flex justify-center p-10">
            상담현황 확인하기
          </h1>

          <div className=" mb-8">
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

            <div className="bg-white shadow-sm p-4 rounded-lg flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <div className="rounded-full w-10 h-10 p-2 mr-3 bg-yellow-100">
                  <IoMdCalendar className="w-6 h-6 text-yellow-500 " />
                </div>

                <div>
                  <p className=" text-gray-800 font-bold">롯데캐슬엠파이어</p>
                  <p className="text-sm text-gray-600">
                    2024년 10월 28일 13시 20분
                  </p>
                </div>
              </div>
              <button className="text-gray-400 ">
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
                  <h3 className="text-md font-semibold text-hanaBlack80">
                    {consultation.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    마지막 상담: {consultation.date}
                  </p>
                </button>
                <AiOutlineRight className="text-gray-400 text-xl" />
              </div>
            ))}
          </CommonBackground>
        </div>
      </div>
    </div>
  );
};
export default ConsultingTabLayout;
