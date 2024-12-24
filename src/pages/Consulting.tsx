import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import Consultant from '../assets/img/consultantPg.png';
import CommonBackground from '../components/atoms/CommonBackground';
import MobileHeader from '../components/atoms/MobileHeader';
import SemiTitle from '../components/atoms/SemiTitle';
import UpcomingConsultingComponent from '../components/molecules/UpcomingConsulting';
import { PlatformAPI } from '../platform/PlatformAPI.ts';
import { historyChatroomIdState } from '../recoil/chathistory/historyChatroomIdState';
import loanReservationAtom from '../recoil/loanReservation';
import { ChatRoom } from '../types/hanaAssetResponse.common';

const Consulting: React.FC = () => {
  const navigate = useNavigate();
  const [upcomingConsulting, setUpcomingConsulting] =
    useRecoilState(loanReservationAtom);

  const [consultingHistory, setConsultingHistory] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [_, setHistoryChatroomId] = useRecoilState(historyChatroomIdState);

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchConsultingHistory = async () => {
      try {
        const userId = 1;

        const response =
          await PlatformAPI.getCompletedChatroomsByUserId(userId);

        if (response && Array.isArray(response)) {
          setConsultingHistory(response);
        } else {
          setConsultingHistory([]);
        }
      } catch (err) {
        setError('상담 내역을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultingHistory();
  }, []);

  const handleHistoryClick = (chatroomId: string) => {
    if (!chatroomId) {
      console.error('Invalid chatroomId:', chatroomId);
      return;
    }
    setHistoryChatroomId(chatroomId);
    navigate('/chat-history');
  };

  useEffect(() => {
    setUpcomingConsulting({ reservationInfo: [], reservationTime: undefined });
  }, [setUpcomingConsulting]);

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
          <img src={Consultant} alt="상담 화면"></img>
          <UpcomingConsultingComponent />
        </div>
        <SemiTitle>지난 상담 내역</SemiTitle>
        <CommonBackground className="p-5 mt-4 mb-4">
          {loading ? (
            <p>상담 내역을 불러오는 중입니다...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : consultingHistory.length === 0 ? (
            <p>지난 상담 내역이 없습니다.</p>
          ) : (
            consultingHistory.map((consulting) => (
              <div
                key={consulting.chatroomId}
                className="border-b last:border-none py-4 flex items-center justify-between hover:transition-transform transform hover:scale-105"
              >
                <button
                  className="w-full text-left"
                  onClick={() => handleHistoryClick(consulting.chatroomId)}
                >
                  <h3 className="text-md font-semibold text-hanaBlack">
                    {consulting.chatroomTitle}
                  </h3>
                  <p className="text-xs text-gray-500">
                    상담 일시: {formatDateTime(consulting.reservedTime)}
                  </p>
                </button>
                <AiOutlineRight className="text-gray-400 text-xl" />
              </div>
            ))
          )}
        </CommonBackground>
      </div>
    </div>
  );
};

export default Consulting;
