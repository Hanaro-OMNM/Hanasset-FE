import { FaHome, FaMap } from 'react-icons/fa';
import { FaHouseUser } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Profile from '../../assets/img/profile_ex.jpg';
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

  // 선택된 매물이 있으면 자동으로 'estateList' 페이지로 이동하도록 설정
  useEffect(() => {
    if (state) {
      setActivePage('estateList');
    }
  }, [state]);

  const handleSetActivePage = (
    page: 'home' | 'map' | 'myPage' | 'consultant' | 'estateList'
  ) => {
    setActivePage(page);
    onTabChange!(); // 탭이 변경될 때마다 onTabChange 호출하여 Main의 estateState 초기화
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
        <div className="w-14 flex flex-col items-center space-y-4 flex-grow">
          <button
            onClick={() => handleSetActivePage('home')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <FaHome
                className={`w-10 h-10 ${activePage === 'home' ? 'text-hanaGreen' : 'text-gray-300'} hover:scale-105`}
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
              <FaMap
                className={`w-10 h-10 ${activePage === 'map' ? 'text-hanaGreen' : 'text-gray-300'} hover:scale-105`}
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
              <MdChat
                className={`w-10 h-10 ${activePage === 'consultant' ? 'text-hanaGreen' : 'text-gray-300'} hover:scale-105`}
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
              <FaHouseUser
                className={`w-10 h-10 ${activePage === 'myPage' ? 'text-hanaGreen' : 'text-gray-300'} hover:scale-105`}
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
