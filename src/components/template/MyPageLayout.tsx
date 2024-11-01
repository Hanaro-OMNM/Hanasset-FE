import { PiBuildingApartment } from 'react-icons/pi';
import { useState } from 'react';
import profileImage from '../../assets/img/profile_ex.jpg';
import CommonBackground from '../atoms/CommonBackground';
import RegisterButtonGroup from '../atoms/RegisterPageButtonGroup';
import SemiTitle from '../atoms/SemiTitle';
import Swiper from '../atoms/Swiper';
import EditProfile from '../template/EditProfile';
import EditProfileLayout from '../template/EditProfileLayout';
import PropertyRegister from './PropertyRegister';

interface Asset {
  name: string;
}

export default function MyPageLayout() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'family' | 'main' | 'editProfile' | 'job' | 'income' | 'loan'
  >('main');
  const handleEditProfile = () => {
    setCurrentPage('editProfile');
  };

  const profile = {
    imageSrc: profileImage,
    name: '김손님',
  };

  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '아파트 2' },
    { name: '아파트 3' },
  ];

  const interestAreas = ['성수', '홍대', '신촌'];

  const itemsPerPage = 2;
  const slides: Asset[][] = Array.from(
    { length: Math.ceil(assets.length / itemsPerPage) },
    (_, index) => assets.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
  );

  const handleRegister = (
    type: 'home' | 'family' | 'main' | 'editProfile' | 'job' | 'income' | 'loan'
  ) => {
    setCurrentPage(type);
  };

  return (
    <div className="w-[420px] p-6 backdrop-blur-[10px] absolute top-0 left-2 h-full overflow-y-auto bg-white/75">
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

          <div className="h-32">
            <div className="mt-10">
              <SemiTitle>내 관심 지역</SemiTitle>
            </div>
            <Swiper
              items={interestAreas}
              pagination={false}
              renderItem={(item) => (
                <CommonBackground className="ml-1 h-20 flex items-center justify-center rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                  {item}
                </CommonBackground>
              )}
            />
          </div>

          <div>
            <div className="mt-10">
              <SemiTitle>내 관심 아파트</SemiTitle>
            </div>
            <Swiper
              items={slides}
              renderItem={(pageAssets) => (
                <div className="flex flex-col gap-4 h-52 mr-1 ml-1">
                  {pageAssets.map((asset) => (
                    <button
                      key={asset.name}
                      className="w-full transition-transform transform hover:scale-105"
                    >
                      <CommonBackground className="flex items-center p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                        <PiBuildingApartment className="text-2xl text-hanaGreen" />
                        <div className="ml-4 text-gray-800 font-medium">
                          {asset.name}
                        </div>
                      </CommonBackground>
                    </button>
                  ))}
                </div>
              )}
              spaceBetween={30}
              slidesPerView={1}
            />
          </div>
        </>
      ) : currentPage === 'editProfile' ? (
        <EditProfileLayout onBack={() => setCurrentPage('main')} />
      ) : (
        <PropertyRegister
          assetType={currentPage}
          onBack={() => setCurrentPage('main')}
        />
      )}
    </div>
  );
}
