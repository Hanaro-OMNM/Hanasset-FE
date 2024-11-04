interface FormLayoutProps {
  children: React.ReactNode;
}

export default function RealEstateDetailLayout({ children }: FormLayoutProps) {
  return (
    <div className="top-0 absolute pl-4 animate-slideInRight">
      <div className="w-[420px] bg-white/75 absolute backdrop-blur-[10px] left-[420px] overflow-y-auto h-screen scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
