const ConsultantLayout: React.FC = () => {
  /*
    MainSideLayout?
    - 사이드바 영역 말하는 것입니다.
      피그마 보면 불투명한 영역
  */
  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-2">
        <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[10px]"></div>
      </div>
    </div>
  );
};

export default ConsultantLayout;
