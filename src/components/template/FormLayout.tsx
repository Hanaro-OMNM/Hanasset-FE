import Button from '../atoms/Button';

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div
        className="w-[340px] h-[570px] bg-white rounded-[10px] filter p-3"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))' }}
      >
        {children}
      </div>

      <Button text="다음으로" version="ver1" />
    </div>
  );
}
