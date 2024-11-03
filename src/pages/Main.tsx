import { useEffect, useState } from 'react';
import SearchBar from '../components/atoms/SearchBar.tsx';
import LocationFilter from './location/LocationFilter.tsx';

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

  return (
    <div>
      <div className="w-430">
        {activePage === 'main' ? (
          <div className="top-0 absolute pl-2">
            <div className="w-430 max-w-[430px] h-svh px-5 absolute bg-white/75 backdrop-blur-[5px]">
              <SearchBar />

              <div className="w-full max-w-md mt-10">
                <h2 className="text-xl text-slate-800 font-bold mb-6">
                  주소로 골라보기
                </h2>
                <div className="w-full flex justify-around items-center">
                  {/* 시/도 버튼 */}
                  <button
                    type="button"
                    className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen"
                    onClick={() => {
                      // local storage에서 key 값 삭제
                      localStorage.removeItem('currCity');
                      localStorage.removeItem('currGungu');
                      localStorage.removeItem('currDong');

                      // 페이지 이동
                      setActivePage('city');
                    }}
                  >
                    <span className="font-semibold hover:font-bold">
                      {currCity}
                    </span>
                  </button>

                  {/* 시/군/구 버튼 */}
                  <button
                    type="button"
                    className={`w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 ${
                      currCity === '시/도'
                        ? 'text-gray-400'
                        : 'hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen hover:font-bold'
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
                    <span className="font-semibold">{currGungu}</span>
                  </button>

                  {/* 읍/면/동 버튼 */}
                  <button
                    type="button"
                    className={`w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 ${
                      currCity === '시/도' || currGungu === '시/군/구'
                        ? 'text-gray-400'
                        : 'hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen hover:font-bold'
                    }`}
                    onClick={() => {
                      // local storage에서 key 값 삭제
                      localStorage.removeItem('currDong');

                      // 페이지 이동
                      setActivePage('dong');
                    }}
                    disabled={currCity === '시/도' || currGungu === '시/군/구'} // '시/도' or '시/군/구'일 때 버튼 비활성화
                  >
                    <span className="font-semibold">{currDong}</span>
                  </button>
                </div>
              </div>

              <div className="w-full max-w-md mt-16">
                <h2 className="text-xl text-slate-800 font-bold mb-6">
                  최근에 확인한 매물
                </h2>
                <div className="w-full grid grid-cols-2 gap-4 px-4">
                  <div className="bg-gray-200 h-24">1</div>
                  <div className="bg-gray-300 h-24">2</div>
                  <div className="bg-gray-400 h-24">3</div>
                  <div className="bg-gray-500 h-24">4</div>
                </div>
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
