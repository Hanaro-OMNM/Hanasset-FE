interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className="p-3 min-w-[400px] min-h-screen bg-bgColor ">
      {/*전체 레이아웃에 최소px이 없어서 임시로 px 설정*/}
      {children}
    </div>
  );
}
