interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div className="p-3 min-w-[400px] min-h-screen bg-gray-100 ">
        {children}
      </div>
    </div>
  );
}
