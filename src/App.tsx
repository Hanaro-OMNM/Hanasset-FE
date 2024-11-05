import { NavermapsProvider } from 'react-naver-maps';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/template/Layout.tsx';
import Consulting from './pages/Consulting.tsx';
import LoanRecommend from './pages/LoanRecommned.tsx';
import Login from './pages/Login.tsx';
import Main from './pages/Main.tsx';
import MyPage from './pages/MyPage.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import RealEstateList from './pages/RealEstateList/RealEstateList.tsx';
import SignUp from './pages/SignUp.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import ChatReservation from './pages/reservation/ChatReservation.tsx';
import SearchResult from './pages/search/SearchResult.tsx';

function App() {
  return (
    <div className="App">
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
            <Route path="/property-agree" element={<PropertyAgree />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/consultant" element={<Consultant />} />
            <Route path="/live-chat" element={<ChatApp accessor="guest" />} />
            <Route path="/search-result" element={<SearchResult />} />
          </Routes>
        </Layout>
      </NavermapsProvider>
    </div>
  );
}

export default App;
