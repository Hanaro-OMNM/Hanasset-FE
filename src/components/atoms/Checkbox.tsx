import { Switch } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';

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
  const [enabled, setEnabled] = useState(checked); // 초기 상태 설정

  // 상태 변경 함수
  const handleToggle = (state: boolean) => {
    setEnabled(state);
    onChange(state);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`relative inline-flex items-center justify-center w-[20px] h-[20px] rounded-md border transition-all duration-200 ${
          enabled
            ? 'bg-[#008485] border-[#008485]'
            : 'bg-white border-[#008485]'
        } ${switchClassName}`}
        id={name}
      >
        {enabled && <AiOutlineCheck className="text-white w-[12px] h-[12px]" />}
      </Switch>
      {name && (
        <label
          htmlFor={name}
          className={`cursor-pointer select-none text-[#008485] font-medium ${labelClassName}`}
        >
          {name}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
