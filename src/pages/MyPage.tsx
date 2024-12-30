import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
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
import { PlatformAPI } from '../platform/PlatformAPI.ts';
import { assetState } from '../recoil/asset/atom.ts';
import centerAtom from '../recoil/center/atom.ts';
import isLoginAtom from '../recoil/isLogin';
import {
  BookmarkAreaInfo,
  RealEstatePreview,
} from '../types/hanaAssetResponse.common.ts';
import RealEstateDetail from './RealEstateDetail/RealEstateDetail.tsx';
import PropertyGroup from './property/PropertyGroup.tsx';
import PropertyManage from './property/PropertyManage.tsx';

export default function MyPage() {
  const setCenter = useSetRecoilState(centerAtom);
  const [selectedEstate, setSelectedEstate] =
    useState<RealEstatePreview | null>(null);
  const [bookmarkEstateList, setBookmarkEstateList] = useState<
    RealEstatePreview[] | null
  >(null);

  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'family'
    | 'main'
    | 'editProfile'
    | 'job'
    | 'income'
    | 'loan'
    | 'EstateList'
    | 'capital'
  >('main');

  const [bookmarkedLocations, setBookmarkedLocations] = useState<
    BookmarkAreaInfo[] | null
  >(null);

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [property, setProperty] = useRecoilState(assetState);

  const getBookmarkRealEstates = async () => {
    try {
      const bookmarkRealEstateListResponse =
        await PlatformAPI.getBookmarkRealEstates();
      if (bookmarkRealEstateListResponse) {
        const bookmarkRealEstateList =
          bookmarkRealEstateListResponse.realEstates;
        setBookmarkEstateList(bookmarkRealEstateList);
      }
    } catch (error) {
      console.error('Error getBookmarkRealEstates:', error);
    }
  };
  const accessToken = localStorage.getItem('accessToken');

  const [userName, setUserName] = useState<string>('');

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

  // 로컬 스토리지에서 "관심 지역" 데이터 가져오기
  useEffect(() => {
    if (isLogin) {
      getBookmarksAreaCode();
      getBookmarkRealEstates();
    }
  }, [isLogin]);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setCurrentPage('editProfile');
  };

  const handleEstate = (bookmarkEstateList: RealEstatePreview[]) => {
    navigate('/my-estate-list', {
      state: {
        bookMark: bookmarkEstateList,
      },
    });
  };

  const backgrounds = [
    { image: Background1 },
    { image: Background2 },
    { image: Background3 },
  ];

  // 관심 지역 + 배경사진 모음
  const combinedItems =
    bookmarkedLocations &&
    bookmarkedLocations.map((area, index) => ({
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
      | 'capital'
  ) => {
    setCurrentPage(type);
  };

  const handleNavigateToMap = (lat: number, lng: number) => {
    setCenter({ lat, lng, bookmarkLocation: true });
    navigate('/');
  };

  const logout = async () => {
    const response = await PlatformAPI.logout();
    if (response) {
      navigate('/');
      if (location.pathname === '/' && isLogin) {
        alert('로그아웃 성공하셨습니다.');
        setIsLogin(false);
      }
    }
  };

  const isBookmarkedRealEstate = (id: number): boolean => {
    if (!bookmarkEstateList) return false;
    return bookmarkEstateList.some((item) => item.realEstateId === id);
  };

  const fetchUserName = async () => {
    try {
      if (!accessToken) {
        console.error('No access token available');
        return;
      }
      const response = await PlatformAPI.getUserInfo();
      setUserName(response.name);
    } catch (err) {
      console.error('Failed to fetch user info:', err);
    }
  };

  const fetchUserProperty = async () => {
    try {
      if (!accessToken) {
        console.error('No access token available');
        return;
      }
      const response = await PlatformAPI.getPropertyValue();
      if (property) {
        setProperty({
          jobType: response.jobType,
          incomeAmount: response.income,
          capitalAmount: response.capital,
          hasHome: response.hasHouse,
          hasLoan: !!(response.annualInterest && response.annualPrincipal),
          annualInterest: -1,
          annualPrincipal: -1,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchUserName();
      fetchUserProperty();
    }
  }, [accessToken]);

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
                    {userName}
                    <span className="font-fontMedium text-2xl">님</span>
                  </div>
                </div>
                <div className="flex pt-6 pr-8 gap-2">
                  <EditProfile onEdit={handleEditProfile} />
                  <div>
                    <button
                      onClick={logout}
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
                {combinedItems && combinedItems ? (
                  <Swiper
                    items={combinedItems.slice(0, 3)}
                    pagination={{ clickable: true }}
                    renderItem={(item) =>
                      item.background && (
                        <CommonBackground
                          className="mb-10 ml-1 h-20 flex items-center justify-center rounded-lg shadow-md relative overflow-hidden cursor-pointer"
                          onClick={() =>
                            handleNavigateToMap(item.centerLat, item.centerLng)
                          }
                        >
                          <img
                            src={item.background.image}
                            alt={item.emdName}
                            className="absolute inset-0 w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute inset-0 bg-black opacity-30"></div>
                          <span className="relative text-white font-semibold">
                            {item.emdName}
                          </span>
                        </CommonBackground>
                      )
                    }
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
                    onClick={() =>
                      bookmarkEstateList && handleEstate(bookmarkEstateList)
                    }
                  >
                    더보기
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {bookmarkEstateList ? (
                    bookmarkEstateList.slice(0, 2).map((asset, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedEstate(asset)}
                          className="bg-white hover:scale-105 rounded-lg flex flex-col items-center justify-center p-4 shadow-md transition-transform duration-200 ease-in-out cursor-pointer"
                        >
                          <>
                            <img
                              src={MyEstateList2}
                              alt={asset.name}
                              className="h-16 w-16 mb-2"
                            />
                            <span className="text-gray-600 font-sm font-fontCm text-center">
                              {asset.name}
                            </span>
                          </>
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
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
      {selectedEstate && (
        <RealEstateDetail
          realEstate={selectedEstate}
          isBookmarked={isBookmarkedRealEstate(selectedEstate.realEstateId)}
          onBookmarkUpdate={getBookmarkRealEstates}
          onBackClick={() => setSelectedEstate(null)}
        />
      )}
    </div>
  );
}
