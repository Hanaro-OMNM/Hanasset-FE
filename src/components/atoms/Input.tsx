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
  className?: string; //추가 클래스 prop
  inputClassName?: string; // Input 자체에 대한 추가 클래스 prop
  placeholder?: string; // 일반 placeholder prop
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean; // 에러 상태 prop
  errorMessage?: string; // 에러 메시지 prop
  isAmount?: boolean; // 금액 input인지 여부 판단 prop
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
    <div className={clsx('w-full max-w-md ', props.className)}>
      {props.label && (
        <label
          className={clsx('text-xs font-medium', {
            'text-red-400': props.error, // 포커스 시 에러가 있을 때 빨간색
            'text-gray-500': !(isFocused && props.error), // 기본 색상
          })}
        >
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
          placeholder={props.isAmount ? '0' : props.placeholder}
          className={clsx(
            'flex-grow border-3 rounded p-2 transition duration-200 focus:outline-none pr-10 text-left  bg-white  text-hanaBlack80 ',
            {
              'border-opacity-10 border-gray-500': !isFocused,
              'border-red-400 ': props.error,
              'border-opacity-30 border-gray-400': isFocused && !props.error,
              'w-full': !props.isAmount,
            },
            props.inputClassName
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {props.isAmount && (
          <span
            className={clsx('absolute top-2 mx-2', {
              'text-red-500': props.error,
              'text-gray-500': !props.error,
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
