interface FormLayoutProps {
  children: React.ReactNode;
}

export default function RealEstateDetailLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div className="absolute top-0 left-[430px] w-430 bg-gray-100 h-full overflow-y-auto border-l-4">
        {children}
      </div>
    </div>
  );
}
