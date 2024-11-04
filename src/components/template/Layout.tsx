import { useLocation } from 'react-router-dom';
import React from 'react';
import MapLayout from '../template/MapLayout/MapLayout.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isConsultantPage = location.pathname.startsWith('/consultant');

  return (
    <div>
      {isConsultantPage ? (
        <main>{children}</main>
      ) : (
        <MapLayout>
          <main>{children}</main>
        </MapLayout>
      )}
    </div>
  );
};

export default Layout;
