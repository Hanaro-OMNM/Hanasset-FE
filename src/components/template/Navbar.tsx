import { FaHome, FaMap } from 'react-icons/fa';
import { FaHouseUser } from 'react-icons/fa6';
import { MdChat } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Logo from '../../assets/img/logo.png';
import Profile from '../../assets/img/profile_ex.jpg';

interface NavbarProps {
  state?: boolean;
  children: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ state, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // 선택된 매물이 있으면 자동으로 'estateList' 페이지로 이동하도록 설정
  useEffect(() => {
    if (state) {
      navigate('/real-estate-list');
    }
  }, [state]);

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
        <div className="w-14 h-96 mb-32 flex flex-col items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${location.pathname === '/home' ? 'bg-hanaGreen shadow mb-2' : 'bg-transparent'}`}
            >
              <FaHome
                className={`w-6 h-6 ${location.pathname === '/home' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              홈
            </div>
          </button>

          {/* 지도 버튼 */}
          <button
            onClick={() => navigate('/')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${location.pathname === '/' ? 'bg-hanaGreen shadow mb-2' : 'bg-transparent'}`}
            >
              <FaMap
                className={`w-6 h-6 ${location.pathname === '/' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              지도
            </div>
          </button>

          {/* 상담 버튼 */}
          <button
            onClick={() => navigate('/consulting')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${location.pathname === '/consulting' ? 'bg-hanaGreen shadow mb-2' : 'bg-transparent'}`}
            >
              <MdChat
                className={`w-6 h-6 ${location.pathname === '/consulting' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <div className="text-black text-base font-bold font-['Noto Sans KR'] tracking-tight text-center">
              상담
            </div>
          </button>

          {/* 마이홈 버튼 */}
          <button
            onClick={() => navigate('/my-page')}
            className="w-14 h-20 flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${location.pathname === '/my-page' ? 'bg-hanaGreen shadow mb-2' : 'bg-transparent'}`}
            >
              <FaHouseUser
                className={`w-6 h-6 ${location.pathname === '/my-page' ? 'text-white' : 'text-black'}`}
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
      <div>{children}</div>
      {/*  <RealEstateLayout onBackClick={() => handleSetActivePage('map')} />*/}
    </div>
  );
};
