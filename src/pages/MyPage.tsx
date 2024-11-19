import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import Background1 from '../assets/img/background1.jpg';
import Background2 from '../assets/img/background2.png';
import Background3 from '../assets/img/background3.jpg';
import People from '../assets/img/main/people.png';
import MyEstateList1 from '../assets/img/myEstateList1.png';
import MyEstateList2 from '../assets/img/myEstateList2.png';
import MyEstateList3 from '../assets/img/myEstateList3.png';
import CommonBackground from '../components/atoms/CommonBackground';
import MobileHeader from '../components/atoms/MobileHeader';
import RegisterButtonGroup from '../components/atoms/RegisterPageButtonGroup';
import SemiTitle from '../components/atoms/SemiTitle';
import Swiper from '../components/atoms/Swiper';
import EditProfile from '../components/template/EditProfile';
import EditProfileLayout from '../components/template/EditProfileLayout';
import MyEstateList from '../components/template/MyEstateList.tsx';
import PropertyRegister from '../components/template/PropertyRegister';
import centerAtom from '../recoil/center/atom.ts';
import { CookieUtils } from '../utils/CookieUtils.ts';

interface BookmarkedLocation {
  [key: string]: {
    code: string;
    address: string;
    lat: number;
    lng: number;
  };
}

interface Asset {
  name: string;
}

export default function MyPage() {
  const setCenter = useSetRecoilState(centerAtom);

  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'family'
    | 'main'
    | 'editProfile'
    | 'job'
    | 'income'
    | 'loan'
    | 'EstateList'
  >('main');

  const [interestAreas, setInterestAreas] = useState<
    { name: string; lat: number; lng: number }[]
  >([]);

  // 로컬 스토리지에서 "관심 지역" 데이터 가져오기
  useEffect(() => {
    const savedLocations = localStorage.getItem('bookmarkedLocations');
    if (savedLocations) {
      try {
        const parsedLocations: BookmarkedLocation[] =
          JSON.parse(savedLocations);

        // parsedLocations이 갖고 있는 모든 객체를 처리
        const transformedLocations = parsedLocations.flatMap((item) =>
          Object.entries(item).map(([key, value]) => {
            const location = value as {
              code: string;
              address: string;
              lat: number;
              lng: number;
            };
            return {
              name: key,
              code: location.code,
              address: location.address,
              lat: location.lat,
              lng: location.lng,
            };
          })
        );

        // lat, lng 포함 변환
        const updatedInterestAreas = transformedLocations.map((location) => ({
          name: location.name,
          lat: location.lat,
          lng: location.lng,
        }));

        setInterestAreas(updatedInterestAreas); // 상태 업데이트
      } catch (error) {
        console.error('Error parsing bookmarkedLocations:', error);
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setCurrentPage('editProfile');
  };
  const handleEstate = () => {
    navigate('/my-estate-list');
  };
  const profile = {
    name: '김하나',
  };

  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '서울 성동구 금호산8길 14' },
    { name: '서울 용산구 백범로 329' },
    { name: '아파트 4' },
    { name: '아파트 5' },
  ];

  const backgrounds = [
    { image: Background1 },
    { image: Background2 },
    { image: Background3 },
  ];

  const interestApt = [
    { name: '서울 성동구 아차산로 111 2층', image: MyEstateList1 },
    { name: '서울 성동구 금호산8길 14', image: MyEstateList2 },
    { name: '서울 용산구 백범로 329', image: MyEstateList3 },
  ];

  // 관심 지역 + 배경사진 모음
  const combinedItems = interestAreas.map((area, index) => ({
    ...area,
    background: backgrounds[index],
  }));

  const handleRegister = (
    type:
      | 'home'
      | 'family'
      | 'main'
      | 'editProfile'
      | 'job'
      | 'income'
      | 'loan'
      | 'EstateList'
  ) => {
    setCurrentPage(type);
  };

  const handleNavigateToMap = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    navigate('/');
  };

  return (
    <div className="top-0 absolute animate-fadeInRight">
      <div className="pl-6 w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-white/90 scrollbar-hide">
        {currentPage === 'main' ? (
          <>
            <div className="flex justify-between items-center">
              <MobileHeader
                title="내 정보 확인하기"
                onBack={() => navigate('/')}
              />
              <button
                onClick={() => {
                  CookieUtils.removeCookieValue('connect.sid');
                  navigate('/');
                }}
                className="flex items-center justify-center text-center h-8 text-white px-4 py-1 mr-4 text-xs bg-hanaRed80 rounded hover:bg-hanaRed transition duration-150 ease-in-out"
              >
                로그아웃
              </button>
            </div>

            <div>
              <div className="text-2xl font-fontMedium pt-6">안녕하세요</div>
              <EditProfile name={profile.name} onEdit={handleEditProfile} />
              <div className="h-52">
                <img src={People} alt="people" />
              </div>
            </div>
            <div className="pt-5 pr-6">
              <div className="mt-10">
                <SemiTitle>내 정보</SemiTitle>
                <RegisterButtonGroup
                  onRegister={handleRegister}
                  job={'중소,중견기업 직장인'}
                  income={'6000만 원'}
                  vehicleOwnership={''}
                  propertyOwnership={''}
                  confirmationDate={''}
                />
              </div>

              {/* 내 관심 지역 */}
              <div className="h-32">
                <div className="mt-10">
                  <SemiTitle>내 관심 지역</SemiTitle>
                </div>
                {interestAreas.length > 0 ? (
                  <Swiper
                    items={combinedItems}
                    pagination={{ clickable: true }}
                    renderItem={(item) => (
                      <CommonBackground
                        className="mb-10 ml-1 h-20 flex items-center justify-center rounded-lg shadow-md relative overflow-hidden cursor-pointer"
                        onClick={() => handleNavigateToMap(item.lat, item.lng)}
                      >
                        <img
                          src={item.background.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <span className="relative text-white font-semibold">
                          {item.name}
                        </span>
                      </CommonBackground>
                    )}
                  />
                ) : (
                  <div className="mt-5 text-gray-500 text-center">
                    아직 등록한 관심 지역이 없습니다.
                  </div>
                )}
              </div>

              {/* 내 관심 아파트 */}
              <div className="mt-10 mb-5">
                <div className="mb-5">
                  <SemiTitle>내 관심 매물</SemiTitle>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {assets.slice(0, 4).map((asset, index) => {
                    const matchingInterest = interestApt.find(
                      (interest) => interest.name === asset.name
                    );

                    return (
                      <div
                        key={index}
                        onClick={handleEstate}
                        className={`${
                          index === 0
                            ? 'bg-hanaColor2 hover:opacity-90'
                            : 'bg-white hover:scale-105'
                        } rounded-lg flex flex-col items-center justify-center p-4 shadow-md transition-transform duration-200 ease-in-out cursor-pointer`}
                      >
                        {index === 0 ? (
                          <span className="text-4xl text-white font-semibold">
                            +
                          </span>
                        ) : (
                          <>
                            <img
                              src={matchingInterest?.image || MyEstateList1}
                              alt={asset.name}
                              className="h-16 w-16 mb-2"
                            />
                            <span className="text-gray-600 font-sm font-fontCm text-center">
                              {asset.name}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 화면 전환 */}
          </>
        ) : currentPage === 'editProfile' ? (
          <EditProfileLayout onBack={() => setCurrentPage('main')} />
        ) : currentPage === 'EstateList' ? (
          <MyEstateList />
        ) : (
          <PropertyRegister
            assetType={currentPage}
            onBack={() => setCurrentPage('main')}
          />
        )}
      </div>
    </div>
  );
}
