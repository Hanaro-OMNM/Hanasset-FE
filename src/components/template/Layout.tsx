import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* 420px 이상에서만 Navbar를 보여줌 */}
      <div className="hidden xs:block">
        <Navbar />
      </div>

      {/* 420px 이하에서만 Footer를 보여줌 */}
      <div className="block xs:hidden">
        <Footer />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex justify-center">{children}</main>
    </div>
  );
};

export default Layout;
