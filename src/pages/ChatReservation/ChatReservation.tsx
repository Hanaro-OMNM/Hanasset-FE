import { PiBuildingApartment } from 'react-icons/pi';
import { useState } from 'react';
import Button from '../../components/atoms/Button';
import CommonBackground from '../../components/atoms/CommonBackground';

export default function ChatReservation() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  interface Asset {
    name: string;
  }
  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '서울 성동구 금호산8길 14' },
    { name: '서울 용산구 백범로 329' },
  ];

  const dateOptions = [
    { month: '10', day: '22', weekday: '화', disabled: false },
    { month: '10', day: '23', weekday: '수', disabled: false },
    { month: '10', day: '24', weekday: '목', disabled: true }, // Example disabled date
    { month: '10', day: '28', weekday: '금', disabled: false },
    { month: '11', day: '04', weekday: '월', disabled: false },
  ];

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      options.push({
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${hour}:00`,
        disabled: false,
        period: hour < 12 ? 'AM' : 'PM',
      });
      if (hour < 17) {
        options.push({
          value: `${hour.toString().padStart(2, '0')}:30`,
          label: `${hour}:30`,
          disabled: true,
          period: hour < 12 ? 'AM' : 'PM',
        });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
  };

  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-4 animate-slideInRight">
        <div className="p-6 w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-white/75 scrollbar-hide">
          <div className="text-2xl font-fontMedium mb-4 text-hanaBlack">
            실시간 채팅상담을 통해
            <br className="mb-4" /> 편리한 대출 상담을 받아보세요!
          </div>
          <CommonBackground className="p-6">
            <form>
              <div className="mb-10">
                <div className="mb-10">
                  <h2 className="text-lg font-semibold mb-4">
                    선택 부동산 매물
                  </h2>
                  <div className="flex flex-col gap-4 mr-1 ml-1">
                    {assets.map((asset, index) => (
                      <div key={index} className="w-full">
                        <CommonBackground className="flex p-4 h-20 rounded-lg shadow-md ">
                          <div className="w-full  flex h-full items-center p-2">
                            <PiBuildingApartment className="text-2xl text-hanaGreen" />
                            <div className="text-gray-800 font-medium ml-5">
                              {asset.name}
                            </div>
                          </div>
                        </CommonBackground>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
                  <div className="grid grid-cols-5 gap-2">
                    {dateOptions.map((date, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center p-4 rounded-lg shadow-md ${
                          date.disabled
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : selectedDate === `${date.month}-${date.day}`
                              ? 'bg-hanaGreen text-white' // hanaGreen 사용
                              : 'bg-white text-black cursor-pointer'
                        }`}
                        onClick={() =>
                          !date.disabled &&
                          handleDateChange(`${date.month}-${date.day}`)
                        }
                      >
                        <span className="text-xs font-medium">
                          {date.month}월
                        </span>
                        <span className="text-lg font-bold">{date.day}</span>
                        <span className="text-sm ">{date.weekday}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-4">
                  <div className="font-semibold mb-2">오전</div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {timeOptions
                      .filter((time) => time.period === 'AM')
                      .map((time, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 rounded-lg text-center shadow-md  ${
                            time.disabled
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : selectedTime === time.value
                                ? 'bg-hanaGreen text-white' // hanaGreen 사용
                                : 'bg-white text-hanaBlack80 cursor-pointer'
                          }`}
                          onClick={() =>
                            !time.disabled && handleTimeChange(time.value)
                          }
                        >
                          {time.label}
                        </div>
                      ))}
                  </div>

                  <div className="font-semibold mb-2">오후</div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeOptions
                      .filter((time) => time.period === 'PM')
                      .map((time, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 rounded-lg text-center shadow-md  ${
                            time.disabled
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : selectedTime === time.value
                                ? 'bg-hanaGreen text-white' // hanaGreen 사용
                                : 'bg-white text-hanaBlack80 cursor-pointer'
                          }`}
                          onClick={() =>
                            !time.disabled && handleTimeChange(time.value)
                          }
                        >
                          {time.label}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* User Guide */}
              <div className="w-full text-xs text-hanaBlack60 bg-white flex flex-col p-3 rounded-md mb-10">
                <ul className="list-disc pl-5">
                  <li>
                    선택 가능한 상담은 신청 당일부터 영업일 기준 5일 이내입니다.
                  </li>
                  <li>
                    30분 단위로 신청 가능하며, 신청한 시간은 기본적으로
                    확정됩니다.
                  </li>
                  <li>예약이 마감된 날짜 및 시간은 선택할 수 없습니다.</li>
                  <li>채팅예약 당일에는 예약건을 취소할 수 없습니다.</li>
                  <li>신중히 상담 예약을 진행해주시기 바랍니다.</li>
                </ul>
              </div>

              <Button text="실시간 채팅 상담 예약하기" />
            </form>
          </CommonBackground>
        </div>
      </div>
    </div>
  );
}
