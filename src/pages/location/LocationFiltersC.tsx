import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useState } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import LocationFilterGungu from './LocationFiltersG';

const LocationFilterCity = () => {
  const [activePage, setActivePage] = useState<'city' | 'gungu' | ''>('city');

  const currCity: string = '시/도';
  const currGungu: string = '시/군/구';
  const currDong: string = '읍/면/동';

  // 일단 더미 데이터
  const city: string[] = [
    '서울특별시',
    '부산광역시',
    '인천광역시',
    '대구광역시',
    '대전광역시',
    '광주광역시',
    '울산광역시',
    '경기도',
    '강원특별자치도',
    '세종특별자치시',
    '충청북도',
    '충청남도',
    '경상북도',
    '경상남도',
    '전북특별자치도',
    '전라남도',
    '제주특별자치도',
  ];

  // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  localStorage.setItem('city', JSON.stringify(city));

  const storedLocations: string[] = JSON.parse(
    localStorage.getItem('city') || '[]'
  );
  const storedKey: string = 'currCity';

  return (
    <div>
      {activePage === 'city' ? (
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
              <div className={`text-hanaGreen40 mr-2`}>{currCity}</div>
              <MdNavigateNext color="#ABCEC8" className="mr-2" />
              <div className={`text-hanaGreen40 mr-2`}>{currGungu}</div>
              <MdNavigateNext color="#ABCEC8" className="mr-2" />
              <div className="text-hanaGreen40 mr-2">{currDong}</div>
            </div>

            {/* 지역 선택 버튼 */}
            <div className="w-full grid grid-cols-3 gap-4 px-4 pb-6 text-sm">
              {storedLocations.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="w-24 h-12 rounded-[10px] bg-[#eeeeee]"
                  onClick={() => {
                    localStorage.setItem(storedKey, JSON.stringify(name));
                    setActivePage('gungu');
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
      ) : (
        <LocationFilterGungu />
      )}
    </div>
  );
};

export default LocationFilterCity;
