interface FormLayoutProps {
  children: React.ReactNode;
}

export default function RealEstateDetailLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div className="max-w-[420px] min-h-screen bg-gray-100">{children}</div>
    </div>
  );
}
