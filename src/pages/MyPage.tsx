import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { realEstateData } from '../assets/Dummy.tsx';
import Background1 from '../assets/img/background1.jpg';
import Background2 from '../assets/img/background2.png';
import Background3 from '../assets/img/background3.jpg';
import People from '../assets/img/main/people.png';
import MyEstateList2 from '../assets/img/myEstateList2.png';
import CommonBackground from '../components/atoms/CommonBackground';
import MobileHeader from '../components/atoms/MobileHeader';
import SemiTitle from '../components/atoms/SemiTitle';
import Swiper from '../components/atoms/Swiper';
import EditProfile from '../components/template/EditProfile';
import EditProfileLayout from '../components/template/EditProfileLayout';
import MyEstateList from '../components/template/MyEstateList.tsx';
import PropertyManage from '../components/template/PropertyManage.tsx';
import centerAtom from '../recoil/center/atom.ts';
import { CookieUtils } from '../utils/CookieUtils.ts';
import RealEstateDetail from './RealEstateDetail/RealEstateDetail.tsx';
import PropertyGroup from './property/PropertyGroup.tsx';

interface BookmarkedLocation {
  [key: string]: {
    code: string;
    address: string;
    lat: number;
    lng: number;
  };
}

export default function MyPage() {
  const setCenter = useSetRecoilState(centerAtom);
  const [showRealEstate, setShowRealEstate] = useState(false);

  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'family'
    | 'main'
    | 'editProfile'
    | 'job'
    | 'income'
    | 'loan'
    | 'EstateList'
    | 'equity'
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

  const backgrounds = [
    { image: Background1 },
    { image: Background2 },
    { image: Background3 },
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
      | 'equity'
  ) => {
    setCurrentPage(type);
  };

  const handleNavigateToMap = (lat: number, lng: number) => {
    setCenter({ lat, lng });
    navigate('/');
  };

  return (
    <div className="top-0 absolute animate-fadeInRight">
      <div className="pl-6 w-[420px] backdrop-blur-[10px] absolute top-0 h-screen left-4 overflow-y-auto bg-gray-50/90 scrollbar-hide">
        {currentPage === 'main' ? (
          <>
            <div className="flex justify-between items-center">
              <MobileHeader
                title="내 정보 확인하기"
                onBack={() => navigate('/')}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-fontMedium pt-6">
                    안녕하세요
                  </div>
                  <div className="font-fontBold text-2xl">
                    {profile.name}
                    <span className="font-fontMedium text-2xl">님</span>
                  </div>
                </div>
                <div className="flex pt-6 pr-8 gap-2">
                  <EditProfile onEdit={handleEditProfile} />
                  <div>
                    <button
                      onClick={() => {
                        CookieUtils.removeCookieValue('connect.sid');
                        navigate('/');
                      }}
                      className="bg-hanaRed p-1 rounded-full shadow-md hover:bg-hanaRed20 transition duration-200"
                    >
                      <AiOutlineLogout className="text-xl text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-52">
                <img src={People} alt="people" />
              </div>
            </div>
            <div className="pt-5 pr-6">
              <div className="mt-10">
                <SemiTitle>내 정보</SemiTitle>
                <PropertyGroup onRegister={handleRegister} />
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
                <div className="mb-5 flex">
                  <SemiTitle>내 관심 매물</SemiTitle>
                  <div
                    className="ml-2 px-4 text-md text-white font-semibold bg-hanaColor2 hover:opacity-90' hover:scale-105 rounded-lg flex flex-col items-center justify-center shadow-md transition-transform duration-200 ease-in-out cursor-pointer"
                    onClick={handleEstate}
                  >
                    더보기
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {realEstateData.slice(0, 2).map((asset, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setShowRealEstate(true)}
                        className="bg-white hover:scale-105 rounded-lg flex flex-col items-center justify-center p-4 shadow-md transition-transform duration-200 ease-in-out cursor-pointer"
                      >
                        <>
                          <img
                            src={MyEstateList2}
                            alt={asset.location}
                            className="h-16 w-16 mb-2"
                          />
                          <span className="text-gray-600 font-sm font-fontCm text-center">
                            {asset.location}
                          </span>
                        </>
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
          <PropertyManage
            assetType={currentPage}
            onBack={() => setCurrentPage('main')}
          />
        )}
      </div>
      {showRealEstate && (
        <RealEstateDetail
          isStarFilled={true}
          onBackClick={() => setShowRealEstate(false)}
        />
      )}
    </div>
  );
}
