import { NavermapsProvider } from 'react-naver-maps';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/template/Layout.tsx';
import LoanDetail from './pages/LoanDetail.tsx';
import LoanRecommend from './pages/LoanRecommned.tsx';
import LoanReservation from './pages/LoanReservation/LoanReservation.tsx';
import Login from './pages/Login.tsx';
import Main from './pages/Main.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import RealEstateDetail from './pages/RealEstateDetail/RealEstateDetail.tsx';
import RealEstateList from './pages/RealEstateList/RealEstateList.tsx';
import SignUp from './pages/SignUp.tsx';
import ChatApp from './pages/chat/ChatApp.tsx';
import GuestInfo from './pages/consultant/GuestInfo.tsx';
import GuestWaiting from './pages/consultant/GuestWaiting.tsx';
//데이터가 없어서 test 컴포넌트 import(임시)
import TestPropertyConfirm from './pages/property/TestPropertyConfirm.tsx';
import PropertyForm from './pages/property/form/PropertyForm.tsx';

function App() {
  return (
    <div className="App">
      <NavermapsProvider ncpClientId={import.meta.env.VITE_MAP_CLIENT_ID}>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/loan-recommend" element={<LoanRecommend />} />
            <Route path="/loan-reservation" element={<LoanReservation />} />
            <Route path="/loan-detail" element={<LoanDetail />} />
            <Route path="/loan-reservation" element={<LoanReservation />} />
            <Route path="/real-estate-list" element={<RealEstateList />} />
            <Route path="/real-estate-detail" element={<RealEstateDetail />} />
            <Route path="/property-form" element={<PropertyForm />} />
            <Route path="/property-confirm" element={<TestPropertyConfirm />} />
            <Route path="/property-agree" element={<PropertyAgree />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
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
