import { MdNavigateNext } from 'react-icons/md';
import { useEffect, useState } from 'react';
import CommonBackground from '../components/atoms/CommonBackground.tsx';
import SearchBar from '../components/atoms/SearchBar.tsx';
import LocationFilter from './location/LocationFilter.tsx';

type House = {
  title: string;
  description: string;
  address: string;
};

export default function Main() {
  const [activePage, setActivePage] = useState<
    'city' | 'gungu' | 'dong' | 'main'
  >('main');

  // 일단 시/도, 시/군/구, 읍/면/동 정보는 로컬 스토리지에서 가져오는 걸로 (추후 DB 연동이 되겠죠?)
  const [currCity, setCity] = useState<string>('시/도');
  const [currGungu, setGungu] = useState<string>('시/군/구');
  const [currDong, setDong] = useState<string>('읍/면/동');

  useEffect(() => {
    // LocalStorage에서 값을 가져오고 없으면 기본값으로 설정
    const storedCity = JSON.parse(
      localStorage.getItem('currCity') || '"시/도"'
    );
    const storedGungu = JSON.parse(
      localStorage.getItem('currGungu') || '"시/군/구"'
    );
    const storedDong = JSON.parse(
      localStorage.getItem('currDong') || '"읍/면/동"'
    );

    setCity(storedCity);
    setGungu(storedGungu);
    setDong(storedDong);
  }, []);

  // 최근 확인한 매물 리스트
  const recentHouses: 'none' | House[] = (() => {
    const recents = localStorage.getItem('recents');

    return recents ? JSON.parse(recents) : 'none';
  })();

  return (
    <div>
      <div className="w-430">
        {activePage === 'main' ? (
          <div className="top-0 absolute pl-2">
            <div className="w-430 max-w-[430px] h-svh px-5 absolute bg-white/75 backdrop-blur-[5px] overflow-y-auto">
              <SearchBar />

              <div className="w-full max-w-md mt-10">
                <h2 className="text-xl text-slate-800 font-bold mb-6">
                  주소로 골라보기
                </h2>

                <CommonBackground className="flex items-center">
                  {/* 시/도 버튼 */}
                  <button
                    type="button"
                    className="w-1/3 h-14 flex justify-center items-center text-slate-800 hover:text-hanaGreen"
                    onClick={() => {
                      // local storage에서 key 값 삭제
                      localStorage.removeItem('currCity');
                      localStorage.removeItem('currGungu');
                      localStorage.removeItem('currDong');

                      // 페이지 이동
                      setActivePage('city');
                    }}
                  >
                    <div className="group relative px-2">
                      <span className="font-semibold">{currCity}</span>
                      <span className="absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-hanaGreen80 group-hover:w-full"></span>
                    </div>
                  </button>

                  <MdNavigateNext color="#ABCEC8" />

                  {/* 시/군/구 버튼 */}
                  <button
                    type="button"
                    className={`w-1/3 h-14 flex justify-center items-center ${
                      currCity === '시/도'
                        ? 'text-gray-400'
                        : 'text-slate-800 hover:text-hanaGreen hover:font-bold'
                    }`}
                    onClick={() => {
                      // local storage에서 key 값 삭제
                      localStorage.removeItem('currGungu');
                      localStorage.removeItem('currDong');

                      // 페이지 이동
                      setActivePage('gungu');
                    }}
                    disabled={currCity === '시/도'} // '시/도'일 때 버튼 비활성화
                  >
                    <div className="group relative px-2">
                      <span className="font-semibold">{currGungu}</span>
                      <span
                        className={`absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-hanaGreen80 ${currCity === '시/도' ? '' : 'group-hover:w-full'}`}
                      ></span>
                    </div>
                  </button>

                  <MdNavigateNext color="#ABCEC8" />

                  {/* 읍/면/동 버튼 */}
                  <button
                    type="button"
                    className={`w-1/3 h-14 flex justify-center items-center ${
                      currCity === '시/도' || currGungu === '시/군/구'
                        ? 'text-gray-400'
                        : 'text-slate-800 hover:text-hanaGreen hover:font-bold'
                    }`}
                    onClick={() => {
                      // local storage에서 key 값 삭제
                      localStorage.removeItem('currDong');

                      // 페이지 이동
                      setActivePage('dong');
                    }}
                    disabled={currCity === '시/도' || currGungu === '시/군/구'} // '시/도' or '시/군/구'일 때 버튼 비활성화
                  >
                    <div className="group relative px-2">
                      <span className="font-semibold">{currDong}</span>
                      <span
                        className={`absolute -bottom-1 left-0 w-0 transition-all duration-300 h-0.5 bg-hanaGreen80 ${currCity === '시/도' || currGungu === '시/군/구' ? '' : 'group-hover:w-full'}`}
                      ></span>
                    </div>
                  </button>
                </CommonBackground>
              </div>

              <div className="w-full max-w-md mt-16">
                <h2 className="text-xl text-slate-800 font-bold mb-6">
                  최근에 확인한 매물
                </h2>
                {/* 여기에는 캐러셀 적용할 예정 */}
                <CommonBackground className="w-full px-5 py-3">
                  {recentHouses === 'none' ? (
                    <div>아직 둘러본 매물이 없네요.</div>
                  ) : (
                    <div></div>
                  )}
                </CommonBackground>
              </div>
            </div>
          </div>
        ) : (
          <LocationFilter locationType={activePage} />
        )}
      </div>
    </div>
  );
}
