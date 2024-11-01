import { ReactNode } from 'react';

interface TextTitleProps {
  children: ReactNode;
}

export default function SemiTitle({ children }: TextTitleProps) {
  return (
    <div className="text-base font-semibold text-hanaGreen px-2 border-l-4 border-hanaGreen60">
      {children}
    </div>
  );
}
