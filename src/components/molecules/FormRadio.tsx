import { Radio, RadioGroup } from '@headlessui/react';
import { FaRegCheckCircle } from 'react-icons/fa';

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
    <div className="w-full p-4">
      <div className="mx-auto w-full max-w-md">
        <h2 className="flex justify-center text-xl font-extrabold my-7">
          {label}
        </h2>
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
                  `group relative flex cursor-pointer rounded-xl p-5 transition text-md focus:outline-none border-2
                ${checked ? 'text-hanaBlack bg-hanaGreen20 border-hanaGreen60' : 'text-hanaBlack40 border-gray-100/5'}` // checked 여부에 따라 배경 색상 변경
              }
            >
              <div className="flex w-full items-center justify-between">
                <div>{display(item)}</div>
              </div>
              <FaRegCheckCircle className="size-6 fill-hanaGreen60 opacity-0 transition group-data-[checked]:opacity-100" />
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
