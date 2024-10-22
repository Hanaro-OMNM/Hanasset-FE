import {
  Description,
  Field,
  Input as HeadlessInput,
  Label,
} from '@headlessui/react';
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
  label: string;
  description?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(props.value ? props.value : '');
  }, [props.value]);

  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium text-white">
          {props.label}
        </Label>
        {props.description && (
          <Description className="text-sm/6 text-white/50">
            {props.description}
          </Description>
        )}
        <HeadlessInput
          name={props.name}
          type={props.type}
          required={props.required}
          pattern={props.pattern}
          maxLength={props.maxLength}
          title={props.title}
          readOnly={props.readOnly}
          checked={props.checked}
          onClick={props.onClick}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        />
      </Field>
    </div>
  );
};

export default Input;
