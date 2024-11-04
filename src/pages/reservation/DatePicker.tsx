// components/atoms/DatePicker.tsx
import React from 'react';

interface DateOption {
  month: string;
  day: string;
  weekday: string;
  disabled: boolean;
}

interface DatePickerProps {
  dateOptions: DateOption[];
  selectedDate: string;
  onDateChange: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  dateOptions,
  selectedDate,
  onDateChange,
}) => (
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
                ? 'bg-hanaColor2 text-white'
                : 'bg-white text-black cursor-pointer hover:bg-hanaColor1 '
          }`}
          onClick={() =>
            !date.disabled && onDateChange(`${date.month}-${date.day}`)
          }
        >
          <span className="text-xs font-medium">{date.month}월</span>
          <span className="text-lg font-bold">{date.day}</span>
          <span className="text-sm ">{date.weekday}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DatePicker;
