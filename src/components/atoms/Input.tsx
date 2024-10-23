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
  placeholder?: string; // placeholder prop 추가
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 추가된 onChange prop
}

const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <div className={clsx('w-full max-w-md px-2')}>
      {props.label && (
        <label className="text-sm font-medium text-white">{props.label}</label>
      )}
      {props.description && (
        <p className="text-sm text-white/50">{props.description}</p>
      )}
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
        placeholder={props.placeholder}
        className={clsx(props.inputClassName)}
      />
    </div>
  );
};

export default Input;
