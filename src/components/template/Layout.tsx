import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main className="flex justify-center">{children}</main>
    </div>
  );
};

export default Layout;
