import React from 'react';

interface FormTitleProps {
  text: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ text }) => {
  return (
    <h2 className="w-full  text-black text-xl font-extrabold tracking-tight text-left">
      {text}
    </h2>
  );
};

export default FormTitle;
