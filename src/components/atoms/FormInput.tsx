import React from 'react';

interface FormInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="px-5 w-[303px] h-[45px] bg-[#f7f7f7] rounded-[10px] text-gray-700 placeholder-gray-400 border-2 border-transparent focus:border-[#b5b6b6] focus:outline-none"
      placeholder={placeholder}
    />
  );
};

export default FormInput;
