import Papa from 'papaparse';
import { FaStar } from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import MyLocationModal from '../../components/template/Modal/MyLocation';
import { PlatformAPI } from '../../platform/PlatformAPI.ts';
import centerAtom from '../../recoil/center';
import isLoginAtom from '../../recoil/isLogin';
import { BookmarkAreaInfo } from '../../types/hanaAssetResponse.common.ts';
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
  const [isLogin] = useRecoilState(isLoginAtom);

  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<'city' | 'gungu' | 'dong' | ''>(
    'dong'
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [bookmarkedLocations, setBookmarkedLocations] = useState<
    BookmarkAreaInfo[] | null
  >(null);

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const [generalAddModalOpen, setGeneralAddModalOpen] = useState(false);

  const [fullAddModalOpen, setFullAddModalOpen] = useState(false);

  const [isFull, setIsFull] = useState(false);

  const [deleteLocation, setDeleteLocation] = useState<string | null>(null);

  const currCity: string = JSON.parse(
    localStorage.getItem('currCity') || '"시/도"'
  );

  const currGungu: string = JSON.parse(
    localStorage.getItem('currGungu') || '"시/군/구"'
  );
  const currDong: string = '읍/면/동';

  const [dong, setDong] = useState<Set<string>>(new Set());

  // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  localStorage.setItem('dong', JSON.stringify(Array.from(dong).sort()));

  const storedLocations: string[] = JSON.parse(
    localStorage.getItem('dong') || '[]'
  );
  const storedKey: string = 'currDong';
  const info: Info[] = JSON.parse(localStorage.getItem('info') || '[]');

  const getBookmarksAreaCode = async () => {
    try {
      const bookmarksAreaCodeResponse =
        await PlatformAPI.getBookmarksAreaCode();
      if (bookmarksAreaCodeResponse) {
        setBookmarkedLocations(bookmarksAreaCodeResponse.areaCodes);
      }
    } catch (error) {
      console.error('Error fetching bookmarks area code:', error);
    }
  };

  const getBookmarksAreaCodeStatus = async () => {
    try {
      const bookmarksAreaCodeStatus =
        await PlatformAPI.getBookmarksAreaCodeStatus();
      if (bookmarksAreaCodeStatus) {
        setIsFull(bookmarksAreaCodeStatus.full);
        setDeleteLocation(bookmarksAreaCodeStatus.emdName);
      }
    } catch (error) {
      console.error('Error fetching bookmarks area code:', error);
    }
  };

  const dongInfoFetch = async () => {
    const fetchDong = new Set<string>();
    const fetchInfo: Array<Info> = [];

    await fetch('src/assets/dongInfo.csv')
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

  useEffect(() => {
    if (isLogin && !bookmarkedLocations && dong.size == 0) {
      getBookmarksAreaCodeStatus();
      getBookmarksAreaCode();
      dongInfoFetch();
    }

    if (!isLogin && !bookmarkedLocations && dong.size == 0) {
      dongInfoFetch();
    }
  }, [isLogin, bookmarkedLocations, dongInfoFetch, dong.size]);

  useEffect(() => {
    if (bookmarkedLocations) {
      const isBookmarked = bookmarkedLocations.some(
        (items) => items.emdName === selectedLocation
      );
      setIsBookmarked(isBookmarked);
    }
  }, [bookmarkedLocations, selectedLocation]);

  const handleNavigateToMap = () => {
    if (!selectedLocation) return;
    localStorage.setItem(storedKey, JSON.stringify(selectedLocation));

    const fullAddress = `${currCity} ${currGungu} ${selectedLocation}`;
    const selected = info.find((item) => item.address === fullAddress);

    if (!selected) return;

    const { lat, lng } = selected;
    setCenter({ lat, lng });
    navigate('/');
  };

  // 관심 지역 추가/삭제 함수 업데이트
  const handleBookmarkClick = async () => {
    if (!selectedLocation) return;
    else {
      const fullAddress = `${currCity} ${currGungu} ${selectedLocation}`;
      const selectedCode = info.find(
        (item) => item.address === fullAddress
      )?.code;

      if (isBookmarked && selectedCode) {
        removeBookmark(selectedCode);
        alert(`${selectedLocation}이(가) 관심 지역에서 삭제되었습니다.`);
      } else {
        if (!isFull) {
          setGeneralAddModalOpen(true);
        } else {
          setFullAddModalOpen(true);
        }
      }
    }
  };

  const removeBookmark = async (code: string) => {
    try {
      const responseStatus = await PlatformAPI.removeBookmarksAreaCode(code);
      if (responseStatus === 200) {
        getBookmarksAreaCode();
        getBookmarksAreaCodeStatus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBookmark = async (code: string) => {
    try {
      const responseStatus = await PlatformAPI.addBookmarksAreaCode(code);
      if (responseStatus === 200) {
        getBookmarksAreaCode();
        getBookmarksAreaCodeStatus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 관심 지역 등록 확인 함수 업데이트
  const handleConfirmBookmark = () => {
    if (selectedLocation) {
      const fullAddress = `${currCity} ${currGungu} ${selectedLocation}`;
      const selectedCode = info.find(
        (item) => item.address === fullAddress
      )?.code;

      if (!selectedCode) {
        alert('선택한 지역 정보를 찾을 수 없습니다.');
        return;
      } else {
        addBookmark(selectedCode);
      }
    }
    if (generalAddModalOpen) {
      setGeneralAddModalOpen(false);
    }
    if (fullAddModalOpen) {
      setFullAddModalOpen(false);
    }
  };

  // 모달 닫기
  const handleGeneralAddCloseModal = () => {
    setGeneralAddModalOpen(false);
  };

  const handleFullAddCloseModal = () => {
    setFullAddModalOpen(false);
  };

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
                {isLogin && (
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
                )}

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
            {generalAddModalOpen && (
              <MyLocationModal onClose={handleGeneralAddCloseModal}>
                <div className="p-4">
                  <p className="text-lg font-medium text-slate-800">
                    내 관심 지역으로 등록하시겠습니까?
                  </p>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                      onClick={handleGeneralAddCloseModal}
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
            {fullAddModalOpen && (
              <MyLocationModal onClose={handleFullAddCloseModal}>
                <div className="p-4">
                  <p className="text-lg font-medium text-slate-800">
                    {deleteLocation}을 지우고 {selectedLocation}을 내 관심
                    지역으로 등록하시겠습니까?
                  </p>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                      onClick={handleFullAddCloseModal}
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
