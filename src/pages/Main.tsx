import { useEffect, useState } from 'react';
import SearchBar from '../components/atoms/SearchBar.tsx';
import LocationFilter from './location/LocationFilter.tsx';

export default function Main() {
  const [activePage, setActivePage] = useState<
    'city' | 'gungu' | 'dong' | 'main'
  >('main');

  const [currCity, setCity] = useState<string>('시/도');
  const [currGungu, setGungu] = useState<string>('시/군/구');
  const [currDong, setDong] = useState<string>('읍/면/동');

  useEffect(() => {
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
      <div className="w-[420px]">
        {activePage === 'main' ? (
          <div className="top-0 absolute pl-4 animate-slideInRight">
            <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[5px]">
              <SearchBar />

              <div className="w-full max-w-md px-4 mt-10">
                <h2 className="text-xl font-bold mb-6">주소로 골라보기</h2>
                <div className="w-full flex justify-around items-center">
                  <button
                    type="button"
                    className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen"
                    onClick={() => setActivePage('city')}
                  >
                    <span className="font-semibold hover:font-bold">
                      {currCity}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen"
                    onClick={() => setActivePage('gungu')}
                  >
                    <span className="font-semibold hover:font-bold">
                      {currGungu}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen"
                    onClick={() => setActivePage('dong')}
                  >
                    <span className="font-semibold hover:font-bold">
                      {currDong}
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full max-w-md px-4 mt-16">
                <h2 className="text-xl font-bold mb-6">카테고리별 골라보기</h2>
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
          <LocationFilter
            locationType={activePage}
            onBack={() => setActivePage('main')}
          />
        )}
      </div>
    </div>
  );
}
