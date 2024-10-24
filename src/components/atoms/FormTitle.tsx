import React from 'react';

interface FormTitleProps {
  text: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ text }) => {
  return (
    <h2 className="w-[246.38px] h-[38.27px] text-[#1f2024] text-xl font-extrabold font-['Inter'] tracking-tight text-left">
      {text}
    </h2>
  );
};

export default FormTitle;
