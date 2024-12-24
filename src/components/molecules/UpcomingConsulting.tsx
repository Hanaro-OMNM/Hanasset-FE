import { IoMdCalendar } from 'react-icons/io';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import chatroomIdState from '../../recoil/chatroomId/atom.ts';
import { selectedEstateType } from '../../types/hanaAsset.ts';
import Button from '../atoms/Button.tsx';
import CommonBackground from '../atoms/CommonBackground';

const UpcomingConsultingComponent = () => {
  const navigate = useNavigate();
  const setChatroomId = useSetRecoilState(chatroomIdState);
  const chatroomId = useRecoilValue(chatroomIdState);
  const [reservationInfo, setReservationInfo] = useState<selectedEstateType[]>(
    []
  );
  const [reservationTime, setReservationTime] = useState<string | undefined>(
    undefined
  );
  const [reservationDateTime, setReservationDateTime] = useState<
    Date | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const userId = 1;
        const chatroomStatus = 'waiting';

        const chatroom = await PlatformAPI.findRoomDetails(
          userId,
          chatroomStatus
        );

        console.log('Fetched chatroom:', chatroom);

        if (chatroom) {
          setChatroomId(chatroom.chatroomId);
          setReservationInfo([{ name: chatroom.chatroomTitle || '제목 없음' }]);
          setReservationTime(chatroom.reservedTime);
        } else {
          setReservationInfo([]);
          setReservationTime(undefined);
        }
      } catch (err) {
        console.error('Error fetching reservation details:', err);
        setReservationInfo([]);
        setReservationTime(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [setChatroomId]);

  useEffect(() => {
    if (reservationTime) {
      const [date, time] = reservationTime.split(' ');
      const [year, month, day] = date?.split('-').map(Number) || [];
      const [hour, minute] = time?.split(':').map(Number) || [];

      if (year && month && day && hour && minute) {
        const parsedDateTime = new Date(year, month - 1, day, hour, minute);
        setReservationDateTime(parsedDateTime);
      }
    }
  }, [reservationTime]);

  const isReserved =
    reservationInfo.length > 0 && reservationTime !== undefined;

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
      alert(`ChatRoom ${chatroomId} deleted successfully.`);

      setReservationInfo([]);
      setReservationTime(undefined);
      setChatroomId('');

      window.location.href = '/consulting';
    } catch (error) {
      alert('상담 삭제 중 오류가 발생했습니다.');
      console.error('Error deleting chatroom:', error);
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
                {isReserved
                  ? reservationInfo.map((item) => item.name).join(', ')
                  : '상담 예약하러 가기'}
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
          상담 삭제
        </button>
      </div>
    </div>
  );
};

export default UpcomingConsultingComponent;
