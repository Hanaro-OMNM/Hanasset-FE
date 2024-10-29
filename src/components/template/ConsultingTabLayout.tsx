const ConsultingTabLayout: React.FC = () => {
  /*
    ConsultingTabLayout이란?
    
    : Navbar에서 "상담" 버튼 눌렀을 때 나오는 사이드바 부분입니다. 
    ConsultantLayout이랑 혼동 주의! 

  */

  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-2">
        <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[10px]"></div>
      </div>
    </div>
  );
};
export default ConsultingTabLayout;
