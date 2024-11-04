import { Switch } from '@headlessui/react';
import { PiCheckCircleThin } from 'react-icons/pi';

interface CheckboxProps {
  name?: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
  labelClassName?: string; // 레이블 텍스트에 적용될 Tailwind CSS 클래스
  switchClassName?: string; // Switch (체크박스)에 적용될 Tailwind CSS 클래스
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  onChange,
  checked,
  labelClassName = '',
  switchClassName = '',
}) => {
  const handleToggle = (state: boolean) => {
    onChange(state);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onChange={handleToggle}
        className={`relative inline-flex items-center justify-center w-[30px] h-[30px] rounded-md transition-all duration-200 ${
          switchClassName
        }`}
        id={name}
      >
        <PiCheckCircleThin
          className={`w-[35px] h-[35px] ${
            checked ? 'text-hanaGreen ' : 'text-hanaSilver60 '
          }`}
        />
      </Switch>
      {name && (
        <label
          htmlFor={name}
          className={`cursor-pointer select-none text-hanaGreen font-medium ${labelClassName}`}
        >
          {name}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
