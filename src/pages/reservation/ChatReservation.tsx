// ChatReservation.tsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import reserve_hand from '../../assets/img/reserve_img.png';
import Button from '../../components/atoms/Button';
import CommonBackground from '../../components/atoms/CommonBackground';
import MobileHeader from '../../components/atoms/MobileHeader';
import AssetItem from './AssetItem';
// 새로 만든 컴포넌트
import DatePicker from './DatePicker';
// 새로 만든 컴포넌트
import TimePicker from './TimePicker';
// 새로 만든 컴포넌트
import UserGuide from './UserGuide';

// 새로 만든 컴포넌트

export default function ChatReservation() {
  const nav = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const assets = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '서울 성동구 금호산8길 14' },
    { name: '서울 용산구 백범로 329' },
  ];

  const dateOptions = [
    { month: '10', day: '22', weekday: '화', disabled: false },
    { month: '10', day: '23', weekday: '수', disabled: false },
    { month: '10', day: '24', weekday: '목', disabled: true },
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
          disabled: false,
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

  const handleSubmit = () => {
    alert('예약이 완료되었습니다');
    nav('/');
  };

  const onBack = (): void => {
    window.history.back(); // 브라우저의 이전 페이지로 이동
  };

  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="p-6 w-[420px] backdrop-blur-[10px] absolute top-0 h-screen overflow-y-auto bg-white/75 scrollbar-hide">
        <MobileHeader onBack={onBack} title="채팅 예약하기" />

        <div className="text-2xl font-fontMedium mb-4 text-hanaBlack">
          실시간 채팅상담을 통해
          <br className="mb-4" /> 편리한 대출 상담을 받아보세요!
        </div>
        <img src={reserve_hand} alt="" className="" />
        <CommonBackground className="p-5 min-h-screen h-auto">
          <div className="flex flex-col my-5">
            <h2 className="text-lg font-semibold mb-4">선택 부동산 매물</h2>
            {/* <CommonBackground className="p-2"> */}
            {assets.map((asset, index) => (
              <AssetItem key={index} name={asset.name} />
            ))}
            {/* </CommonBackground> */}
          </div>
          <DatePicker
            dateOptions={dateOptions}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <TimePicker
            timeOptions={timeOptions}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
          <div className="py-2">
            <UserGuide />
          </div>

          <Button text="예약하기" onClick={handleSubmit} />
        </CommonBackground>
      </div>
    </div>
  );
}
