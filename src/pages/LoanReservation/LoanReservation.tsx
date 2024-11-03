import { useState } from 'react';
import Button from '../../components/atoms/Button';
import CustomSelect from '../../components/atoms/CustomSelect';

export default function LoanReservation() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedProp, setSelectedProp] =
    useState<string>('(전세) 부동산 매물');

  const dateOptions = [
    { value: '2024-10-22', label: '2024-10-22 (화)', disabled: false },
    { value: '2024-10-23', label: '2024-10-23 (수)', disabled: false },
    { value: '2024-10-24', label: '2024-10-24 (목)', disabled: true }, // 예시로 비활성화
    { value: '2024-10-28', label: '2024-10-28 (월)', disabled: false },
    { value: '2024-11-04', label: '2024-11-04 (월)', disabled: false },
  ];

  const timeOptions = [
    { value: '09:00', label: '9:00', disabled: true },
    { value: '10:00', label: '10:00', disabled: false },
    { value: '11:00', label: '11:00', disabled: true },
    { value: '12:00', label: '12:00', disabled: false },
    { value: '14:00', label: '14:00', disabled: false },
    { value: '15:00', label: '15:00', disabled: false },
  ];

  const handleDateChange = (value: string) => {
    setSelectedDate(value);

    console.log('선택된 날짜:', selectedDate);
  };

  //임시 함수(의미 x)
  const handlePropChange = () => {
    setSelectedProp('(전세) 부동산 매물');

    console.log('선택된 날짜:', selectedDate);
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    console.log('선택된 시간:', selectedTime);
  };

  return (
    <div className="w-[430px] top-0 absolute backdrop-blur-[10px] bg-white/75 overflow-y-auto p-6 h-full flex flex-col items-center ">
      <h1 className="text-xl font-bold mb-4 text-hanaBlack80">
        실시간 채팅상담을 통해 편리한 대출 상담을 받아보세요!
      </h1>
      <form>
        <div className="mb-10">
          <div className="mb-4">
            <span
              className="text-sm font-medium text-gray-700"
              onClick={handlePropChange}
            >
              선택 부동산 매물
            </span>
            <div className="mt-3 flex items-center full h-11 appearance-none rounded-lg shadow-md bg-white py-1 px-3 text-md text-hanaBlack80 focus:outline-none focus:border-hanaSilver60">
              <span>{selectedProp}</span>
            </div>
          </div>
          {/* 예약 날짜 선택 */}
          <div className="mb-4">
            <CustomSelect
              label="예약 날짜"
              description=""
              options={dateOptions}
              onChange={handleDateChange}
            />
          </div>

          {/* 예약 시간 선택 */}
          <div className="mb-4">
            <CustomSelect
              label="예약 시간"
              description=""
              options={timeOptions}
              onChange={handleTimeChange}
            />
          </div>
        </div>

        {/* 이용 안내 */}
        <div className="w-full text-xs text-hanaBlack60 bg-white flex flex-col p-3 rounded-md mb-10">
          <ul className="list-disc pl-5">
            <li>
              선택 가능한 상담은 신청 당일부터 10일 이내입니다. (영업일 기준)
            </li>
            <li>
              30분 단위로 신청 가능하며, 신청한 시간은 기본적으로 확정됩니다.
            </li>
            <li>예약이 마감된 날짜 및 시간은 선택할 수 없습니다.</li>
            <li>채팅예약 당일에는 예약건을 취소할 수 없습니다.</li>
            <li>신중히 상담 예약을 진행해주시기 바랍니다. </li>
          </ul>
        </div>

        <Button
          onClick={() => alert('예약되었습니다.')}
          text="실시간 채팅 상담 예약하기"
        />
      </form>
    </div>
  );
}
