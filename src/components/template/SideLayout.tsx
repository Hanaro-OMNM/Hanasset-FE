const SideLayout: React.FC = () => {
  return (
    <div className="w-full h-svh relative bg-[#f8fafb]">
      {/* 사이드 바 Contents */}
      <div className="w-[590px] h-svh left-[-1px] top-0 absolute">
        <div className="w-[590px] h-svh left-0 top-0 absolute bg-white/75 backdrop-blur-[10px]" />
      </div>
    </div>
  );
};

export default SideLayout;
