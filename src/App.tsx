import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/template/Layout.tsx';
import AssetRegister from './pages/AssetRegister.tsx';
import LoanRecommend from './pages/LoanRecommned.tsx';
import Main from './pages/Main.tsx';
import MyPage from './pages/MyPage.tsx';
import PropertyAgree from './pages/PropertyAgree.tsx';
import RealEstateDetail from './pages/RealEstateDetail.tsx';
import RealEstateList from './pages/RealEstateList/RealEstateList.tsx';
//데이터가 없어서 test 컴포넌트 import(임시)
import TestPropertyConfirm from './pages/property/TestPropertyConfirm.tsx';
import PropertyForm from './pages/property/form/PropertyForm.tsx';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/loan-recommend" element={<LoanRecommend />} />
          <Route path="/real-estate-list" element={<RealEstateList />} />
          <Route path="/real-estate-detail" element={<RealEstateDetail />} />
          <Route path="/property-form" element={<PropertyForm />} />
          <Route path="/property-confirm" element={<TestPropertyConfirm />} />
          <Route path="/property-agree" element={<PropertyAgree />} />
          <Route path="/assetRegister" element={<AssetRegister />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
