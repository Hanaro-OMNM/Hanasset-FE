interface FormLayoutProps {
  children: React.ReactNode;
}

export default function RealEstateDetailLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div className="absolute top-0 left-[490px] w-[420px] bg-gray-100 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
