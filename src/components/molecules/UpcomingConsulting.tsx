import { IoMdCalendar } from 'react-icons/io';

type Consulting = {
  title: string;
  date: string;
};

type Props = {
  upcomingConsulting: Consulting | null;
};

const UpcomingConsultingComponent = ({ upcomingConsulting }: Props) => {
  const isConsultingAvailable = upcomingConsulting !== null;

  return (
    <div className="flex items-center">
      <div
        className={`rounded-full w-10 h-10 p-2 mr-3 ${
          isConsultingAvailable ? 'bg-yellow-100' : 'bg-[#D9D9D9]'
        }`}
      >
        <IoMdCalendar
          className={`w-6 h-6 ${
            isConsultingAvailable ? 'text-yellow-500' : 'text-[#B5B5B5]'
          }`}
        />
      </div>
      <div>
        <p className="text-gray-800 font-fontMedium text-lg">
          {isConsultingAvailable
            ? upcomingConsulting.title
            : '상담 예약하러 가기'}
        </p>
        <p className="text-sm text-gray-600">
          {isConsultingAvailable
            ? `상담 일시: ${upcomingConsulting.date}`
            : '아직 예정된 상담이 없네요!'}
        </p>
      </div>
    </div>
  );
};

export default UpcomingConsultingComponent;
