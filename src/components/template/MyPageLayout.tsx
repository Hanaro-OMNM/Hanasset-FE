import { AiOutlineRight } from 'react-icons/ai';
import { PiBuildingApartment } from 'react-icons/pi';
import { useState, useMemo } from 'react';
import profileImage from '../../assets/img/profile_ex.jpg';
import Button from '../atoms/Button';
import CommonBackground from '../atoms/CommonBackground';
import RegisterButtonGroup from '../atoms/RegisterPageButtonGroup';
import SemiTitle from '../atoms/SemiTitle';
import Swiper from '../atoms/Swiper';
import AssetRegister from '../template/AssetRegister';
import EditProfile from '../template/EditProfile';
import EditProfileLayout from '../template/EditProfileLayout';
import MyEstateList from './MyEstateList';

interface Asset {
  name: string;
}
interface Consultating {
  title: string;
  date: string;
  time: string;
}

export default function MyPageLayout() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'car' | 'main' | 'editProfile' | 'EstateList'
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

  const consultatings: Consultating[] = [
    { title: '전세금 안심 대출', date: '2024.09.12', time: '13:04' },
    { title: '하나 청년전세론', date: '2024.08.27', time: '16:34' },
  ];

  const assets: Asset[] = [
    { name: '서울 성동구 아차산로 111 2층' },
    { name: '서울 성동구 금호산8길 14' },
    { name: '서울 용산구 백범로 329' },
    { name: '아파트 4' },
    { name: '아파트 5' },
  ];

  const interestAreas = ['성수', '홍대', '신촌'];

  const handleRegister = (type: 'home' | 'car') => {
    setCurrentPage(type);
  };

  const handleConsultant = () => {
    console.log('상담 페이지로 이동');
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

          <SemiTitle>내 상담 내역</SemiTitle>
          <CommonBackground className="p-5">
            {consultatings.map((consultating, index) => (
              <div
                key={index}
                onClick={handleConsultant}
                className="border-b last:border-none py-4 flex items-center justify-between hover:transition-transform transform hover:scale-105"
              >
                <button className="w-full text-left">
                  <h3 className="text-lg">{consultating.title}</h3>
                  <p className="text-xs text-gray-500">
                    마지막 상담: {consultating.date} {consultating.time}
                  </p>
                </button>
                <AiOutlineRight className="text-gray-400 text-xl" />
              </div>
            ))}
            <Button
              text="상담 내역 더 보기"
              onClick={handleConsultant}
              version="ver1"
            />
          </CommonBackground>

          <div className="mt-10">
            <RegisterButtonGroup onRegister={handleRegister} />
          </div>

          <div className="h-32">
            <div className="mt-10">
              <SemiTitle>내 관심 지역</SemiTitle>
            </div>
            <Swiper
              items={interestAreas}
              pagination={{ clickable: false }}
              renderItem={(item) => (
                <CommonBackground className="ml-1 h-20 flex items-center justify-center rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                  {item}
                </CommonBackground>
              )}
            />
          </div>

          <div className="mt-20">
            <SemiTitle>내 관심 아파트</SemiTitle>
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
              <Button text="더보기" onClick={handleEstate} />
            </div>
          </div>

          {/* 화면 전환 */}
        </>
      ) : currentPage === 'editProfile' ? (
        <EditProfileLayout onBack={() => setCurrentPage('main')} />
      ) : currentPage === 'EstateList' ? (
        <MyEstateList onBack={() => setCurrentPage('main')} />
      ) : (
        <AssetRegister
          assetType={currentPage}
          onBack={() => setCurrentPage('main')}
        />
      )}
    </div>
  );
}
