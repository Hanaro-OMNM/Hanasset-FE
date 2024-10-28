import SearchBar from '../atoms/SearchBar';

const MainSideLayout: React.FC = () => {
  const city: string = '서울시';
  const gungu: string = '영등포구';
  const dong: string = '여의도동';
  /*
    MainSideLayout?
    - 사이드바 영역 말하는 것입니다.
      피그마 보면 불투명한 영역
  */
  return (
    <div className="w-[500px]">
      <div className=" top-0 absolute pl-2">
        <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[5px]">
          <SearchBar />

          {/* 주소로 골라보기 */}
          {/* 버튼에 useState를 활용해 필터 페이지로 연결되는 부분 구현 필요 */}
          <div className="w-full max-w-md px-4 mt-10">
            <h2 className="text-xl font-bold mb-6">주소로 골라보기</h2>
            <div className="w-full flex justify-around items-center">
              {/* 시/도 버튼 */}
              <button
                type="button"
                className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-[#008485]"
              >
                <span className="font-semibold hover:font-bold">{city}</span>
              </button>

              {/* 시/군/구 버튼 */}
              <button
                type="button"
                className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-[#008485]"
              >
                <span className="font-semibold hover:font-bold">{gungu}</span>
              </button>

              {/* 읍/면/동 버튼 */}
              <button
                type="button"
                className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-[#008485]"
              >
                <span className="font-semibold hover:font-bold">{dong}</span>
              </button>
            </div>
          </div>

          {/* 카테고리별 골라보기 */}
          <div className="w-full max-w-md px-4 mt-10">
            <h2 className="text-xl font-bold mb-6">카테고리별 골라보기</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSideLayout;
