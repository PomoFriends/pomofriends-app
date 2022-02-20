import React from 'react';
import Navbar from './NavBar';

// Layout for every page that doesnt need a sidebar
const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
