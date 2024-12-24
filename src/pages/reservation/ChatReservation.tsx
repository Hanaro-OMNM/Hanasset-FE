import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import reserve_hand from '../../assets/img/reserve_img.png';
import Button from '../../components/atoms/Button';
import CommonBackground from '../../components/atoms/CommonBackground';
import MobileHeader from '../../components/atoms/MobileHeader';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import chatroomIdState from '../../recoil/chatroomId/atom';
import loanReservationAtom from '../../recoil/loanReservation/atom';
import { selectedEstateType } from '../../types/hanaAsset.ts';
import { ChatCreateRequest } from '../../types/hanaAssetRequest.common';
import AssetItem from './AssetItem';
import DatePicker from './DatePicker';
import DynamicFormSwitcher from './DynamicFormSwitcher';
import TimePicker from './TimePicker';
import UserGuide from './UserGuide';

export default function ChatReservation() {
  const estateInfo = useLocation().state!.selectedItems!;
  const day = new Date();
  const [showForm, setShowForm] = useState(true);
  const nav = useNavigate();
  const [selectedLoanReservation, setSelectedLoanReservation] =
    useRecoilState(loanReservationAtom);
  const setChatroomId = useSetRecoilState(chatroomIdState);

  function isWeekend(date: Date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  function matchWeekend(day: number) {
    switch (day) {
      case 0:
        return '일';
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      default:
        return '';
    }
  }

  function getNextValidDate(baseDate: Date, offset: number) {
    const newDate = new Date(baseDate);
    let daysAdded = 0;

    while (daysAdded < offset) {
      newDate.setDate(newDate.getDate() + 1);
      if (!isWeekend(newDate)) {
        daysAdded++;
      }
    }

    return newDate;
  }

  const dateOptions = Array.from({ length: 5 }, (_, index) => {
    const adjustedDate = getNextValidDate(day, index);
    return {
      month: adjustedDate.getMonth() + 1,
      day: adjustedDate.getDate(),
      weekday: matchWeekend(adjustedDate.getDay()),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    console.log(selectedDate + ' ' + selectedTime);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      alert('예약 날짜를 선택해주세요.');
      return;
    }

    if (!selectedTime) {
      alert('예약 시간을 선택해주세요.');
      return;
    }

    console.log('Selected date:', selectedDate);
    console.log('Selected time:', selectedTime);

    const [year, month, day] = selectedDate.split('-').map(Number);
    const [hour, minute] = selectedTime.split(':').map(Number);

    const reservedDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    console.log('Reserved Date (UTC):', reservedDate);

    const reservedTime = `${selectedDate} ${selectedTime}:00`;
    console.log('Final reservedTime:', reservedTime);
    console.log('Final reservedTime:', reservedTime);

    if (!selectedLoanReservation.reservationTime) {
      setSelectedLoanReservation({
        ...selectedLoanReservation,
        reservationInfo: estateInfo,
        reservationTime: reservedTime,
      });
      alert('상담이 정상적으로 예약되었습니다.');
      createChat(reservedTime);
      window.location.href = '/consulting';
    }
  };
  const onBack = (): void => {
    window.history.back();
  };

  const createChat = async (reservedTime: string) => {
    const chatroomTitle = estateInfo
      .map((item: selectedEstateType) => item.name)
      .join(', ');

    const request: ChatCreateRequest = {
      userId: 1,
      consultantId: 1,
      chatroomTitle: chatroomTitle,
      reservedTime: reservedTime,
    };
    console.log('Request payload to be sent to the server:', request);

    try {
      const response = await PlatformAPI.createChat(request);
      console.log('API Response:', response);
      if (response.success) {
        const chatroomId = response.data.rooms[0].chatroomId;
        setChatroomId(chatroomId);
      } else {
        console.error('Error from server:', response.message);
        alert(response.message || '채팅방 생성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('API Call Error:', error);
      alert('채팅방 생성 API 호출 중 문제가 발생했습니다.');
    }
  };
  return (
    <div className="top-0 absolute pl-4 animate-fadeInRight">
      <div className="pl-6 w-[420px] backdrop-blur-[10px] absolute top-0 h-screen overflow-y-auto bg-gray-50/90 scrollbar-hide">
        <MobileHeader onBack={onBack} title="상담 예약하기" />
        {!showForm ? (
          <div>
            <div className="text-2xl font-fontMedium mb-4 text-hanaBlack">
              실시간 채팅상담을 통해
              <br className="mb-4" /> 편리한 대출 상담을 받아보세요!
            </div>
            <img src={reserve_hand} alt="reservation_img" />
            <div className="pr-5 pb-5">
              <CommonBackground className="p-5 min-h-screen h-auto">
                <div className="flex flex-col my-5">
                  <h2 className="text-lg font-semibold mb-4">
                    선택 부동산 매물
                  </h2>
                  {estateInfo.map(
                    (asset: selectedEstateType, index: number) => (
                      <AssetItem key={index} name={asset.name} />
                    )
                  )}
                </div>
                <DatePicker
                  dateOptions={dateOptions}
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />
                <TimePicker
                  selectedDate={selectedDate}
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
        ) : (
          <DynamicFormSwitcher showForm={showForm} setShowForm={setShowForm} />
        )}
      </div>
    </div>
  );
}
