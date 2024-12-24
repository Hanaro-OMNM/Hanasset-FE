import { GoogleOAuthProvider } from '@react-oauth/google';
import { NavermapsProvider } from 'react-naver-maps';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/template/Layout.tsx';
import Modal from './components/template/Modal/Modal.tsx';
import MyEstateList from './components/template/MyEstateList.tsx';
import SelectEstate from './components/template/SelectEstate.tsx';
import Consulting from './pages/Consulting.tsx';
import LoanRecommend from './pages/LoanRecommned.tsx';
import Main from './pages/Main.tsx';
import MyPage from './pages/MyPage.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import RealEstateList from './pages/RealEstateList/RealEstateList.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import ChatHistory from './pages/chat/ChatHistory.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import ChatReservation from './pages/reservation/ChatReservation.tsx';
import SearchResult from './pages/search/SearchResult.tsx';
import isLoginAtom from './recoil/isLogin';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const [isLogin] = useRecoilState(isLoginAtom);

  useEffect(() => {
    if (isLogin) {
      setIsLoginModalOpen(false);
    } else if (
      !isLogin &&
      !['/', '/home', '/real-estate-list'].includes(location.pathname)
    ) {
      setIsLoginModalOpen(true);
      navigate('/');
    }
  }, [isLogin, location.pathname, navigate]);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <NavermapsProvider ncpClientId={import.meta.env.VITE_MAP_CLIENT_ID}>
          <Layout>
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/home" element={<Main />} />
              <Route path="/consulting" element={<Consulting />} />
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/loan-recommend" element={<LoanRecommend />} />
              <Route path="/chat-reservation" element={<ChatReservation />} />
              <Route path="/real-estate-list" element={<RealEstateList />} />
              <Route path="/select-estate" element={<SelectEstate />} />
              <Route path="/my-estate-list" element={<MyEstateList />} />
              <Route path="/property-agree" element={<PropertyAgree />} />
              <Route path="/consultant" element={<Consultant />} />
              <Route path="/live-chat" element={<ChatApp accessor="guest" />} />
              <Route
                path="/chat-history/:id"
                element={<ChatHistory accessor="guest" />}
              />
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
      </GoogleOAuthProvider>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;
