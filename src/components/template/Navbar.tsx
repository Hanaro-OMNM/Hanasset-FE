import { FaHome, FaMap } from 'react-icons/fa';
import { FaHouseUser } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { useState } from 'react';
import Logo from '../../assets/img/logo.png';
import Profile from '../../assets/img/profile_ex.jpg';
import MainSideLayout from '../template/MainSideLayout';
import ConsultingTabLayout from './ConsultingTabLayout.tsx';
import MyPageLayout from './MyPageLayout.tsx';

const Navbar: React.FC = () => {
  // 상태 관리: 홈, 지도, 마이홈의 활성 상태를 관리
  const [activePage, setActivePage] = useState<
    'home' | 'map' | 'consultant' | 'myPage'
  >('home');

  return (
    <div className="space-x-16">
      <div className="left-0 top-0 p-2 h-full absolute bg-white shadow border-r border-[#e7e7e7] flex flex-col items-center">
        <a
          href="/"
          className="mt-4 mb-10 flex flex-col items-center justify-center"
        >
          <img className="w-10 h-10" src={Logo} alt="Logo Image" />
          <div className="text-black text-sm font-bold font-sans tracking-tight text-center">
            OMNM
          </div>
        </a>
        {/* 메뉴 버튼들 */}
        <div className="w-14 h-96 mb-32 flex flex-col items-center justify-between">
          {/* 홈 버튼 */}
          <button
            onClick={() => setActivePage('home')} // 홈 버튼 클릭 시 'home'으로 설정
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activePage === 'home'
                  ? 'bg-[#008485] shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <FaHome
                className={`w-6 h-6 ${activePage === 'home' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              홈
            </div>
          </button>

          {/* 지도 버튼 */}
          <button
            onClick={() => setActivePage('map')} // 지도 버튼 클릭 시 'map'으로 설정
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activePage === 'map'
                  ? 'bg-[#008485] shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <FaMap
                className={`w-6 h-6 ${activePage === 'map' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              지도
            </div>
          </button>

          {/* 상담 버튼 */}
          <button
            onClick={() => setActivePage('consultant')} // 상담 버튼 클릭 시 'myPage'로 설정
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activePage === 'consultant'
                  ? 'bg-[#008485] shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <MdChat
                className={`w-6 h-6 ${activePage === 'consultant' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              상담
            </div>
          </button>

          {/* 마이홈 버튼 */}
          <button
            onClick={() => setActivePage('myPage')} // 마이홈 버튼 클릭 시 'myPage'로 설정
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                activePage === 'myPage'
                  ? 'bg-[#008485] shadow mb-2'
                  : 'bg-transparent'
              }`}
            >
              <FaHouseUser
                className={`w-6 h-6 ${activePage === 'myPage' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              마이홈
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
    </div>
  );
};

export default Navbar;
