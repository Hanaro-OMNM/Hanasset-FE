import { ReactNode } from 'react';

interface CommonBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function CommonBackground({
  children,
  className = '',
}: CommonBackgroundProps) {
  return (
    <div className={`w-full  bg-white rounded-[15px] shadow-md ${className}`}>
      {children}
    </div>
  );
}
