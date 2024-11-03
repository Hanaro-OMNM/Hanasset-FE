interface FormLayoutProps {
  children: React.ReactNode;
}

export default function RealEstateDetailLayout({ children }: FormLayoutProps) {
  return (
    <div>
      <div className="absolute top-0 left-[490px] w-[420px] bg-white/75 h-full overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
