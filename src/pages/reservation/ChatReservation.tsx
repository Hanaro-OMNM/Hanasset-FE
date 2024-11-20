import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import reserve_hand from '../../assets/img/reserve_img.png';
import Button from '../../components/atoms/Button';
import CommonBackground from '../../components/atoms/CommonBackground';
import MobileHeader from '../../components/atoms/MobileHeader';
import loanReservationAtom from '../../recoil/loanReservation/index';
import { selectedEstateType } from '../../types/global';
import AssetItem from './AssetItem';
import DatePicker from './DatePicker';
import DynamicFormSwitcher from './DynamicFormSwitcher';
import TimePicker from './TimePicker';
import UserGuide from './UserGuide';

export default function ChatReservation() {
  const estateInfo = useLocation().state!.selectedItems!;
  const day = new Date();
  const [showForm, setShowForm] = useState(false);

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
    newDate.setDate(baseDate.getDate() + offset);

    while (isWeekend(newDate)) {
      newDate.setDate(newDate.getDate() + Math.sign(offset));
    }

    return newDate;
  }

  const dateOptions = [
    { offset: 0 },
    { offset: 1 },
    { offset: 2 },
    { offset: 3 },
    { offset: 4 },
  ].map(({ offset }) => {
    const adjustedDate = getNextValidDate(day, offset);
    return {
      month: adjustedDate.getMonth() + 1,
      day: adjustedDate.getDate(),
      weekday: matchWeekend(adjustedDate.getDay()),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLoanReservation, setSelectedLoanReservation] =
    useRecoilState(loanReservationAtom);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
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
    if (!selectedLoanReservation.reservationTime) {
      setSelectedLoanReservation({
        reservationInfo: estateInfo,
        reservationTime: selectedDate + ' ' + selectedTime,
      });

      /* 폼 전환 */
      setShowForm(true);
    }
  };

  const onBack = (): void => {
    window.history.back();
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
          <DynamicFormSwitcher />
        )}
      </div>
    </div>
  );
}
