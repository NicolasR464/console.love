import React, { ReactNode } from 'react';
import NavBar from './NavBar';
// import Drawer from './Drawer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Your layout JSX code goes here
    <div className="flex justify-between">
      <NavBar />
      {/* <Drawer /> */}
    </div>
  );
};

export default Layout;