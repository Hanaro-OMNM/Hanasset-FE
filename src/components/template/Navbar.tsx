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
        <div className="w-14 flex flex-col items-center justify-between">
          <button
            onClick={() => handleSetActivePage('home')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                activePage === 'home'
                  ? 'bg-hanaGreen shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <FaHome
                className={`w-10 h-10 ${activePage === 'home' ? 'text-white' : 'text-gray-300'}`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  activePage === 'home' ? 'text-white' : 'text-gray-300'
                }`}
              >
                홈
              </div>
            </div>
          </button>

          {/* 지도 버튼 */}
          <button
            onClick={() => handleSetActivePage('map')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                activePage === 'map'
                  ? 'bg-hanaGreen shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <FaMap
                className={`w-10 h-10 ${activePage === 'map' ? 'text-white' : 'text-gray-300'}`}
              />
              <div
                className={`tracking-tight text-center text-sm ${
                  activePage === 'map' ? 'text-white' : 'text-gray-300'
                }`}
              >
                지도
              </div>
            </div>
          </button>

          {/* 상담 버튼 */}
          <button
            onClick={() => handleSetActivePage('consultant')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                activePage === 'consultant'
                  ? 'bg-hanaGreen shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <MdChat
                className={`w-10 h-10  ${activePage === 'consultant' ? 'text-white' : 'text-gray-300'}`}
              />
              <div
                className={`tracking-tight text-center text-sm ${
                  activePage === 'consultant' ? 'text-white' : 'text-gray-300'
                }`}
              >
                상담
              </div>
            </div>
          </button>

          {/* 마이홈 버튼 */}
          <button
            onClick={() => handleSetActivePage('myPage')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                activePage === 'myPage'
                  ? 'bg-hanaGreen shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <FaHouseUser
                className={`w-10 h-10 ${activePage === 'myPage' ? 'text-white' : 'text-gray-300'}`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  activePage === 'myPage' ? 'text-white' : 'text-gray-300'
                }`}
              >
                마이홈
              </div>
            </div>
          </button>
        </div>
        <img
          className="w-12 h-12 rounded-full"
          src={Profile}
          alt="Profile Image"
        />
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
