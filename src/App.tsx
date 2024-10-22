import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoanRecommend from './pages/LoanRecommned.tsx';
import Main from './pages/Main.tsx';
import MyPage from './pages/MyPage.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import PropertyForm from './pages/PropertyForm.tsx';
import RealEstateDetail from './pages/RealEstateDetail.tsx';
import RealEstateList from './pages/RealEstateList.tsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/loan-recommend" element={<LoanRecommend />} />
        <Route path="/real-estate-list" element={<RealEstateList />} />
        <Route path="/real-estate-detail" element={<RealEstateDetail />} />
        <Route path="/property-from" element={<PropertyForm />} />
        <Route path="/property-agree" element={<PropertyAgree />} />
      </Routes>
    </div>
  );
}

export default App;
