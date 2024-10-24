import { Radio, RadioGroup } from '@headlessui/react';

interface FormRadioProps<T> {
  items: T[];
  label: string;
  selectedItem: T;
  onChange: (item: T) => void;
  display: (item: T) => React.ReactNode; // 각 항목을 어떻게 보여줄지 정의
}

export default function FormRadio<T>({
  items,
  label,
  selectedItem,
  onChange,
  display,
}: FormRadioProps<T>) {
  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <h2 className="mb-4 text-xl font-extrabold">{label}</h2>
        <RadioGroup
          value={selectedItem}
          onChange={onChange}
          aria-label={label}
          className="space-y-2"
        >
          {items.map((item) => (
            <Radio
              key={JSON.stringify(item)}
              value={item}
              className={
                ({ checked }) =>
                  `group relative flex cursor-pointer rounded-lg py-4 px-5 transition focus:outline-none
                ${checked ? 'text-hanaBlack80 bg-gray-100' : 'text-hanaBlack40'}` // checked 여부에 따라 배경 색상 변경
              }
            >
              <div className="flex w-full items-center justify-between">
                <div>
                  {display(item)} {/* 항목을 보여줄 때 display 함수 사용 */}
                </div>
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
