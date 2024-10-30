import React, { useEffect, useState } from 'react';
import LocationFilter from '../../pages/location/LocationFilter';
import CommonBackground from '../atoms/CommonBackground';
// import RecentCheckedButton from '../atoms/RecentCheckedButton';
import SearchBar from '../atoms/SearchBar';

// type House = {
//   title: string;
//   description: string;
// };

const MainSideLayout: React.FC = () => {
  // 지역 골라보기 버튼들 눌렀을 때 페이지 이동을 위한 state
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

  // 최근에 확인한 매물 리스트
  // const recentHouses: 'none' | House[] = JSON.parse(
  //   localStorage.getItem('recents') || 'none'
  // );

  return (
    <div className="w-[420px]">
      {activePage === 'main' ? (
        <div className="top-0 absolute pl-2">
          <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-white/75 backdrop-blur-[5px]">
            <SearchBar />

            <div className="w-full max-w-md px-4 mt-10">
              <h2 className="text-xl font-bold mb-6">주소로 골라보기</h2>
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
                      : 'hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen'
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
                  <span className="font-semibold hover:font-bold">
                    {currGungu}
                  </span>
                </button>

                {/* 읍/면/동 버튼 */}
                <button
                  type="button"
                  className={`w-24 h-12 rounded-[10px] bg-white drop-shadow-[0_4px_6px_rgba(93,149,136,0.5)] transition ease-in-out delay-50 ${
                    currCity === '시/도' || currGungu === '시/군/구'
                      ? 'text-gray-400'
                      : 'hover:-translate-y-1 hover:scale-103 duration-300 hover:text-hanaGreen'
                  }`}
                  onClick={() => {
                    // local storage에서 key 값 삭제
                    localStorage.removeItem('currDong');

                    // 페이지 이동
                    setActivePage('dong');
                  }}
                  disabled={currCity === '시/도' || currGungu === '시/군/구'} // '시/도' or '시/군/구'일 때 버튼 비활성화
                >
                  <span className="font-semibold hover:font-bold">
                    {currDong}
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full max-w-md px-4 mt-16">
              <h2 className="text-xl font-bold mb-6">최근에 확인한 매물</h2>
              <div className="w-full">
                <CommonBackground className="p-5">
                  <div>최근에 확인한 매물이 없습니다.</div>
                  {/* {recentHouses === 'none' ? (
                    <div>최근에 확인한 매물이 없습니다.</div>
                  ) : (
                    recentHouses.map((house: House, index: number) => (
                      <div key={index}>
                        <RecentCheckedButton
                          // type="apt"
                          // onClick={() => {}}
                          title={house.title}
                          description={house.description}
                          roundedTop={index === 0}
                        />
                        {index < recentHouses.length - 1 && <hr />}
                      </div>
                    ))
                  )} */}
                </CommonBackground>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LocationFilter locationType={activePage} />
      )}
    </div>
  );
};

export default MainSideLayout;
