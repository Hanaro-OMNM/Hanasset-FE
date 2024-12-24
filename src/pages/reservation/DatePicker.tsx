// components/atoms/DatePicker.tsx
import React from 'react';

interface DateOption {
  month: number;
  day: number;
  weekday: string;
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
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
      <div className="grid grid-cols-5 gap-2">
        {dateOptions.map((date, index) => {
          const formattedDate = `${currentYear}-${date.month
            .toString()
            .padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;

          return (
            <div
              key={index}
              className={`flex flex-col items-center p-4 rounded-lg shadow-md ${
                selectedDate === formattedDate
                  ? 'bg-hanaColor2 text-white'
                  : 'bg-white text-black cursor-pointer hover:bg-hanaSilver40'
              }`}
              onClick={() => onDateChange(formattedDate)}
            >
              <span className="text-xs font-medium">{date.month}월</span>
              <span className="text-lg font-bold">{date.day}</span>
              <span className="text-sm">{date.weekday}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
