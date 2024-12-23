import { BsInfoCircle } from 'react-icons/bs';
import { MdNavigateNext } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { addDetailEstateData } from '../assets/Dummy';
import HanaLogo from '../assets/img/hanaLogo.png';
import CommonBackground from '../components/atoms/CommonBackground.tsx';
import SearchBar from '../components/atoms/SearchBar.tsx';
import Swiper from '../components/atoms/Swiper';
import UserManual from '../components/template/userManual.tsx';
import { AdditionalEstate } from '../types/hanaAsset';
import RealEstateDetail from './RealEstateDetail/RealEstateDetail.tsx';
import RealEstateCard from './RealEstateList/RealEstateCard.tsx';
import LocationFilter from './location/LocationFilter.tsx';

export default function Main() {
  const [activePage, setActivePage] = useState<
    'city' | 'gungu' | 'dong' | 'main'
  >('main');

  // 일단 시/도, 시/군/구, 읍/면/동 정보는 로컬 스토리지에서 가져오는 걸로 (추후 DB 연동이 되겠죠? 구웃)
  const [currCity, setCity] = useState<string>('시/도');
  const [currGungu, setGungu] = useState<string>('시/군/구');
  const [currDong, setDong] = useState<string>('읍/면/동');

  const [selectedEstate, setSelectedEstate] = useState<AdditionalEstate | null>(
    null
  ); // 초기값을 null로 설정
  const [showRealEstate, setShowRealEstate] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
  const recentHouses: 'none' | string[] = (() => {
    const recents = localStorage.getItem('recentVisitedList');

    try {
      return recents ? JSON.parse(recents) : 'none';
    } catch (e) {
      console.error('Invalid JSON format in recentVisitedList:', e);
      return 'none'; // 잘못된 JSON 데이터가 있는 경우 안전하게 'none' 반환
    }
  })();

  // 최근 확인한 매물 리스트와 매칭되는 더미 데이터 필터링
  const recentRealEstateData: AdditionalEstate[] =
    recentHouses !== 'none'
      ? addDetailEstateData
          .filter((estate) => recentHouses.includes(estate.basicInfo.atclNm))
          .sort(
            (a, b) =>
              recentHouses.indexOf(a.basicInfo.atclNm) -
              recentHouses.indexOf(b.basicInfo.atclNm)
          )
      : [];

  const handleCardClick = (estate: AdditionalEstate) => {
    setSelectedEstate(estate); // 선택된 매물 정보 설정
  };

  return (
    <div>
      <div className="w-[420px]">
        {activePage === 'main' ? (
          <div className="top-0 absolute pl-4 animate-slideInRight">
            <div className="w-[420px] max-w-[420px] h-svh px-5 absolute bg-gray-50/90 backdrop-blur-[5px] overflow-y-auto scrollbar-hide">
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
                  빠른 메뉴 구현중
                </h2>
                <div className="flex mb-2">
                  <CommonBackground
                    className="mr-1 p-4"
                    onClick={() =>
                      window.open(
                        'https://www.kebhana.com/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821&_menuNo=98786'
                      )
                    }
                  >
                    <div>
                      <p className="text-sm">하나은행 대출</p>
                      <div className="w-full">
                        <img
                          alt="HanaLogo"
                          src={HanaLogo}
                          className="h-10"
                        ></img>
                      </div>
                    </div>
                  </CommonBackground>
                  <CommonBackground
                    className="mr-1 p-4"
                    onClick={() =>
                      window.open(
                        'https://www.kebhana.com/cont/mall/mall09/mall0903/mall090306/index.jsp'
                      )
                    }
                  >
                    버팀목 대출
                  </CommonBackground>

                  <CommonBackground
                    className="p-4"
                    onClick={() => setShowModal(true)}
                  >
                    이용 가이드
                  </CommonBackground>

                  {showModal && (
                    <UserManual close={() => setShowModal(false)} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl text-slate-800 font-bold mb-6 mt-10 flex">
                    최근에 확인한 매물
                    <div className="ml-2 mt-1">
                      <BsInfoCircle />
                    </div>
                  </h2>
                  <CommonBackground className="w-full px-2 py-1 mb-6">
                    {recentHouses === 'none' ? (
                      <div>아직 둘러본 매물이 없네요.</div>
                    ) : (
                      <Swiper
                        items={recentRealEstateData}
                        pagination={{ clickable: true }}
                        renderItem={(recentRealEstateData) => (
                          <RealEstateCard
                            estate={recentRealEstateData}
                            isStarFilled={false}
                            onClick={() => {
                              handleCardClick(recentRealEstateData);
                              setShowRealEstate(true);
                            }}
                          />
                        )}
                        spaceBetween={30}
                        slidesPerView={1}
                      />
                    )}
                  </CommonBackground>
                </div>
              </div>
            </div>
            {showRealEstate && selectedEstate && (
              <RealEstateDetail
                isStarFilled={false}
                estate={selectedEstate}
                onBackClick={() => setShowRealEstate(false)}
              />
            )}
          </div>
        ) : (
          <LocationFilter locationType={activePage} />
        )}
      </div>
    </div>
  );
}
