import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

interface InputProps {
  value?: string;
  name: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  title?: string;
  readOnly?: boolean;
  checked?: boolean;
  onClick?: () => void;
  label?: string;
  description?: string;
  className?: string; // 추가된 prop
  inputClassName?: string; // Input 자체에 대한 추가 클래스 prop
  placeholder?: string; // 일반 placeholder prop 추가
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 추가된 onChange prop
  error?: boolean; // 에러 상태 prop 추가
  errorMessage?: string; // 에러 메시지 prop 추가
  isAmount?: boolean; // 금액 여부 판단 prop 추가
}

const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={clsx('w-full max-w-md px-2', props.className)}>
      {props.label && (
        <label className="text-xs font-medium text-gray-500">
          {props.label}
        </label>
      )}
      {props.description && (
        <p className="text-sm text-gray-100">{props.description}</p>
      )}
      <div className="relative mb-4">
        <input
          name={props.name}
          type={props.type || 'text'}
          required={props.required}
          pattern={props.pattern}
          maxLength={props.maxLength}
          title={props.title}
          readOnly={props.readOnly}
          checked={props.checked}
          onClick={props.onClick}
          value={value}
          onChange={props.onChange}
          placeholder={isFocused || value ? '' : '0'}
          className={clsx(
            'flex-grow border rounded p-2 transition duration-200 outline-none pr-10 text-left',
            {
              'border-gray-300': !isFocused && !props.error,
              'border-blue-500': isFocused,
              'border-red-500 bg-red-50': props.error,
            },
            props.inputClassName
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.isAmount && (
          <span
            className={clsx('absolute right-2 top-2', {
              'text-red-500': props.error, // 에러 상태일 때 빨간색
              'text-gray-500': !props.error, // 에러가 아닐 때 기본 색상
            })}
          >
            만원
          </span>
        )}
      </div>
      {props.error && (
        <p className="text-red-500 text-xs">
          {props.errorMessage || '입력란을 올바르게 작성해주세요.'}
        </p>
      )}
    </div>
  );
};

export default Input;
