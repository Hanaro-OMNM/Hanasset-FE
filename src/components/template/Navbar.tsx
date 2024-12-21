import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Consultant from '../../assets/img/main/consultant.jpeg';
import Home from '../../assets/img/main/home.jpeg';
import Map from '../../assets/img/main/map.jpeg';
import MyPage from '../../assets/img/main/mypage.jpeg';
import { RealEstateList } from '../../types/hanaAssetResponse.common.ts';

interface NavbarProps {
  state?: RealEstateList;
  children: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ state, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state) {
      navigate('/real-estate-list', { state });
    }
  }, [navigate, state]);

  return (
    <div className="space-x-12">
      <div className="left-0 top-0 w-16 h-full absolute bg-white shadow border-r border-[#e7e7e7] flex flex-col items-center">
        <a
          href="/"
          className="mt-4 mb-5 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col">
            <div className="text-hanaColor2 text-md text-center font-fontBold">
              Hana
            </div>
            <div className="text-hanaNavy text-md text-center font-fontBold">
              Asset
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
                  location.pathname === '/live-chat' ||
                  location.pathname === '/select-estate' ||
                  location.pathname === '/chat-reservation'
                    ? ''
                    : 'grayscale hover:grayscale-0 hover:scale-105'
                }`}
              />
              <div
                className={`tracking-tight text-center text-xs ${
                  location.pathname === '/consulting' ||
                  location.pathname === '/live-chat' ||
                  location.pathname === '/select-estate' ||
                  location.pathname === '/chat-reservation'
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
                src={MyPage}
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
