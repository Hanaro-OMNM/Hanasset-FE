import { IoMdCalendar } from 'react-icons/io';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import chatroomIdState from '../../recoil/chatroomId/atom.ts';
import isLoginAtom from '../../recoil/isLogin';
import userIdAtom from '../../recoil/userId/atom.ts';
import Button from '../atoms/Button.tsx';
import CommonBackground from '../atoms/CommonBackground';

const UpcomingConsultingComponent = () => {
  const navigate = useNavigate();
  const setUserId = useSetRecoilState(userIdAtom);
  const setChatroomId = useSetRecoilState(chatroomIdState);
  const chatroomId = useRecoilValue(chatroomIdState);
  const [reservationTime, setReservationTime] = useState<string | undefined>(
    undefined
  );
  const [reservationDateTime, setReservationDateTime] = useState<
    Date | undefined
  >();
  const [chatroomTitle, setChatroomTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [isLogin] = useRecoilState(isLoginAtom);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!accessToken) {
        console.error('No access token available');
        return;
      }

      try {
        const chatroomStatus = 'waiting';
        const chatroom = await PlatformAPI.findRoomDetails(
          accessToken,
          chatroomStatus
        );
        if (chatroom) {
          setChatroomId(chatroom.chatroomId);
          setUserId(chatroom.userId);
          setIsReserved(true);
          setChatroomTitle(chatroom.chatroomTitle);
          setReservationTime(chatroom.reservedTime);
        } else {
          setReservationTime(undefined);
        }
      } catch {
        setReservationTime(undefined);
      } finally {
        setLoading(false);
      }
    };
    if (isLogin) {
      fetchRoomDetails();
    }
  }, [setChatroomId, accessToken]);

  useEffect(() => {
    if (reservationTime) {
      const [date, time] = reservationTime.split(' ');
      if (!date || !time) {
        console.error('Invalid reservationTime format:', reservationTime);
        return;
      }
      const [year, month, day] = date.split('-').map(Number);
      const [hour, minute] = time.split(':').map(Number);
      if (year && month && day && hour !== undefined && minute !== undefined) {
        const parsedDateTime = new Date(year, month - 1, day, hour, minute);
        setReservationDateTime(parsedDateTime);
      }
    }
  }, [reservationTime]);

  const currentDateTime = new Date();

  const isPast = reservationDateTime
    ? reservationDateTime > currentDateTime
    : undefined;

  const handleClick = () => {
    if (isPast) {
      alert('상담 시간이 되지 않았습니다.');
    } else if (isReserved) {
      navigate('/live-chat');
    } else {
      navigate('/select-estate');
    }
  };

  const formatReservationTime = (date?: string, time?: string): string => {
    if (!date || !time) return '';
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (!isReserved || !chatroomId) {
      alert('삭제할 상담이 없습니다.');
      return;
    }
    try {
      await PlatformAPI.deleteChatroom(chatroomId);
      alert(`삭제되었습니다`);
      setReservationTime(undefined);
      setChatroomId('');
      window.location.href = '/consulting';
    } catch (error) {
      console.log(error);
      alert('상담 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <CommonBackground className="p-1">
        <div
          className={`p-4 rounded-lg flex items-center justify-between cursor-pointer hover:transition-transform transform ${
            isPast === false
              ? 'hover:scale-105'
              : 'cursor-not-allowed opacity-50'
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center">
            <div
              className={`rounded-full w-10 h-10 p-2 mr-3 ${
                isReserved ? 'bg-yellow-00' : 'bg-[#D9D9D9]'
              }`}
            >
              <IoMdCalendar
                className={`w-6 h-6 ${
                  isReserved ? 'text-yellow-500' : 'text-[#B5B5B5]'
                }`}
              />
            </div>
            <div>
              <p className="text-gray-800 font-fontMedium text-lg">
                {isReserved ? chatroomTitle : '상담 예약하러 가기'}
              </p>
              <p className="text-sm text-gray-600">
                {isReserved
                  ? `상담 일시: ${formatReservationTime(
                      reservationTime?.split(' ')[0],
                      reservationTime?.split(' ')[1]
                    )}`
                  : '아직 예정된 상담이 없네요!'}
              </p>
            </div>
          </div>
          <button
            className={isReserved ? 'text-yellow-400' : 'text-gray-400'}
            disabled={isPast !== false}
          >
            <span className="sr-only">View details</span>
            <PiPaperPlaneRightFill className="w-6 h-6" />
          </button>
        </div>
      </CommonBackground>
      <div className="flex justify-between my-2">
        <Button
          text="채팅 상담 임시 입장"
          onClick={() => setReservationDateTime(new Date())}
        />
        <button
          onClick={handleDelete}
          className="ml-6 w-32 flex items-center justify-center text-center text-white px-4 py-2 text-md bg-hanaRed20 rounded-xl hover:bg-hanaRed transition duration-150 ease-in-out"
        >
          상담 취소
        </button>
      </div>
    </div>
  );
};

export default UpcomingConsultingComponent;
