import Papa from 'papaparse';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import centerAtom from '../../recoil/center';
import LocationFilterCity from './LocationFiltersC';
import LocationFilterGungu from './LocationFiltersG';

type Info = {
  code: string;
  address: string;
  lat: number;
  lng: number;
};

const LocationFilterDong = () => {
  const setCenter = useSetRecoilState(centerAtom);

  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<'city' | 'gungu' | 'dong' | ''>(
    'dong'
  );

  const currCity: string = JSON.parse(
    localStorage.getItem('currCity') || '"시/도"'
  );
  const currGungu: string = JSON.parse(
    localStorage.getItem('currGungu') || '"시/군/구"'
  );
  const currDong: string = '읍/면/동';

  // 일단 더미 데이터
  const [dong, setDong] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      const fetchDong = new Set<string>();
      const fetchInfo: Array<Info> = [];

      await fetch('src/assets/output.csv')
        .then((response) => response.text())
        .then((csvString) => {
          Papa.parse<string>(csvString, {
            complete: (results) => {
              results.data.forEach((row) => {
                if (row[1] && row[1].startsWith(currCity + ' ' + currGungu)) {
                  const dongName = row[1].split(' ')[2];
                  if (dongName) {
                    fetchDong.add(dongName);
                    fetchInfo.push({
                      code: row[0] || '',
                      address: row[1] || '',
                      lat: parseFloat(row[3] || '0'),
                      lng: parseFloat(row[2] || '0'),
                    });
                  }
                }
              });
              setDong(fetchDong);
              localStorage.setItem('info', JSON.stringify(fetchInfo));
            },
          });
        });
    };

    fetchData();
  }, []);

  // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  localStorage.setItem('dong', JSON.stringify(Array.from(dong)));

  const storedLocations: string[] = JSON.parse(
    localStorage.getItem('dong') || '[]'
  );
  const storedKey: string = 'currDong';
  const info: Info[] = JSON.parse(localStorage.getItem('info') || '[]');

  return (
    <div>
      {activePage === 'dong' ? (
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
              <div
                className={`text-hanaGreen80 font-semibold mr-2 cursor-pointer`}
                onClick={() => setActivePage('gungu')}
              >
                {currGungu}
              </div>
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
                    navigate('/');
                    const fullAddress = `${currCity} ${currGungu} ${name}`;
                    const selected = info.find(
                      (item) => item.address === fullAddress
                    );
                    if (!selected) return;
                    const { lat, lng } = selected;
                    setCenter({
                      lat,
                      lng,
                    });
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
      ) : activePage === 'gungu' ? (
        <LocationFilterGungu />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationFilterDong;
