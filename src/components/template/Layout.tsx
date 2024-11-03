import { useLocation } from 'react-router-dom';
import React from 'react';
import Footer from './Footer';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // URL 경로가 "/consultant"로 시작하는 경우 Navbar와 Footer를 숨김
  const isConsultantPage = location.pathname.startsWith('/consultant');

  return (
    <div>
      {/* consultant 페이지가 아닌 경우에만 Navbar와 Footer를 렌더링 */}
      {!isConsultantPage && (
        <>
          {/* 420px 이상에서만 Navbar를 보여줌 */}
          <div className="hidden xs:block">
            <Navbar />
          </div>

          {/* 420px 이하에서만 Footer를 보여줌 */}
          <div className="block xs:hidden">
            <Footer />
          </div>
        </>
      )}

      {/* 메인 콘텐츠 영역 */}
      <main className="flex justify-center">{children}</main>
    </div>
  );
};

export default Layout;
