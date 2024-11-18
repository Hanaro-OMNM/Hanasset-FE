import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Consultant from '../assets/img/consultantPg.png';
import CommonBackground from '../components/atoms/CommonBackground';
import MobileHeader from '../components/atoms/MobileHeader';
import SemiTitle from '../components/atoms/SemiTitle';
import UpcomingConsultingComponent from '../components/molecules/UpcomingConsulting';

type Consulting = {
  title: string;
  date: string;
};

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

const Consulting: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  /*
    ConsultingTabLayout이란?

    : Navbar에서 "상담" 버튼 눌렀을 때 나오는 사이드바 부분입니다.
    ConsultantLayout이랑 혼동 주의!

  */
  return (
    <div className="top-0 absolute pl-4 animate-slideInRight">
      <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-gray-50/90 backdrop-blur-[10px] overflow-y-auto scrollbar-hide">
        <MobileHeader title="상담현황 확인하기" onBack={() => navigate('/')} />
        <div className="mt-6 mb-8">
          <div>
            <div className="text-2xl font-fontMedium">김하나님의</div>
            <div className="font-fontBold text-2xl">상담 현황</div>
          </div>
          <p className="text-xs mt-2 text-hanaGreen60 mb-4">
            채팅방은 예약 시간이 되면 활성화 됩니다.
          </p>
          <img src={Consultant}></img>

          <CommonBackground className="p-1">
            <div
              className="p-4 rounded-lg flex items-center justify-between cursor-pointer hover:transition-transform transform hover:scale-105"
              onClick={() =>
                navigate(isActive ? '/live-chat' : '/select-estate')
              }
            >
              <UpcomingConsultingComponent
                upcomingConsulting={upcomingConsulting}
                isActive={isActive}
              />
            </div>
          </CommonBackground>
          <button onClick={() => setIsActive(!isActive)}>set</button>
        </div>
        <SemiTitle>지난 상담 내역</SemiTitle>
        <CommonBackground className="p-5 mt-4 mb-4">
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
      </div>
    </div>
  );
};
export default Consulting;
