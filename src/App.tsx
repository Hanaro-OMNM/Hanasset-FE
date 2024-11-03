import { NavermapsProvider } from 'react-naver-maps';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/template/Layout.tsx';
import Consulting from './pages/Consulting.tsx';
import LoanDetail from './pages/LoanDetail.tsx';
import LoanRecommend from './pages/LoanRecommned.tsx';
import LoanReservation from './pages/LoanReservation/LoanReservation.tsx';
import Login from './pages/Login.tsx';
import Main from './pages/Main.tsx';
import MyPage from './pages/MyPage.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import RealEstateList from './pages/RealEstateList/RealEstateList.tsx';
import SignUp from './pages/SignUp.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import Consultant from './pages/consultant/Consultant.tsx';
import GuestInfo from './pages/consultant/GuestInfo.tsx';
import GuestWaiting from './pages/consultant/GuestWaiting.tsx';

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
            <Route path="/loan-reservation" element={<LoanReservation />} />
            <Route path="/real-estate-list" element={<RealEstateList />} />
            <Route path="/property-agree" element={<PropertyAgree />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/consultant" element={<Consultant />} />
            <Route path="/consultant/guest-info" element={<GuestInfo />} />
            <Route
              path="/consultant/guest-waiting"
              element={<GuestWaiting />}
            />
            <Route path="/live-chat" element={<ChatApp accessor="guest" />} />
          </Routes>
        </Layout>
      </NavermapsProvider>
    </div>
  );
}

export default App;
