import { PiBuildingApartment } from 'react-icons/pi';
import { useState } from 'react';
import profileImage from '../assets/img/profile_ex.jpg';
import Button from '../components/atoms/Button.tsx';
import CommonBackground from '../components/atoms/CommonBackground.tsx';
import RegisterButtonGroup from '../components/atoms/RegisterPageButtonGroup.tsx';
import SemiTitle from '../components/atoms/SemiTitle.tsx';
import Swiper from '../components/atoms/Swiper.tsx';
import EditProfile from '../components/template/EditProfile.tsx';
import EditProfileLayout from '../components/template/EditProfileLayout.tsx';
import MyEstateList from '../components/template/MyEstateList.tsx';
import PropertyRegister from '../components/template/PropertyRegister.tsx';

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

  const handleEditProfile = () => {
    setCurrentPage('editProfile');
  };
  const handleEstate = () => {
    setCurrentPage('EstateList');
  };
  const profile = {
    imageSrc: profileImage,
    name: '김손님',
  };

  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '서울 성동구 금호산8길 14' },
    { name: '서울 용산구 백범로 329' },
    { name: '아파트 4' },
    { name: '아파트 5' },
  ];

  const interestAreas = ['성수', '홍대', '신촌'];

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
    <div className="w-[430px] backdrop-blur-[10px] overflow-y-auto bg-white/75 top-0 absolute pl-2 pt-3 h-full">
      {currentPage === 'main' ? (
        <>
          <EditProfile
            imageSrc={profile.imageSrc}
            name={profile.name}
            onEdit={handleEditProfile}
          />
          <div className="mt-10">
            <SemiTitle>내 정보</SemiTitle>
            <RegisterButtonGroup
              onRegister={handleRegister}
              job={'중소,중견기업 직장인'}
              income={'6000만원'}
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
                <CommonBackground className="mb-10 ml-1 h-20 flex items-center justify-center rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                  {item}
                </CommonBackground>
              )}
            />
          </div>

          {/* 내 관심 아파트 */}
          <div className="mt-10">
            <div className="mb-5">
              <SemiTitle>내 관심 아파트</SemiTitle>
            </div>
            <div className="flex flex-col gap-4 mr-1 ml-1">
              {assets.slice(0, 3).map((asset, index) => (
                <button key={index} className="w-full">
                  <CommonBackground className="flex p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                    <div className="w-full hover:transition-transform transform hover:scale-105 flex h-full items-center">
                      <PiBuildingApartment className="text-2xl text-hanaGreen" />
                      <div className="text-gray-800 font-medium ml-5">
                        {asset.name}
                      </div>
                    </div>
                  </CommonBackground>
                </button>
              ))}
              <div className="pb-4">
                <Button text="관심 매물 대출 상담하기" onClick={handleEstate} />
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
  );
}
