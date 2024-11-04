import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useState } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import LocationFilterCity from './LocationFiltersC';
import LocationFilterDong from './LocationFiltersD';

const LocationFilterGungu = () => {
  const [activePage, setActivePage] = useState<'city' | 'gungu' | 'dong' | ''>(
    'gungu'
  );

  const currCity: string = JSON.parse(
    localStorage.getItem('currCity') || '"시/도"'
  );
  const currGungu: string = '시/군/구';
  const currDong: string = '읍/면/동';

  // 일단 더미 데이터
  const gungu: string[] = [
    '강동구',
    '강남구',
    '송파구',
    '영등포구',
    '성동구',
    '광진구',
    '동작구',
  ];

  // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  localStorage.setItem('gungu', JSON.stringify(gungu));

  const storedLocations: string[] = JSON.parse(
    localStorage.getItem('gungu') || '[]'
  );
  const storedKey: string = 'currGungu';

  return (
    <div>
      {activePage === 'gungu' ? (
        <div>
          <h2 className="text-xl text-slate-800 font-bold mb-6">
            주소로 골라보기
          </h2>
          <CommonBackground className="p-4">
            {/* <아이콘> 시/도 > 시/군/구 > 읍/면/동 */}
            <div className="flex items-center mb-10">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-hanaGreen40 mr-4">
                <HiOutlineOfficeBuilding color="white" />
              </div>
              <div
                className={`text-hanaGreen80 font-semibold mr-2 cursor-pointer`}
                onClick={() => setActivePage('city')}
              >
                {currCity}
              </div>
              <MdNavigateNext color="#ABCEC8" className="mr-2" />
              <div className={`text-hanaGreen40 mr-2`}>{currGungu}</div>
              <MdNavigateNext color="#ABCEC8" className="mr-2" />
              <div className="text-hanaGreen40 mr-2">{currDong}</div>
            </div>

            {/* 지역 선택 버튼 */}
            <div className="w-full grid grid-cols-3 gap-4 px-4 pb-6">
              {storedLocations.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="w-24 h-12 rounded-[10px] bg-[#eeeeee]"
                  onClick={() => {
                    localStorage.setItem(storedKey, JSON.stringify(name));
                    setActivePage('dong');
                  }}
                >
                  <span className="font-medium text-slate-800 hover:font-bold">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </CommonBackground>
        </div>
      ) : activePage === 'city' ? (
        <LocationFilterCity />
      ) : activePage === 'dong' ? (
        <LocationFilterDong />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationFilterGungu;
