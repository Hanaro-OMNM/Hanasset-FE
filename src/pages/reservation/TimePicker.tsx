import React from 'react';

interface TimePickerProps {
  selectedDate: string | null;
  selectedTime: string;
  onTimeChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedDate,
  selectedTime,
  onTimeChange,
}) => {
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

  // Parse selectedDate and determine today/tomorrow logic
  const today = new Date();
  const parsedDate = selectedDate
    ? Number(selectedDate.substring(selectedDate.lastIndexOf('-') + 1))
    : null;
  const todayDate = today.getDate();
  const todayTime = today.getHours();
  const todayMinutes = today.getMinutes();

  const isToday = selectedDate && parsedDate === todayDate;

  return (
    <div className="mb-4">
      <div className="font-semibold mb-2">오전</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {timeOptions
          .filter((time) => time.period === 'AM')
          .map((time, index) => {
            const [hour, minute] = time.value.split(':').map(Number);
            const isDisabled =
              !selectedDate ||
              (isToday &&
                (hour < todayTime + 2 ||
                  (hour === todayTime + 2 && minute < todayMinutes)));

            return (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg text-center shadow-md ${
                  isDisabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : selectedTime === time.value
                      ? 'bg-hanaColor2 text-white'
                      : 'bg-white text-hanaBlack80 cursor-pointer hover:bg-hanaSilver40'
                }`}
                onClick={() => !isDisabled && onTimeChange(time.value)}
              >
                {time.label}
              </div>
            );
          })}
      </div>

      <div className="font-semibold mb-2">오후</div>
      <div className="grid grid-cols-3 gap-2">
        {timeOptions
          .filter((time) => time.period === 'PM')
          .map((time, index) => {
            const [hour, minute] = time.value.split(':').map(Number);
            const isDisabled =
              !selectedDate ||
              (isToday &&
                (hour < todayTime + 2 ||
                  (hour === todayTime + 2 && minute < todayMinutes)));

            return (
              <div
                key={index}
                className={`px-4 py-2 rounded-lg text-center shadow-md ${
                  isDisabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : selectedTime === time.value
                      ? 'bg-hanaColor2 text-white'
                      : 'bg-white text-hanaBlack80 cursor-pointer hover:bg-hanaSilver40'
                }`}
                onClick={() => !isDisabled && onTimeChange(time.value)}
              >
                {time.label}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TimePicker;
