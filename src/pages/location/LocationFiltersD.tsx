import Papa from 'papaparse';
import { FaStar } from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import MyLocationModal from '../../components/template/Modal/MyLocation';
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
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [bookmarkedLocations, setBookmarkedLocations] = useState<
    Array<Record<string, Info>>
  >(JSON.parse(localStorage.getItem('bookmarkedLocations') || '[]'));

  const [isModalOpen, setIsModalOpen] = useState(false);

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
  localStorage.setItem('dong', JSON.stringify(Array.from(dong).sort()));

  const storedLocations: string[] = JSON.parse(
    localStorage.getItem('dong') || '[]'
  );
  const storedKey: string = 'currDong';
  const info: Info[] = JSON.parse(localStorage.getItem('info') || '[]');

  const handleNavigateToMap = () => {
    if (!selectedLocation) return; // 선택된 지역이 없으면 아무 작업도 하지 않음
    localStorage.setItem(storedKey, JSON.stringify(selectedLocation));

    const fullAddress = `${currCity} ${currGungu} ${selectedLocation}`;
    const selected = info.find((item) => item.address === fullAddress);

    if (!selected) return;

    const { lat, lng } = selected;
    setCenter({ lat, lng });
    navigate('/');
  };

  // 관심 지역 추가/삭제 함수 업데이트
  const handleBookmarkClick = () => {
    if (!selectedLocation) return;

    const isAlreadyBookmarked = bookmarkedLocations.some(
      (entry) => entry[selectedLocation] !== undefined
    );

    if (isAlreadyBookmarked) {
      // 관심 지역 삭제
      const updatedLocations = bookmarkedLocations.filter(
        (entry) => entry[selectedLocation] === undefined
      );

      setBookmarkedLocations(updatedLocations); // 상태 업데이트
      localStorage.setItem(
        'bookmarkedLocations',
        JSON.stringify(updatedLocations)
      );

      alert(`${selectedLocation}이(가) 관심 지역에서 삭제되었습니다.`);
    } else {
      // 관심 지역 추가
      setIsModalOpen(true); // 모달 열기
    }
  };

  // 관심 지역 등록 확인 함수 업데이트
  const handleConfirmBookmark = () => {
    if (selectedLocation) {
      const fullAddress = `${currCity} ${currGungu} ${selectedLocation}`;
      const selected = info.find((item) => item.address === fullAddress);

      if (!selected) {
        alert('선택한 지역 정보를 찾을 수 없습니다.');
        return;
      }

      const isAlreadyBookmarked = bookmarkedLocations.some(
        (entry) => entry[selectedLocation] !== undefined
      );

      if (!isAlreadyBookmarked) {
        if (bookmarkedLocations.length >= 3) {
          const name = Object.keys(bookmarkedLocations[0])[0];

          const userConfirmed = window.confirm(
            `관심 지역은 총 세 개까지만 등록 가능합니다. 기존의 [${name}]을 삭제하고 [${selectedLocation}]을 추가하시겠어요?`
          );

          if (userConfirmed) {
            const updatedLocations = [...bookmarkedLocations];
            updatedLocations.shift(); // 첫 번째 지역 삭제
            updatedLocations.push({ [selectedLocation]: selected });

            setBookmarkedLocations(updatedLocations); // 상태 업데이트
            localStorage.setItem(
              'bookmarkedLocations',
              JSON.stringify(updatedLocations)
            );

            alert(
              `[${name}]이 삭제되고 [${selectedLocation}]이 관심 지역으로 등록되었습니다.`
            );
            handleNavigateToMap();
          }
        } else {
          const updatedLocations = [
            ...bookmarkedLocations,
            { [selectedLocation]: selected },
          ];

          setBookmarkedLocations(updatedLocations); // 상태 업데이트
          localStorage.setItem(
            'bookmarkedLocations',
            JSON.stringify(updatedLocations)
          );

          alert(`${selectedLocation}이(가) 관심 지역으로 등록되었습니다.`);
          handleNavigateToMap();
        }
      }
    }

    setIsModalOpen(false); // 모달 닫기
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 별 아이콘의 색상 동기화
  const isBookmarked = selectedLocation
    ? bookmarkedLocations.some((entry) => entry[selectedLocation] !== undefined)
    : false;

  return (
    <div>
      {activePage === 'dong' ? (
        <div>
          <h2 className="text-xl text-slate-800 font-bold mb-6">
            주소로 골라보기
          </h2>
          <CommonBackground className="p-4 flex flex-col">
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
                  className={`w-24 h-12 rounded-[10px] font-medium ${
                    selectedLocation === name
                      ? 'bg-hanaGreen60 text-white'
                      : 'bg-[#eeeeee] text-slate-800'
                  } hover:font-bold`}
                  onClick={() => {
                    setSelectedLocation(name);
                  }}
                >
                  <span className="font-medium text-slate-800 hover:font-bold">
                    {name}
                  </span>
                </button>
              ))}
            </div>

            {/* 지도로 이동 & 관심 지역 추가 버튼 */}
            {selectedLocation && (
              <div className="relative inline-flex items-center mt-4">
                <button
                  type="button"
                  className="absolute right-2 p-2"
                  onClick={handleBookmarkClick}
                >
                  {/* 관심 지역 추가 버튼 */}
                  <FaStar
                    className={`${
                      isBookmarked ? 'text-yellow-300' : 'text-white'
                    } hover:text-yellow-300`}
                  />
                </button>

                <button
                  type="button"
                  className="p-2 bg-hanaGreen80 text-white rounded flex-1"
                  onClick={handleNavigateToMap} // 지도 이동 로직 실행
                >
                  지도로 이동하기
                </button>
              </div>
            )}

            {/* 모달 컴포넌트 */}
            {isModalOpen && (
              <MyLocationModal onClose={handleCloseModal}>
                <div className="p-4">
                  <p className="text-lg font-medium text-slate-800">
                    내 관심 지역으로 등록하시겠습니까?
                  </p>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                      onClick={handleCloseModal}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-hanaGreen80 text-white rounded"
                      onClick={handleConfirmBookmark}
                    >
                      등록
                    </button>
                  </div>
                </div>
              </MyLocationModal>
            )}
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
