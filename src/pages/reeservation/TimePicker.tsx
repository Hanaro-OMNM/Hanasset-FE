// components/atoms/TimePicker.tsx
import React from 'react';

interface TimeOption {
  value: string;
  label: string;
  disabled: boolean;
  period: string;
}

interface TimePickerProps {
  timeOptions: TimeOption[];
  selectedTime: string;
  onTimeChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  timeOptions,
  selectedTime,
  onTimeChange,
}) => (
  <div className="mb-4">
    <div className="font-semibold mb-2">오전</div>
    <div className="grid grid-cols-3 gap-2 mb-4">
      {timeOptions
        .filter((time) => time.period === 'AM')
        .map((time, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg text-center shadow-md ${
              time.disabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : selectedTime === time.value
                  ? 'bg-hanaGreen text-white'
                  : 'bg-white text-hanaBlack80 cursor-pointer'
            }`}
            onClick={() => !time.disabled && onTimeChange(time.value)}
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
            className={`px-4 py-2 rounded-lg text-center shadow-md ${
              time.disabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : selectedTime === time.value
                  ? 'bg-hanaGreen text-white'
                  : 'bg-white text-hanaBlack80 cursor-pointer'
            }`}
            onClick={() => !time.disabled && onTimeChange(time.value)}
          >
            {time.label}
          </div>
        ))}
    </div>
  </div>
);

export default TimePicker;
