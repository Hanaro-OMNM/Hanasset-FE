import { ReactNode } from 'react';

interface ManualImgProps {
  children: ReactNode;
  className?: string;
}

export default function ManualImg({
  children,
  className = '',
}: ManualImgProps) {
  return (
    <div
      className={`fixed p-1 rounded-3xl bg-gradient-to-r from-ManualColor1  via-ManualColor2 to-ManualColor3 ${className}`}
    >
      {children}
    </div>
  );
}
