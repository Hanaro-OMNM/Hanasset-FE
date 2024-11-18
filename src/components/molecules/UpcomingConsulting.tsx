import { IoMdCalendar } from 'react-icons/io';
import { PiPaperPlaneRightFill } from 'react-icons/pi';

type Consulting = {
  title: string;
  date: string;
};

type Props = {
  upcomingConsulting: Consulting | null;
  isActive: boolean;
};

const UpcomingConsultingComponent = ({
  upcomingConsulting,
  isActive,
}: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div
          className={`rounded-full w-10 h-10 p-2 mr-3 ${
            isActive ? 'bg-yellow-100' : 'bg-[#D9D9D9]'
          }`}
        >
          <IoMdCalendar
            className={`w-6 h-6 ${
              isActive ? 'text-yellow-500' : 'text-[#B5B5B5]'
            }`}
          />
        </div>
        <div>
          <p className="text-gray-800 font-fontMedium text-lg">
            {isActive && upcomingConsulting
              ? upcomingConsulting.title
              : '상담 예약하러 가기'}
          </p>
          <p className="text-sm text-gray-600">
            {isActive && upcomingConsulting
              ? `상담 일시: ${upcomingConsulting.date}`
              : '아직 예정된 상담이 없네요!'}
          </p>
        </div>
      </div>
      <button className={isActive ? 'text-yellow-400' : 'text-gray-400'}>
        <span className="sr-only">View details</span>
        <PiPaperPlaneRightFill className="w-6 h-6" />
      </button>
    </div>
  );
};

export default UpcomingConsultingComponent;
