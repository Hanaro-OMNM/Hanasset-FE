import React from 'react';
import MapLayout from '../template/MapLayout/MapLayout.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <MapLayout>
      <main>{children}</main>
    </MapLayout>
  );
};

export default Layout;
