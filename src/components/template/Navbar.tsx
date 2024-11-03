import { useState, useEffect } from 'react';
import Consultant from '../../assets/img/main/consultant.jpeg';
import Home from '../../assets/img/main/home.jpeg';
import Map from '../../assets/img/main/map.jpeg';
import Mypage from '../../assets/img/main/mypage.jpeg';
import Profile from '../../assets/img/profile_ex.jpg';
import LoanDetail from '../../pages/LoanDetail.tsx';
import MainSideLayout from '../template/MainSideLayout';
import ConsultingTabLayout from './ConsultingTabLayout.tsx';
import MyPageLayout from './MyPageLayout.tsx';
import RealEstateLayout from './RealEstateList/RealEstateListLayout.tsx';

interface NavbarProps {
  state?: boolean;
  onTabChange?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ state, onTabChange }) => {
  const [activePage, setActivePage] = useState<
    'home' | 'map' | 'myPage' | 'consultant' | 'estateList'
  >('home');

  useEffect(() => {
    if (state) {
      setActivePage('estateList');
    }
  }, [state]);

  const handleSetActivePage = (
    page: 'home' | 'map' | 'myPage' | 'consultant' | 'estateList'
  ) => {
    setActivePage(page);
    onTabChange && onTabChange(); // 탭이 변경될 때마다 onTabChange 호출하여 Main의 estateState 초기화
  };

  return (
    <div className="space-x-16">
      <div className="left-0 top-0 w-20 h-full absolute bg-white shadow border-r border-[#e7e7e7] flex flex-col items-center p">
        <a
          href="/"
          className="mt-4 mb-10 flex flex-col items-center justify-center"
        >
          <div className="flex">
            <div className="text-hanaNavy text-sm text-center font-fontBold">
              Map
            </div>
            <div className="text-hanaGreen text-sm text-center font-fontBold">
              Hana
            </div>
          </div>
        </a>

        {/* 아이콘 버튼들을 감싸는 컨테이너 */}
        <div className="w-14 flex flex-col items-center space-y-5 flex-grow">
          <button
            onClick={() => handleSetActivePage('home')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Home}
                alt="Home Icon"
                className={`h-10 transition duration-200 transform ${
                  activePage === 'home'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  activePage === 'home' ? 'text-hanaGreen' : 'text-gray-300'
                }`}
              >
                홈
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSetActivePage('map')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Map}
                alt="Map Icon"
                className={`h-10 transition duration-200 transform ${
                  activePage === 'map'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  activePage === 'map' ? 'text-hanaGreen' : 'text-gray-300'
                }`}
              >
                지도
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSetActivePage('consultant')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Consultant}
                alt="Consultant Icon"
                className={`h-10 transition duration-200 transform ${
                  activePage === 'consultant'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  activePage === 'consultant'
                    ? 'text-hanaGreen'
                    : 'text-gray-300'
                }`}
              >
                상담
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSetActivePage('myPage')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Mypage}
                alt="Mypage Icon"
                className={`h-10 transition duration-200 transform ${
                  activePage === 'myPage'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  activePage === 'myPage' ? 'text-hanaGreen' : 'text-gray-300'
                }`}
              >
                마이홈
              </div>
            </div>
          </button>
        </div>

        {/* 프로필 이미지를 맨 아래로 배치 */}
        <div className="mb-4">
          <img
            className="w-12 h-12 rounded-full"
            src={Profile}
            alt="Profile Image"
          />
        </div>
      </div>

      {activePage === 'home' && <MainSideLayout />}
      {activePage === 'map' && <></>}
      {activePage === 'consultant' && <ConsultingTabLayout />}
      {activePage === 'myPage' && <MyPageLayout />}
      {activePage === 'estateList' && (
        <RealEstateLayout onBackClick={() => handleSetActivePage('map')} />
      )}
    </div>
  );
};
