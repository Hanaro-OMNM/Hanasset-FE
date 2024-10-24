import SearchBar from '../atoms/SearchBar';

const MainSideLayout: React.FC = () => {
  /*
    MainSideLayout?
    - 사이드바 영역 말하는 것입니다.
      피그마 보면 불투명한 영역
*/
  return (
    <div className="w-full ml-[85px] h-svh relative">
      {/* 사이드 바 Contents */}
      <div className="w-[420px] max-w-[420px] h-svh left-[-1px] top-0 absolute">
        <div className="w-[420px] max-w-[420px] h-svh px-5 left-0 top-0 absolute bg-white/75 backdrop-blur-[10px]">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default MainSideLayout;
