import { NavermapsProvider } from 'react-naver-maps';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/template/Layout.tsx';
import Modal from './components/template/Modal/Modal.tsx';
import Consulting from './pages/Consulting.tsx';
import LoanRecommend from './pages/LoanRecommned.tsx';
import Main from './pages/Main.tsx';
import MyPage from './pages/MyPage.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import RealEstateList from './pages/RealEstateList/RealEstateList.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import ChatReservation from './pages/reservation/ChatReservation.tsx';
import SearchResult from './pages/search/SearchResult.tsx';
import { CookieUtils } from './utils/CookieUtils.ts';

function App() {
  const isSignedIn = CookieUtils.getCookieValue('connect.sid');
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // 로그인하지 않은 상태에서 허용된 페이지 외 접근 시 로그인 모달을 열고 리다이렉션
    if (
      !isSignedIn &&
      !['/', '/home', '/real-estate-list'].includes(location.pathname)
    ) {
      setIsLoginModalOpen(true);
      navigate('/'); // 로그인 페이지로 리다이렉트
    }
  }, [isSignedIn, location.pathname, navigate]);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false); // 로그인 성공 시 모달 닫기
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // 모달을 닫아도 현재 페이지 유지
  };

  return (
    <div className="App">
      <NavermapsProvider ncpClientId={import.meta.env.VITE_MAP_CLIENT_ID}>
        <Layout>
          <Routes>
            <Route path="/" element={<> </>} />
            <Route path="/home" element={<Main />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/loan-recommend" element={<LoanRecommend />} />
            <Route path="/chat-reservation" element={<ChatReservation />} />
            <Route path="/real-estate-list" element={<RealEstateList />} />
            <Route path="/property-agree" element={<PropertyAgree />} />
            <Route path="/consultant" element={<Consultant />} />
            <Route path="/live-chat" element={<ChatApp accessor="guest" />} />
            <Route path="/search-result" element={<SearchResult />} />
          </Routes>
          {isLoginModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <Modal
                onLoginSuccess={handleLoginSuccess}
                onClose={closeLoginModal}
              />
            </div>
          )}
        </Layout>
      </NavermapsProvider>
    </div>
  );
}

export default App;
