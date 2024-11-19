import { IoMdCalendar } from 'react-icons/io';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { selectedEstateType } from '../../types/global';
import Button from '../atoms/Button.tsx';
import CommonBackground from '../atoms/CommonBackground';

interface LoanReservationState {
  reservationInfo: selectedEstateType[];
  reservationTime: string | undefined;
}

type Props = {
  upcomingConsulting: LoanReservationState; // LoanReservationState 타입의 상담 예약 정보
  setUpcomingConsulting: (newState: LoanReservationState) => void; // 상태를 업데이트하는 함수
};

const UpcomingConsultingComponent = ({
  upcomingConsulting,
  setUpcomingConsulting,
}: Props) => {
  const navigate = useNavigate();
  const isReserved =
    upcomingConsulting.reservationInfo && upcomingConsulting.reservationTime;
  const maxLength = 16; // 최대 길이 설정
  const title = upcomingConsulting.reservationInfo
    .map((item) => item.name)
    .join(', ');

  const truncatedTitle =
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  const [reservationDateTime, setReservationDateTime] = useState<
    Date | undefined
  >();

  const date = upcomingConsulting.reservationTime?.split(' ')[0];
  const time = upcomingConsulting.reservationTime?.split(' ')[1];
  const year = 2024;
  const [month, day] = date?.split('-') || [];
  const [hour, minute] = time?.split(':') || [];

  useEffect(() => {
    if (year && month && day && hour && minute && !reservationDateTime) {
      setReservationDateTime(
        new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hour),
          Number(minute)
        )
      );
    }
  }, [year, month, day, hour, minute, reservationDateTime]);

  const currentDateTime = new Date();

  const isPast = reservationDateTime
    ? reservationDateTime > currentDateTime
    : undefined;

  const handleClick = () => {
    if (isPast) {
      alert('상담 시간이 되지 않았습니다.');
    } else {
      navigate(isReserved ? '/live-chat' : '/select-estate');
    }
  };

  return (
    <div>
      <CommonBackground className="p-1">
        <div
          className={`p-4 rounded-lg flex items-center justify-between cursor-pointer hover:transition-transform transform ${
            isPast ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div
                className={`rounded-full w-10 h-10 p-2 mr-3 ${
                  isReserved ? 'bg-yellow-100' : 'bg-[#D9D9D9]'
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
                  {isReserved ? truncatedTitle : '상담 예약하러 가기'}
                </p>
                <p className="text-sm text-gray-600">
                  {isReserved
                    ? `상담 일시: 2024.${month}.${day} ${time}`
                    : '아직 예정된 상담이 없네요!'}
                </p>
              </div>
            </div>
            <button
              className={isReserved ? 'text-yellow-400' : 'text-gray-400'}
              disabled={isPast}
            >
              <span className="sr-only">View details</span>
              <PiPaperPlaneRightFill className="w-6 h-6" />
            </button>
          </div>
        </div>
      </CommonBackground>
      <div className="flex justify-between my-2">
        <Button
          text="채팅 상담 임시 입장"
          onClick={() => setReservationDateTime(new Date())}
        />
        <button
          onClick={() => {
            setUpcomingConsulting({
              reservationInfo: [],
              reservationTime: undefined,
            });
            setReservationDateTime(new Date());
          }}
          className="ml-6 w-32 flex items-center justify-center text-center text-white px-4 py-2 text-md bg-hanaRed20 rounded-xl hover:bg-hanaRed transition duration-150 ease-in-out"
        >
          상담 삭제
        </button>
      </div>
    </div>
  );
};

export default UpcomingConsultingComponent;
