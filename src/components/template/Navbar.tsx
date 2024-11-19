import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Consultant from '../../assets/img/main/consultant.jpeg';
import Home from '../../assets/img/main/home.jpeg';
import Map from '../../assets/img/main/map.jpeg';
import Mypage from '../../assets/img/main/mypage.jpeg';

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
    <div className="space-x-12">
      <div className="left-0 top-0 w-16 h-full absolute bg-white shadow border-r border-[#e7e7e7] flex flex-col items-center">
        <a
          href="/"
          className="mt-4 mb-5 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col">
            <div className="text-hanaColor2 text-md text-center font-fontBold">
              hana
            </div>
            <div className="text-hanaNavy text-md text-center font-fontBold">
              asset
            </div>
          </div>
        </a>
        <div className="w-14 flex flex-col items-center space-y-6 flex-grow">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200 ${location.pathname === '/home'}`}
            >
              <img
                src={Home}
                alt="Home Icon"
                className={`h-8 transition duration-200 transform ${
                  location.pathname === '/home'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  location.pathname === '/home'
                    ? 'text-hanaColor2'
                    : 'text-gray-300'
                }`}
              >
                홈
              </div>
            </div>
          </button>

          {/* 지도 버튼 */}
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Map}
                alt="Map Icon"
                className={`h-8 transition duration-200 transform ${
                  location.pathname === '/'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  location.pathname === '/'
                    ? 'text-hanaColor2'
                    : 'text-gray-300'
                }`}
              >
                지도
              </div>
            </div>
          </button>

          {/* 상담 버튼 */}
          <button
            onClick={() => navigate('/consulting')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Consultant}
                alt="Consultant Icon"
                className={`h-8 transition duration-200 transform ${
                  location.pathname === '/consulting' ||
                  location.pathname === '/live-chat'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  location.pathname === '/consulting' ||
                  location.pathname === '/live-chat'
                    ? 'text-hanaColor2'
                    : 'text-gray-300'
                }`}
              >
                상담
              </div>
            </div>
          </button>

          {/* 마이홈 버튼 */}
          <button
            onClick={() => navigate('/my-page')}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center transition duration-200`}
            >
              <img
                src={Mypage}
                alt="Mypage Icon"
                className={`h-8 transition duration-200 transform ${
                  location.pathname === '/my-page' ||
                  location.pathname === '/my-estate-list'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  location.pathname === '/my-page' ||
                  location.pathname === '/my-estate-list'
                    ? 'text-hanaColor2'
                    : 'text-gray-300'
                }`}
              >
                마이홈
              </div>
            </div>
          </button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
