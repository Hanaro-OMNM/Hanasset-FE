import { Field, Label, Description, Select } from '@headlessui/react';
import clsx from 'clsx';
import { FaChevronDown } from 'react-icons/fa6';
import React from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  label: string;
  description?: string;
  options: Option[];
  className?: string;
  onChange: (value: string) => void; // 선택된 값을 전달하는 함수
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  description,
  options,
  className,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <div className={clsx('w-full max-w-md', className)}>
      <Field>
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        {description && (
          <Description className="text-sm text-gray-500">
            {description}
          </Description>
        )}
        <div className="relative">
          <Select
            onChange={handleChange}
            className={clsx(
              'mt-3 block w-full h-11 appearance-none rounded-lg shadow-md bg-white py-1 px-3 text-md text-hanaBlack80',
              'focus:outline-none focus:border-hanaSilver60'
            )}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={
                  option.disabled
                    ? 'bg-hanaSilver40 text-hanaBlack40'
                    : 'bg-white '
                }
              >
                {option.label}
              </option>
            ))}
          </Select>
          <FaChevronDown
            className="absolute top-2.5 right-2.5 text-hanaBlack40"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
};

export default CustomSelect;
