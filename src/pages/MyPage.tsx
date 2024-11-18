import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Background1 from '../assets/img/background1.jpg';
import Background2 from '../assets/img/background2.png';
import Background3 from '../assets/img/background3.jpg';
import House from '../assets/img/house.png';
import People from '../assets/img/main/people.png';
import CommonBackground from '../components/atoms/CommonBackground';
import MobileHeader from '../components/atoms/MobileHeader';
import RegisterButtonGroup from '../components/atoms/RegisterPageButtonGroup';
import SemiTitle from '../components/atoms/SemiTitle';
import Swiper from '../components/atoms/Swiper';
import EditProfile from '../components/template/EditProfile';
import EditProfileLayout from '../components/template/EditProfileLayout';
import PropertyRegister from '../components/template/PropertyRegister';
import MyEstateList from '../components/template/SelectEstate.tsx';
import { CookieUtils } from '../utils/CookieUtils.ts';

interface Asset {
  name: string;
}

export default function MyPage() {
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
  const navigate = useNavigate();

  const handleEditProfile = () => {
    setCurrentPage('editProfile');
  };
  const handleEstate = () => {
    setCurrentPage('EstateList');
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

  const interestAreas = [
    { name: '성수', image: Background1 },
    { name: '홍대', image: Background2 },
    { name: '신촌', image: Background3 },
  ];

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

  return (
    <div className="top-0 absolute pl-4 animate-slideInRight">
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
                  navigate('/'); // 로그인 페이지로 리다이렉트
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
                <Swiper
                  items={interestAreas}
                  pagination={{ clickable: true }}
                  renderItem={(item) => (
                    <CommonBackground className="mb-10 ml-1 h-20 flex items-center justify-center rounded-lg shadow-md relative overflow-hidden">
                      <img
                        src={item.image}
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
              </div>

              {/* 내 관심 아파트 */}
              <div className="mt-10 mb-5">
                <div className="mb-5">
                  <SemiTitle>내 관심 매물</SemiTitle>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {assets.slice(0, 4).map((asset, index) => (
                    <div
                      key={index}
                      onClick={index === 0 ? handleEstate : undefined}
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
                            src={House}
                            alt="asset icon"
                            className="h-16 w-16 mb-2"
                          />
                          <span className="text-gray-600 font-sm font-fontCm text-center">
                            {asset.name}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 화면 전환 */}
          </>
        ) : currentPage === 'editProfile' ? (
          <EditProfileLayout onBack={() => setCurrentPage('main')} />
        ) : currentPage === 'EstateList' ? (
          <MyEstateList onBack={() => setCurrentPage('main')} />
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
